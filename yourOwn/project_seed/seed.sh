#!/usr/bin/env bash
set -euo pipefail

# -----------------------------
# Seed GitHub Project (v2) from YAML
# Creates Project DRAFT ITEMS first (private planning),
# Optionally converts draft items to real repo issues.
#
# Requirements: gh, jq, yq
#
# Usage:
#   ./seed.sh --owner your-org-or-user --project 1 --yaml epics_stories.yaml [--convert-issues]
#
# Notes:
# - Assumes your Project already exists and has fields:
#     Status (single-select), Iteration (iterations)
#   The following are OPTIONAL and best as TEXT fields to simplify automation:
#     Type, Slice, Area, Priority, Points
# - YAML schema expected (see example we provided earlier).
# -----------------------------

# --- defaults
OWNER=""
PROJECT_NUMBER=""
YAML_PATH="./epics_stories.yaml"
CONVERT_ISSUES=false

# --- arg parsing
while [[ $# -gt 0 ]]; do
  case "$1" in
    --owner) OWNER="${2:-}"; shift 2;;
    --project) PROJECT_NUMBER="${2:-}"; shift 2;;
    --yaml) YAML_PATH="${2:-}"; shift 2;;
    --convert-issues) CONVERT_ISSUES=true; shift 1;;
    *) echo "Unknown arg: $1"; exit 1;;
  esac
done

if [[ -z "${OWNER}" || -z "${PROJECT_NUMBER}" || -z "${YAML_PATH}" ]]; then
  echo "Usage: $0 --owner <org-or-user> --project <number> --yaml <file> [--convert-issues]"
  exit 1
fi

if [[ ! -f "$YAML_PATH" ]]; then
  echo "YAML not found: $YAML_PATH"
  exit 1
fi

# --- sanity checks
if ! gh auth status >/dev/null 2>&1; then
  echo "❌ gh not authenticated. Run: gh auth login"
  exit 1
fi

if ! command -v jq >/dev/null; then
  echo "❌ jq not installed."
  exit 1
fi

if ! command -v yq >/dev/null; then
  echo "❌ yq not installed."
  exit 1
fi

echo "➡️  Loading project meta…"
PROJECT_ID=$(gh project view "$PROJECT_NUMBER" --owner "$OWNER" --format json | jq -r '.id')
if [[ -z "$PROJECT_ID" || "$PROJECT_ID" == "null" ]]; then
  echo "❌ Could not resolve Project ID. Check --owner and --project."
  exit 1
fi

# Grab field metadata to set Status/Iteration and try to set text fields if present
FIELDS_JSON=$(gh project field-list "$PROJECT_NUMBER" --owner "$OWNER" --format json)

# Helper to get field id by name
field_id_by_name() {
  local name="$1"
  echo "$FIELDS_JSON" | jq -r --arg n "$name" '.fields[] | select(.name==$n) | .id'
}

# Helper to get single-select option id by value
single_select_option_id() {
  local field_name="$1"
  local option_name="$2"
  echo "$FIELDS_JSON" | jq -r --arg fn "$field_name" --arg on "$option_name" '
    .fields[] | select(.name==$fn) | .options[]? | select(.name==$on) | .id' \
    | head -n1
}

STATUS_FIELD_ID=$(field_id_by_name "Status" || true)
ITERATION_FIELD_ID=$(field_id_by_name "Iteration" || true)

# Choose a default status option for new items: try "Backlog" then "Todo"
DEFAULT_STATUS_OPTION_ID=""
if [[ -n "${STATUS_FIELD_ID}" && "${STATUS_FIELD_ID}" != "null" ]]; then
  DEFAULT_STATUS_OPTION_ID=$(single_select_option_id "Status" "Backlog")
  if [[ -z "$DEFAULT_STATUS_OPTION_ID" || "$DEFAULT_STATUS_OPTION_ID" == "null" ]]; then
    DEFAULT_STATUS_OPTION_ID=$(single_select_option_id "Status" "Todo" || true)
  fi
fi

# Pick the first iteration as default if available
DEFAULT_ITERATION_ID=""
if [[ -n "${ITERATION_FIELD_ID}" && "${ITERATION_FIELD_ID}" != "null" ]]; then
  DEFAULT_ITERATION_ID=$(echo "$FIELDS_JSON" \
    | jq -r --arg id "$ITERATION_FIELD_ID" '
        .fields[] | select(.id==$id) | .configuration.iterations[0].id' )
fi

# Try to resolve optional TEXT fields (these can be absent—script will skip)
TYPE_FIELD_ID=$(field_id_by_name "Type" || true)
SLICE_FIELD_ID=$(field_id_by_name "Slice" || true)
AREA_FIELD_ID=$(field_id_by_name "Area" || true)
PRIORITY_FIELD_ID=$(field_id_by_name "Priority" || true)
POINTS_FIELD_ID=$(field_id_by_name "Points" || true)

# Defaults from YAML (owner/number already passed via CLI to avoid mismatch)
REPO_DEFAULT=$(yq -r '.defaults.repo // ""' "$YAML_PATH")
ITERATION_LABEL_DEFAULT=$(yq -r '.defaults.iteration // ""' "$YAML_PATH") # informational only

echo "✅ Project ID: $PROJECT_ID"
echo "✅ Will create DRAFT items first. Convert to issues: $CONVERT_ISSUES"
echo

# Iterate YAML items
yq -c '.items[]' "$YAML_PATH" | while read -r ITEM_JSON; do
  TYPE=$(echo "$ITEM_JSON" | jq -r '.type')
  TITLE=$(echo "$ITEM_JSON" | jq -r '.title')
  BODY=$(echo "$ITEM_JSON" | jq -r '.body // ""')
  SLICE=$(echo "$ITEM_JSON" | jq -r '.slice // ""')
  AREA=$(echo "$ITEM_JSON" | jq -r '.area // ""')
  PRIORITY=$(echo "$ITEM_JSON" | jq -r '.priority // ""')
  POINTS=$(echo "$ITEM_JSON" | jq -r '.points // ""')
  REPO=$(echo "$ITEM_JSON" | jq -r '.repo // ""')
  REPO=${REPO:-$REPO_DEFAULT}

  echo "➕ Creating draft item: [$TYPE] $TITLE"

  # Create DRAFT item (Project-only; not a repo issue yet)
  ITEM_ID=$(gh project item-create "$PROJECT_NUMBER" --owner "$OWNER" \
    --title "$TITLE" --body "$BODY" --format json | jq -r '.id')

  # Set Status (single-select) if available
  if [[ -n "${STATUS_FIELD_ID}" && "${STATUS_FIELD_ID}" != "null" && -n "${DEFAULT_STATUS_OPTION_ID}" && "${DEFAULT_STATUS_OPTION_ID}" != "null" ]]; then
    gh project item-edit --id "$ITEM_ID" --project-id "$PROJECT_ID" \
      --field-id "$STATUS_FIELD_ID" --single-select-option-id "$DEFAULT_STATUS_OPTION_ID" >/dev/null
  fi

  # Set Iteration to the first iteration by default (optional)
  if [[ -n "${ITERATION_FIELD_ID}" && "${ITERATION_FIELD_ID}" != "null" && -n "${DEFAULT_ITERATION_ID}" && "${DEFAULT_ITERATION_ID}" != "null" ]]; then
    gh project item-edit --id "$ITEM_ID" --project-id "$PROJECT_ID" \
      --field-id "$ITERATION_FIELD_ID" --iteration-id "$DEFAULT_ITERATION_ID" >/dev/null
  fi

  # Set optional TEXT fields if they exist
  if [[ -n "$TYPE" && -n "${TYPE_FIELD_ID}" && "${TYPE_FIELD_ID}" != "null" ]]; then
    gh project item-edit --id "$ITEM_ID" --project-id "$PROJECT_ID" \
      --field-id "$TYPE_FIELD_ID" --text "$TYPE" >/dev/null
  fi
  if [[ -n "$SLICE" && -n "${SLICE_FIELD_ID}" && "${SLICE_FIELD_ID}" != "null" ]]; then
    gh project item-edit --id "$ITEM_ID" --project-id "$PROJECT_ID" \
      --field-id "$SLICE_FIELD_ID" --text "$SLICE" >/dev/null
  fi
  if [[ -n "$AREA" && -n "${AREA_FIELD_ID}" && "${AREA_FIELD_ID}" != "null" ]]; then
    gh project item-edit --id "$ITEM_ID" --project-id "$PROJECT_ID" \
      --field-id "$AREA_FIELD_ID" --text "$AREA" >/dev/null
  fi
  if [[ -n "$PRIORITY" && -n "${PRIORITY_FIELD_ID}" && "${PRIORITY_FIELD_ID}" != "null" ]]; then
    gh project item-edit --id "$ITEM_ID" --project-id "$PROJECT_ID" \
      --field-id "$PRIORITY_FIELD_ID" --text "$PRIORITY" >/dev/null
  fi
  if [[ -n "$POINTS" && -n "${POINTS_FIELD_ID}" && "${POINTS_FIELD_ID}" != "null" ]]; then
    gh project item-edit --id "$ITEM_ID" --project-id "$PROJECT_ID" \
      --field-id "$POINTS_FIELD_ID" --number "$POINTS" >/dev/null
  fi

  # (Optional) Convert draft item to a real repo issue & add to Project
  if [[ "$CONVERT_ISSUES" == true ]]; then
    if [[ -z "$REPO" ]]; then
      echo "     Skipping conversion to issue (no repo configured)."
    else
      ISSUE_URL=$(gh issue create --repo "$REPO" --title "$TITLE" --body "$BODY" --json url -q .url)
      # Replace the draft with the newly created issue in the Project
      gh project item-add "$PROJECT_NUMBER" --owner "$OWNER" --url "$ISSUE_URL" >/dev/null
      echo "    Converted to Issue: $ISSUE_URL"
    fi
  fi

  echo "    Done: $TITLE"
done

echo
echo " Seeding complete."
echo "Open your Project to review the new draft items."
if [[ "$CONVERT_ISSUES" == false ]]; then
  echo "Tip: Re-run with --convert-issues later to turn drafts into repo issues."
fi

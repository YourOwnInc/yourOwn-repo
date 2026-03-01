---
trigger: always_on
---

# Portfolio UI Patterns Constraints

This document outlines the architectural constraints for developing components within `packages/ui-patterns`.

## Core Principle: No Editor Logic in UI Patterns

**UI Patterns must remain completely agnostic to the Site Editor.** 

Anything to do with modifying or editing the portfolio before it is exported (such as "Add Tab", "Delete Item", or "Edit Text" hover states) **must not** be tightly coupled into the actual React components of the portfolio UI (`ui-patterns`).

### Why?
1. **Export Purity:** These components are exactly what the end-user will receive in their exported portfolio. Including editor-specific logic, `isEditing` flags, or editing buttons bloats the exported code and risks exposing editor features to live site visitors.
2. **Separation of Concerns:** `ui-patterns` should only describe *how* data is displayed visually. The `client` application should dictate how that data is *modified*.

### Rules
1. **No `isEditing` flags:** Components in `ui-patterns` should not check for an `isEditing` state to conditionally render UI.
2. **No Editor Actions:** Action callbacks like `onDeleteTab` or `onAddExperience` should not be wired directly into visual patterns.
3. **Data-Driven Visuals Only:** Components should purely consume props (`data`) and render them.

### How to handle Editor UI instead?
If the Editor needs to provide UI to modify a pattern, it should do so via one of the following endorsed architectures:
- **Editor Shell (Recommended):** Manage modifications (e.g., deleting a page) from an external Inspector/Sidebar panel maintained entirely by the Editor, leaving the canvas pristine.
- **Render Props (Inversion of Control):** If inline actions are strictly required, the component may accept a generic generic `addonContent?: ReactNode` prop. The Editor injects the action button, but the component remains ignorant of what the button does.
- **Overlay Positioning:** The Editor renders floating action buttons absolutely positioned over the canvas elements by tracking `data-editor-id` attributes.

import type { layoutItemInput } from "../schemas/layout.schema";

export function normalizeLayoutItems(items: layoutItemInput[]): layoutItemInput[] {
  // Sort by provided position and then reindex (0..n-1)
  const sorted = [...items].sort((a, b) => a.position - b.position);

  return sorted.map((item, index) => ({
    ...item,
    position: index,
  }));
}

export function assertNoDuplicateExperiences(items: layoutItemInput[]): void {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.experienceId)) {
      throw new Error(`DUPLICATE_EXPERIENCE_IN_LAYOUT:${item.experienceId}`);
    }
    seen.add(item.experienceId);
  }
}

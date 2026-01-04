import { PortfolioModel, RenderNode } from "./types";
import { PATTERNS } from "../patterns.LEGACY/PATTERNS";

export function buildRenderModel(model: PortfolioModel): RenderNode[] {
  const byId = new Map(model.experiences.map((e) => [e.id, e]));
  const nodes: RenderNode[] = [];

  for (const p of model.layout.placements) {
    const data = byId.get(p.experienceId);
    const slot = model.layout.slots.find((s) => s.id === p.position);
    if (!data || !slot) continue;
    nodes.push(PATTERNS[p.patternId].toRenderNode({ data, slot }));
  }
  return nodes;
}

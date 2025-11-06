// SAMPLE: NOT THE FULL IMPLENTATION 
// here is where will add our approach to exporting the portfolio


import { PortfolioModel } from "../domain/types";
import { buildRenderModel } from "../domain/buildRenderModel";

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));

function renderNode(n: { type: string; props: any }): string {
  switch (n.type) {
    case "experience.card.v1":
      return `<section style="grid-area:${esc(n.props.area)}"><h3>${esc(n.props.title)}</h3><p>${esc(n.props.summary)}</p></section>`;
    case "experience.row.v1":
      return `<section style="grid-area:${esc(n.props.area)}"><div>${esc(n.props.title)}${n.props.dates ? " — " + esc(n.props.dates) : ""}</div></section>`;
    default:
      return `<section style="grid-area:${esc((n.props || {}).area)}">Unknown node</section>`;
  }
}

export function exportSectionHTML(model: PortfolioModel): string {
  const nodes = buildRenderModel(model);
  const markup = nodes.map(renderNode).join("\n");
  const css = `main{display:grid;gap:16px;}`;
  return `<!doctype html><html><head><meta charset="utf-8"><title>Portfolio Section</title><style>${css}</style></head><body><main>${markup}</main></body></html>`;
}

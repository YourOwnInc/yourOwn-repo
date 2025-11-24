// renderBlocks.tsx
import type { ReactElement } from "react";
import { BLOCKS } from "../blocks";
import type { Block } from "../types";

export function renderBlocks(blocks: Block[]): ReactElement[] {
  return blocks.map((b) => {
    if (b.type === "experience") {
      const Comp = BLOCKS.experience;       // ComponentType<ExperienceProps>
      return (
        <div key={b.id}>
          <Comp {...b.props} />              {/* render the component */}
        </div>
      );
    }
    return (
      <div key={b.id} className="p-3 border rounded-lg text-sm opacity-70">
        Unknown block type: <code>{String(b.type)}</code>
      </div>
    );
  });
}


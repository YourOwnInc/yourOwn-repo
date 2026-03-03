import { ModernBento } from "./BentoLayout"
import { Home } from "./HomeLayout"
import { About } from "./AboutLayout"
import { Projects } from "./ProjectsLayout"
import { HomeLayoutV2 } from "./HomeLayoutV2";
import { SidebarProfileLayout } from "./SidebarProfileLayout"

import React from "react";

export interface LayoutConfig {
  component: React.ComponentType<any>;
  config: {
    slots: { clientSlotId: string; area: string }[];
  };
}

export const LAYOUT_REGISTRY: Record<string, LayoutConfig> = {
  "bento-v1": {
    component: ModernBento,
    config: {
      slots: [
        { clientSlotId: "main", area: "main" },
        { clientSlotId: "s1", area: "sidebar" },
        { clientSlotId: "s2", area: "sidebar" },
        { clientSlotId: "footer", area: "footer" }
      ]
    }
  },
  "home": {
    component: Home,
    config: {
      slots: [
        { clientSlotId: "main", area: "main" },
        { clientSlotId: "slot-1", area: "sidebar" },
        { clientSlotId: "slot-2", area: "sidebar" },
        { clientSlotId: "footer", area: "footer" }
      ]
    }
  },
  "about": {
    component: About,
    config: {
      slots: [
        { clientSlotId: "main", area: "main" },
        { clientSlotId: "slot-1", area: "sidebar" },
        { clientSlotId: "slot-3", area: "sidebar" },
        { clientSlotId: "footer", area: "footer" }
      ]
    }
  },
  "projects": {
    component: Projects,
    config: {
      slots: [
        { clientSlotId: "slot-header", area: "header" },
        { clientSlotId: "slot-p1", area: "main" },
        { clientSlotId: "slot-p2", area: "main" },
        { clientSlotId: "slot-p3", area: "main" }
      ]
    }
  },
  "home-v2": {
    component: HomeLayoutV2,
    config: {
      slots: [
        { clientSlotId: "hero", area: "header" },
        { clientSlotId: "primary-experience", area: "main" },
        { clientSlotId: "secondary-focus", area: "sidebar" },
        { clientSlotId: "socials", area: "sidebar" },
        { clientSlotId: "footer", area: "footer" }
      ]
    }
  },
  "profile-sidebar": {
    component: SidebarProfileLayout,
    config: {
      slots: [
        { clientSlotId: "identity", area: "header" },
        { clientSlotId: "navigation", area: "main" },
        { clientSlotId: "socials", area: "footer" }
      ]
    }
  }
};
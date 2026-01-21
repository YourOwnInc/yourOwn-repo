import { ModernBento } from "./BentoLayout"
import { Home} from "./HomeLayout"
import { About} from "./AboutLayout"
import {Projects} from "./ProjectsLayout"
import { HomeLayoutV2 } from "./HomeLayoutV2";
import {SidebarProfileLayout} from "./SidebarProfileLayout"

export const LAYOUT_REGISTRY: any = {
  "bento-v1": ModernBento,
  "home": Home,
  "about": About,
  "projects": Projects,
  "home-v2": HomeLayoutV2,
  "profile-sidebar": SidebarProfileLayout

}
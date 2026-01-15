import { ModernBento } from "./BentoLayout"
import { Home} from "./HomeLayout"
import { About} from "./AboutLayout"
import {Projects} from "./ProjectsLayout"

export const LAYOUT_REGISTRY: any = {
  "bento-v1": ModernBento,
  "home": Home,
  "about": About,
  "projects": Projects,
}
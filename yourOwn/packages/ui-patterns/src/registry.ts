import { HeroBasic } from "./patterns/hero-basic";
import { GenericCard } from "./patterns/generic-card";
import { DefaultPattern } from "./patterns/deafult";
import { JobSummary} from "./patterns/job-summary";
import {ProjectCard} from "../src/patterns/projects/ProjectCard"
import { ProjectGrid} from "../src/patterns/projects/ProjectGrid"



export const PATTERN_REGISTRY: Record<string, any> = {
    'hero-basic': HeroBasic,
    'generic-card': GenericCard,
    'default': DefaultPattern, 
    'project-card': ProjectCard,
    'project-grid': ProjectGrid,
}
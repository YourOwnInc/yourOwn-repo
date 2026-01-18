import { HeroBasic } from "./patterns/hero-basic";
import { GenericCard } from "./patterns/generic-card";
import { DefaultPattern } from "./patterns/deafult";
import { JobSummary} from "./patterns/job-summary";
import {ProjectCard} from "../src/patterns/projects/ProjectCard"
import { ProjectGrid} from "../src/patterns/projects/ProjectGrid"

import {ProfileHero} from "../src/patterns/homes/ProfileHero"
import {ExperienceCard} from "../src/patterns/homes/ExperienceCard"

import {NarrativeCard} from "../src/patterns/homes/NarrativeCard"
import {ProfessionalHero} from "../src/patterns/homes/ProfessionalHero"

import {SocialLinkCard} from "../src/patterns/SocialLinkCard"



export const PATTERN_REGISTRY: Record<string, any> = {
    'hero-basic': HeroBasic,
    'generic-card': GenericCard,
    'default': DefaultPattern, 
    'project-card': ProjectCard,
    'project-grid': ProjectGrid,
    "profile-hero": ProfileHero,
    "experience-card": ExperienceCard,
    "primary-experience": NarrativeCard,
    "hero": ProfessionalHero,
    "social-link-card": SocialLinkCard
    
}
import { HeroBasic } from "./patterns/hero-basic";
import { GenericCard } from "./patterns/generic-card";
import { DefaultPattern } from "./patterns/deafult";
import { JobSummary} from "./patterns/job-summary";


export const PATTERN_REGISTRY: Record<string, any> = {
    'hero-basic': HeroBasic,
    'generic-card': GenericCard,
    'default': DefaultPattern, 

}
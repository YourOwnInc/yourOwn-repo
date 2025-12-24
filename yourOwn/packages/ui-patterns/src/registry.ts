import { HeroBasic } from "./patterns/hero-basic";
import { GenericCard } from "./patterns/generic-card";
import { DefaultPattern } from "./patterns/deafult";




export const PATTERN_REGISTRY: any = {
    'hero-basic': HeroBasic,
    'generic-card': GenericCard,
    'default': DefaultPattern
    // Add more patterns here 
}
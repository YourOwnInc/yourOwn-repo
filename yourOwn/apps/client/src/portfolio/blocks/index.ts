// blocks/index.ts
import type { ComponentType } from "react";
import ExperienceCard from "./ExperienceCard";
import type { ExperienceProps } from "../types";

type ExperienceComponent = ComponentType<ExperienceProps>;

export const BLOCKS: { experience: ExperienceComponent } = {
  experience: ExperienceCard,
};

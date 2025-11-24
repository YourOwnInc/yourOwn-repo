// src/portfolio/adapters/toBlock.ts
import { Block } from '../types';

export interface ExperienceInput {
  title: string;
  summary?: string;
}

export function toExperienceBlock(input: ExperienceInput): Block {
  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return {
    id,
    type: 'experience',
    props: {
      title: input.title.trim(),
      summary: input.summary?.trim() || '',
    },
  };
}

export type ExperienceEntryId = string;
export type TemplateVariantId = string;

export interface ExperienceEntry {
  id: string;
  sessionId: string;
  // could be smart to add a type of experience. 
  type: string; // "project" "internship" etc.
  title: string;
  summary: string;
  end?: string;
  start?: string;
  media?: Array<{ kind:'image'|'video'|'link'; url:string; alt?:string; meta?:Record<string,unknown> }>;
  createdAt: Date;
  updatedAt: Date;
};


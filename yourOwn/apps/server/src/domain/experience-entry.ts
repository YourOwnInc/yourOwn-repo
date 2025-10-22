export type ExperienceEntryId = string;
export type TemplateVariantId = string;

export interface ExperienceEntry {
  id: string;
  sessionId: string;
  title: string;
  summary: string;
  media: Array<{ kind:'image'|'video'|'link'; url:string; alt?:string; meta?:Record<string,unknown> }>;
  createdAt: Date;
  updatedAt: Date;
};


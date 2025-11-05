import { ReactElement } from "react";

export type BlockType = "experience";




export interface ExperienceProps{
    // These 2 for now (MVP) 
    // Will add more fields later
    title: string;
    summary: string;
} 

export type BlockProps = ExperienceProps;

export interface Block<T extends BlockType = BlockType, P = BlockProps>{
  id: string;
  type: T;
  props: P;
}

export interface ExperienceEntryDTO {
  id: string;
  // could be smart to add a type of experience. 
  type: string; // "project" "internship" etc.
  title: string;
  summary: string;
    
}
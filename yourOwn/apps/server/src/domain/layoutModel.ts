export type SessionId = string;

export interface layoutModel {
    sessionId: SessionId;
    templateId: string;
    userId?: string;
    slots: [

    ],
    placements: Array<{
        slotId: string;
        experienceId: string;
        patternId: 

    }>;
       
    


}
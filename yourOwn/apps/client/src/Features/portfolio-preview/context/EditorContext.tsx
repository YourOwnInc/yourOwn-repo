import React, { createContext, useContext } from 'react';

interface EditorContextType {
    isEditing: boolean;
    onAddTab?: () => void;
    onAddExperience?: (slotId: string) => void;
}

const EditorContext = createContext<EditorContextType>({ isEditing: false });

export const useEditor = () => useContext(EditorContext);

export const EditorProvider: React.FC<{
    children: React.ReactNode;
    value: EditorContextType;
}> = ({ children, value }) => {
    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    );
};

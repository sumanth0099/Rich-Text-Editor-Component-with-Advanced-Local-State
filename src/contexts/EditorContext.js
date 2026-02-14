import { createContext, useContext } from 'react';

export const EditorContext = createContext(null);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider (EditorContext.Provider)');
  }
  return context;
};

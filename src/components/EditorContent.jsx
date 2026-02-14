import React, { useEffect, useRef } from 'react';
import { useEditor } from '../../contexts/EditorContext';
import { ACTIONS } from '../../hooks/useEditorReducer';
import { debounce } from '../../utils/editorUtils';
import styles from '../../styles/Editor.module.css';

const EditorContent = () => {
  const { state, dispatch } = useEditor();
  const contentRef = useRef(null);
  const isInternalChange = useRef(false);


  useEffect(() => {
    if (contentRef.current) {
        if (contentRef.current.innerHTML !== state.content) {

            contentRef.current.innerHTML = state.content;
        }
    }
  }, [state.content]);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection.rangeCount) return;
      
      const range = selection.getRangeAt(0);
      const editor = contentRef.current;
      

      if (editor && editor.contains(range.commonAncestorContainer)) {
        dispatch({
          type: ACTIONS.SET_SELECTION,
          payload: {
            selectedText: selection.toString(),
            selectionRange: range,
          }
        });
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, [dispatch]);

  const handleInput = (e) => {
    isInternalChange.current = true;
    const newContent = e.target.innerHTML;
    

    dispatch({ type: ACTIONS.TYPE_CHARACTER, payload: newContent });
    
    isInternalChange.current = false;
  };

  const handleKeyDown = (e) => {
  };


  
  return (
    <div
      id="editor-content"
      ref={contentRef}
      className={styles['editor-content']}
      contentEditable
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      role="textbox"
      aria-multiline="true"
      aria-label="Rich Text Editor"
      suppressContentEditableWarning={true} 
    />
  );
};

export default EditorContent;

import React from 'react';
import { useEditor } from '../../contexts/EditorContext';
import { ACTIONS } from '../../hooks/useEditorReducer';
import styles from '../../styles/Editor.module.css';

const EditorToolbar = () => {
  const { state, dispatch } = useEditor();

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    
    // Dispatch action to record capability or style change if needed for history/state tracking.
    dispatch({ 
        type: ACTIONS.APPLY_STYLE, 
        payload: { command, value } 
    });
    

  };

  const handleUndo = () => {
    dispatch({ type: ACTIONS.UNDO });
  };

  const handleRedo = () => {
    dispatch({ type: ACTIONS.REDO });
  };

  return (
    <div id="editor-toolbar" className={styles['editor-toolbar']} role="toolbar" aria-label="Text Formatting">
      <button 
        className={styles['toolbar-btn']} 
        onClick={() => handleFormat('bold')} 
        title="Bold (Ctrl+B)"
        aria-label="Bold"
      >
        <b>B</b>
      </button>
      <button 
        className={styles['toolbar-btn']} 
        onClick={() => handleFormat('italic')} 
        title="Italic (Ctrl+I)"
        aria-label="Italic"
      >
        <i>I</i>
      </button>
      <button 
        className={styles['toolbar-btn']} 
        onClick={() => handleFormat('underline')} 
        title="Underline (Ctrl+U)"
        aria-label="Underline"
      >
        <u>U</u>
      </button>
      <div className="separator" style={{ width: 1, background: '#ccc', margin: '0 5px' }}></div>
      <button 
        className={styles['toolbar-btn']} 
        onClick={() => handleFormat('formatBlock', 'H1')} 
        aria-label="Heading 1"
      >
        H1
      </button>
      <button 
        className={styles['toolbar-btn']} 
        onClick={() => handleFormat('formatBlock', 'H2')} 
        aria-label="Heading 2"
      >
        H2
      </button>
      <button 
        className={styles['toolbar-btn']} 
        onClick={() => handleFormat('formatBlock', 'H3')} 
        aria-label="Heading 3"
      >
        H3
      </button>
      <div className="separator" style={{ width: 1, background: '#ccc', margin: '0 5px' }}></div>
      <button 
        className={styles['toolbar-btn']} 
        onClick={handleUndo} 
        disabled={state.historyPointer <= 0}
        aria-label="Undo"
      >
        ↺ Undo
      </button>
      <button 
        className={styles['toolbar-btn']} 
        onClick={handleRedo} 
        disabled={state.historyPointer >= state.history.length - 1}
        aria-label="Redo"
      >
        ↻ Redo
      </button>
    </div>
  );
};

export default EditorToolbar;

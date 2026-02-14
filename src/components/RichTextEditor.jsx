import React, { useEffect, useState, useReducer, useRef } from 'react';
import { EditorContext } from '../../contexts/EditorContext';
import { editorReducer, initialState } from '../../hooks/useEditorReducer';
import { debounce } from '../../utils/editorUtils';
import EditorContent from './EditorContent';
import EditorToolbar from './EditorToolbar';
import PresenceIndicators from './PresenceIndicators';
import ErrorBoundary from '../ErrorBoundary';
import styles from '../../styles/Editor.module.css';


const RichTextEditor = ({ onChange }) => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(editorReducer, initialState);
  

  const notifyChange = useRef(debounce((content) => {
      if (onChange) onChange(content);
  }, 500)).current;

  useEffect(() => {
    notifyChange(state.content);
  }, [state.content, notifyChange, onChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className={styles['editor-loading']}>Loading Editor...</div>;
  }

  return (
    <ErrorBoundary>
      <EditorContext.Provider value={{ state, dispatch }}>
        <div className={styles['rich-text-editor']}>
          <EditorToolbar />
          <EditorContent />
          <PresenceIndicators />
        </div>
      </EditorContext.Provider>
    </ErrorBoundary>
  );
};

export default RichTextEditor;

import { describe, it, expect } from 'vitest';
import { editorReducer, ACTIONS, initialState } from '../src/hooks/useEditorReducer';

describe('editorReducer', () => {
  it('should return initial state', () => {
    expect(editorReducer(undefined, {})).toEqual(undefined); 
    expect(editorReducer(initialState, {})).toEqual(initialState);
  });


  it('should handle TYPE_CHARACTER', () => {
    const newState = editorReducer(initialState, {
      type: ACTIONS.TYPE_CHARACTER,
      payload: '<p>New Content</p>',
    });

    expect(newState.content).toBe('<p>New Content</p>');
    expect(newState.history).toHaveLength(2);
    expect(newState.history[1]).toBe('<p>New Content</p>');
    expect(newState.historyPointer).toBe(1);
  });

  it('should handle SET_SELECTION', () => {
      const newState = editorReducer(initialState, {
          type: ACTIONS.SET_SELECTION,
          payload: { selectedText: 'test', selectionRange: {} }
      });
      expect(newState.selectedText).toBe('test');
      expect(newState.selectionRange).toEqual({});
  });

  it('should handle UNDO', () => {
    const stateWithHistory = {
      content: '<p>Second</p>',
      history: ['<p>First</p>', '<p>Second</p>'],
      historyPointer: 1,
    };

    const newState = editorReducer(stateWithHistory, { type: ACTIONS.UNDO });

    expect(newState.content).toBe('<p>First</p>');
    expect(newState.historyPointer).toBe(0);
  });

  it('should handle REDO', () => {
    const stateWithHistory = {
      content: '<p>First</p>',
      history: ['<p>First</p>', '<p>Second</p>'],
      historyPointer: 0,
    };

    const newState = editorReducer(stateWithHistory, { type: ACTIONS.REDO });

    expect(newState.content).toBe('<p>Second</p>');
    expect(newState.historyPointer).toBe(1);
  });

  it('should truncate future history on new change in middle of stack', () => {
    const stateWithHistory = {
      content: '<p>Old Second</p>',
      history: ['<p>First</p>', '<p>Old Second</p>', '<p>Old Third</p>'],
      historyPointer: 1,
    };

    const newState = editorReducer(stateWithHistory, { 
      type: ACTIONS.TYPE_CHARACTER, 
      payload: '<p>New Path</p>' 
    });

    expect(newState.content).toBe('<p>New Path</p>');
    expect(newState.history).toEqual(['<p>First</p>', '<p>Old Second</p>', '<p>New Path</p>']);
    expect(newState.historyPointer).toBe(2);
  });
});

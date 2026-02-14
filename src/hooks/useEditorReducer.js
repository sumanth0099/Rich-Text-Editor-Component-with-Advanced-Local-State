export const initialState = {
  content: '<p>Start typing...</p>',
  history: ['<p>Start typing...</p>'],
  historyPointer: 0,
  selectedText: '',
  selectionRange: null,
};

export const ACTIONS = {
  TYPE_CHARACTER: 'TYPE_CHARACTER',
  APPLY_STYLE: 'APPLY_STYLE',
  UNDO: 'UNDO',
  REDO: 'REDO',
  SET_SELECTION: 'SET_SELECTION',
  SET_CONTENT: 'SET_CONTENT',
};

export const editorReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.TYPE_CHARACTER:
    case ACTIONS.SET_CONTENT: {
      const newContent = action.payload;
      if (newContent === state.content) return state;

      const historyUpToNow = state.history.slice(0, state.historyPointer + 1);
      const newHistory = [...historyUpToNow, newContent];
      

      if (newHistory.length > 50) {
        newHistory.shift();
      }

      return {
        ...state,
        content: newContent,
        history: newHistory,
        historyPointer: newHistory.length - 1,
      };
    }

    case ACTIONS.APPLY_STYLE: {
      return state;
    }

    case ACTIONS.SET_SELECTION: {
      return {
        ...state,
        selectedText: action.payload.selectedText || '',
        selectionRange: action.payload.selectionRange || null,
      };
    }

    case ACTIONS.UNDO: {
      if (state.historyPointer <= 0) return state;
      const newPointer = state.historyPointer - 1;
      return {
        ...state,
        content: state.history[newPointer],
        historyPointer: newPointer,
      };
    }

    case ACTIONS.REDO: {
      if (state.historyPointer >= state.history.length - 1) return state;
      const newPointer = state.historyPointer + 1;
      return {
        ...state,
        content: state.history[newPointer],
        historyPointer: newPointer,
      };
    }

    default:
      return state;
  }
};

# Rich Text Editor Component

A feature-rich, interactive Rich Text Editor component built with React, focusing on advanced local state management and extensive testing.

## Features
- **Rich Text Formatting**: Bold, Italic, Underline, H1, H2, H3.
- **Undo/Redo History**: Robust history management for text and style changes.
- **Advanced State Management**: Uses `useReducer` and Context API.
- **Accessibility**: Keyboard navigation, ARIA attributes.
- **Responsive Design**: Adapts to mobile and desktop.
- **Test Coverage**: Comprehensive unit and integration tests using Vitest and React Testing Library.

## Tech Stack
- React
- JavaScript
- Plain CSS
- Vitest & React Testing Library

## Setup & Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Run tests:
   ```bash
   npm test
   ```

## Architecture
- **RichTextEditor**: Main container handling Context provider and Error Boundary.
- **EditorContext**: Provides state and dispatch to children.
- **useEditorReducer**: Manages complex state (content, history, selection).
- **EditorContent**: Handles `contentEditable` interactions and syncs with state.
- **EditorToolbar**: Dispatches formatting actions.

## Deployment
Use Docker to build and run the application:

```bash
docker-compose up --build
```

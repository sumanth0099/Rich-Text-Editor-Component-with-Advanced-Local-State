import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import RichTextEditor from '../src/components/RichTextEditor/RichTextEditor';



describe('RichTextEditor Integration', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const setupAndLoad = () => {
    render(<RichTextEditor />);
    render(<RichTextEditor />);
    act(() => {
        vi.advanceTimersByTime(1100);
    });
  };

  it('renders correctly', () => {
    render(<RichTextEditor />);
    expect(screen.getByText('Loading Editor...')).toBeInTheDocument();
    
    act(() => {
      vi.advanceTimersByTime(1100);
    });

    expect(screen.queryByText('Loading Editor...')).not.toBeInTheDocument();
    expect(screen.getByRole('toolbar')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Current User')).toBeInTheDocument();
  });

  it('handles toolbar actions', () => {
    setupAndLoad();

    const boldBtn = screen.getByLabelText('Bold');
    fireEvent.click(boldBtn);

    expect(document.execCommand).toHaveBeenCalledWith('bold', false, null);
  });
  
  it('updates content on input', () => {
    setupAndLoad();

    const editor = screen.getByRole('textbox');
    
    editor.innerHTML = '<p>Hello World</p>';
    fireEvent.input(editor);

    const undoBtn = screen.getByLabelText('Undo');

    
    expect(undoBtn).not.toBeDisabled();
  });
});

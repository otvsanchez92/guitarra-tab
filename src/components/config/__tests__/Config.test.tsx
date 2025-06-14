import { render, screen, fireEvent } from '@testing-library/react';
import Config from '../Config';
import { useTranslation } from 'react-i18next';
import { TConfigProps } from '../types';

// Mock i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}));

// Mock store functions
type MockStore = {
  onChangeNumberStrings: jest.Mock;
  onChangeColor: jest.Mock;
  clearNotes: jest.Mock;
  clearNote: jest.Mock;
  changeTuning: jest.Mock;
  changeFrets: jest.Mock;
  addInstrument: jest.Mock;
};

const mockStore: MockStore = {
  onChangeNumberStrings: jest.fn(),
  onChangeColor: jest.fn(),
  clearNotes: jest.fn(),
  clearNote: jest.fn(),
  changeTuning: jest.fn(),
  changeFrets: jest.fn(),
  addInstrument: jest.fn()
};

describe('Config Component', () => {
  const mockProps: TConfigProps = {
    onChangeNumberStrings: mockStore.onChangeNumberStrings,
    onChangeColor: mockStore.onChangeColor,
    clearNotes: mockStore.clearNotes,
    clearNote: mockStore.clearNote,
    actives: [],
    changeTuning: mockStore.changeTuning,
    editTuning: false,
    copyScale: jest.fn(),
    changeFrets: mockStore.changeFrets,
    frets: 24,
    addInstrument: mockStore.addInstrument,
    children: <div>Test</div>
  };

  it('renders title correctly', () => {
    render(<Config {...mockProps} />);
    expect(screen.getByText('config.title')).toBeInTheDocument();
  });

  it('calls onChangeNumberStrings when number of strings changes', () => {
    render(<Config {...mockProps} />);
    const stringsInput = screen.getByLabelText('config.strings');
    fireEvent.change(stringsInput, { target: { value: '6' } });
    expect(mockStore.onChangeNumberStrings).toHaveBeenCalledWith(6);
  });

  it('calls onChangeColor when color changes', () => {
    render(<Config {...mockProps} />);
    const colorInput = screen.getByLabelText('config.color');
    fireEvent.change(colorInput, { target: { value: '#ff0000' } });
    expect(mockStore.onChangeColor).toHaveBeenCalledWith('#ff0000');
  });

  it('calls clearNotes when clear button is clicked', () => {
    render(<Config {...mockProps} />);
    const clearButton = screen.getByText('config.clear');
    fireEvent.click(clearButton);
    expect(mockStore.clearNotes).toHaveBeenCalled();
  });

  it('calls clearNote when undo button is clicked', () => {
    render(<Config {...mockProps} />);
    const undoButton = screen.getByText('config.undo');
    fireEvent.click(undoButton);
    expect(mockStore.clearNote).toHaveBeenCalled();
  });

  it('calls addInstrument when add button is clicked', () => {
    render(<Config {...mockProps} />);
    const addButton = screen.getByText('config.addInstrument');
    fireEvent.click(addButton);
    expect(mockStore.addInstrument).toHaveBeenCalled();
  });

  it('calls copyScale when copy button is clicked', () => {
    render(<Config {...mockProps} />);
    const copyButton = screen.getByText('config.copyScale');
    fireEvent.click(copyButton);
    expect(mockProps.copyScale).toHaveBeenCalled();
  });
});

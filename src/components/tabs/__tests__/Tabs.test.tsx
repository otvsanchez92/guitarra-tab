import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tabs } from '../Tabs';
import { TTabsProps } from '../types';
import { useTranslation } from 'react-i18next';

// Mock i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}));

describe('Tabs Component', () => {
  const mockProps: TTabsProps = {
    notes: [
      { x: 3, y: 0, color: 'red' },
      { x: 5, y: 1, color: 'blue' },
      { x: 7, y: 2, color: 'green' }
    ],
    tuning: ['E', 'A', 'D', 'G', 'B', 'e'],
    strings: 6
  };

  it('renders title correctly', () => {
    render(<Tabs {...mockProps} />);
    const title = screen.getByText(/tabs.title/i);
    expect(title).toBeInTheDocument();
  });

  it('renders correct number of strings with tuning', () => {
    render(<Tabs {...mockProps} />);
    const stringLines = screen.getAllByRole('heading', { level: undefined });
    expect(stringLines).toHaveLength(mockProps.strings);

    // Verify each string has its tuning note
    mockProps.tuning.slice(0, mockProps.strings).forEach((note: string, index: number) => {
      expect(screen.getByText(`${note.padEnd(2)}|`)).toBeInTheDocument();
    });
  });

  it('renders notes correctly', () => {
    render(<Tabs {...mockProps} />);
    const { notes } = mockProps;

    // Verify each note is rendered with correct position and color
    notes.forEach(({ x, y, color }) => {
      const noteElement = screen.getByText(`${x.toString().padEnd(3, '-')}`);
      expect(noteElement).toHaveStyle(`color: ${color}`);
      expect(noteElement).toBeInTheDocument();
    });

    // Verify empty positions are rendered as dashes
    const dashElements = screen.getAllByText(/---/);
    expect(dashElements).toHaveLength(18); // 6 strings * 3 positions - 3 notes = 18 dashes
  });

  it('renders with different number of strings', () => {
    const props = { ...mockProps, strings: 4 };
    render(<Tabs {...props} />);
    const stringLines = screen.getAllByRole('heading', { level: undefined });
    expect(stringLines).toHaveLength(props.strings);

    // Verify only the first 4 tuning notes are shown
    props.tuning.slice(0, props.strings).forEach((note: string, index: number) => {
      expect(screen.getByText(`${note.padEnd(2)}|`)).toBeInTheDocument();
    });
  });
});

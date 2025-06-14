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
    expect(screen.getByText('tabs.title')).toBeInTheDocument();
  });

  it('displays correct number of strings', () => {
    render(<Tabs {...mockProps} />);
    const stringLines = screen.getAllByRole('heading', { level: undefined });
    expect(stringLines.length).toBe(mockProps.strings);
  });

  it('renders notes with correct colors', () => {
    render(<Tabs {...mockProps} />);
    const notes = screen.getAllByRole('heading', { level: undefined });

    // Check first string (y=0) has red note at position 3
    expect(notes[0]).toHaveStyle('color: red');
    expect(notes[0]).toContainHTML('3--');

    // Check second string (y=1) has blue note at position 5
    expect(notes[1]).toHaveStyle('color: blue');
    expect(notes[1]).toContainHTML('5--');

    // Check third string (y=2) has green note at position 7
    expect(notes[2]).toHaveStyle('color: green');
    expect(notes[2]).toContainHTML('7--');
  });

  it('renders dashes for empty positions', () => {
    render(<Tabs {...mockProps} />);
    const notes = screen.getAllByRole('heading', { level: undefined });

    // Check that empty positions have dashes
    expect(notes[0]).toContainHTML('---');
    expect(notes[1]).toContainHTML('---');
    expect(notes[2]).toContainHTML('---');
  });
});

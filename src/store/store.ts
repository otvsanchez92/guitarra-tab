import { create } from 'zustand';
import { TActive } from './types'; 
import { getPositionFromNote, getNotesSequence, getNoteFromPosition } from '../utils/scales';

interface TStore {
  notes: { x: number; y: number }[];
  strings: number;
  tuning: string[];
  color: string;
  actives: { x: number; y: number; color: string }[];
  scale: string[];
  lastNote: { x: number; y: number } | null;
  frets: number;
  addNote: (active: TActive) => void;
  changeNumberStrings: (strings: number) => void;
  changeColor: (color: string) => void;
  changeFrets: (frets: number) => void;
  changeTuning: (value: string, position: number) => void;
  clearNotes: () => void;
  clearNote: () => void;
  setActiveButton: (active: TActive) => void;
  addScale: (note: string) => void;
  selectScale: (scale: string | string[]) => void;
}

const useStore = create<TStore>((set, get) => ({
  notes: [],
  strings: 6,
  tuning: ['E', 'B', 'G', 'D', 'A', 'E'],
  color: 'red',
  actives: [],
  scale: [],
  lastNote: null,
  frets: 24,

  addNote: ({ x, y }) => {
    const newNote = { x, y };
    set((state) => ({
      notes: [...state.notes, newNote],
      lastNote: newNote,
    }));
  },

  changeNumberStrings: (strings) => {
    const defaultTunings: Record<number, string[]> = {
      4: ['G', 'D', 'A', 'E'],
      5: ['G', 'D', 'A', 'E', 'B'],
      6: ['E', 'B', 'G', 'D', 'A', 'E'],
      7: ['E', 'B', 'G', 'D', 'A', 'E', 'B'],
    };

    set({
      strings,
      tuning: defaultTunings[strings] || get().tuning,
    });
  },

  changeColor: (color) => {
    set({ color });
  },

  changeFrets: (frets) => {
    set({ frets });
  },

  changeTuning: (value, position) => {
    const currentTuning = [...get().tuning];
    currentTuning[position] = value;
    set({ tuning: currentTuning });
  },

  clearNotes: () => {
    set({ notes: [], actives: [], scale: [], lastNote: null });
  },

  clearNote: () => {
    set((state) => ({
      notes: state.notes.slice(0, -1),
      actives: state.actives.slice(0, -1),
      scale: state.scale.slice(0, -1),
    }));
  },

  setActiveButton: ({ x, y, color }) => {
    const exists = get().actives.some((a) => a.x === x && a.y === y);
    if (!exists) {
      set((state) => ({
        actives: [...state.actives, { x, y, color }],
      }));
    }
  },

  addScale: (note) => {
    set((state) => ({
      scale: [...state.scale, note],
    }));
  },

  selectScale: (scale: string | string[]) => {
    const scaleArray = typeof scale === 'string' ? [scale] : scale;
    const { strings, tuning, frets, color } = get();
    const newNotes: { x: number; y: number }[] = [];

    for (let string = 0; string < strings; string++) {
      for (let fret = 0; fret <= frets; fret++) {
        const note = getNoteFromPosition(fret, string, tuning);
        if (scaleArray.includes(note)) {
          newNotes.push({ x: fret, y: string });
        }
      }
    }
    
    set({
      notes: newNotes,
      actives: newNotes.map(({ x, y }) => ({ x, y, color })),
      scale: scaleArray,
    });
  },
}));

export { useStore };

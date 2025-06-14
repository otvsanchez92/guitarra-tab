import { create } from 'zustand';
import { TInstrument, TStore } from './types';
import { getPositionFromNote, getNotesSequence, getNoteFromPosition } from '../utils/scales';

const initialState: TInstrument = {
  notes: [],
  strings: 6,
  tuning: ['E', 'B', 'G', 'D', 'A', 'E'],
  color: 'red',
  actives: [],
  scale: [],
  lastNote: null,
  frets: 24,
  instrument: 0
};

const useStore = create<TStore>((set, get) => ({
  instruments: [initialState],
  lastInstrument: 0,
  color: 'red',

  addInstrument: times => {
    console.log(' chamou ', times);
    set((state: TStore) => {
      if (!times) {
        const newState = [...state.instruments];

        newState.push({
          ...initialState,
          lastNote: null,
          instrument: newState.length
        });

        return {
          instruments: newState,
          lastInstrument: newState.length - 1
        };
      } else {
        console.log(' oiii ');
        const newState = [];

        for (let i = 0; i < times; i++) {
          newState.push({
            ...initialState,
            lastNote: null,
            instrument: i
          });
        }

        return {
          instruments: newState,
          lastInstrument: newState.length - 1
        };
      }
    });
  },
  addNote: ({ x, y, color }, instrument = 0) => {
    set((state: TStore) => {
      const newState = state.instruments.map(inst => {
        if (inst.instrument === instrument) {
          return {
            ...inst,
            notes: [...inst.notes, { x, y, color }]
          };
        }
        return inst;
      });

      return { instruments: newState, lastInstrument: instrument };
    });
  },

  changeNumberStrings: (strings, instrument = 0) => {
    const defaultTunings: Record<number, string[]> = {
      4: ['G', 'D', 'A', 'E'],
      5: ['G', 'D', 'A', 'E', 'B'],
      6: ['E', 'B', 'G', 'D', 'A', 'E'],
      7: ['E', 'B', 'G', 'D', 'A', 'E', 'B']
    };

    set((state: TStore) => {
      const newState = [...state.instruments];
      newState[instrument].strings = strings;
      newState[instrument].tuning = defaultTunings[strings] || get().instruments[instrument].tuning;
      return { instruments: newState };
    });
  },

  changeColor: color => {
    set((state: TStore) => {
      return { ...state, color };
    });
  },

  changeFrets: (frets, instrument = 0) => {
    set((state: TStore) => {
      const newState = [...state.instruments];
      newState[instrument].frets = frets;
      return { ...state, instruments: newState };
    });
  },

  changeTuning: (value, position, instrument = 0) => {
    const currentTuning = [...get().instruments[instrument].tuning];
    currentTuning[position] = value;
    set((state: TStore) => {
      const newState = [...state.instruments];
      newState[instrument].tuning = currentTuning;
      return { instruments: newState };
    });
  },

  clearNotes: () => {
    set((state: TStore) => {
      return { instruments: state.instruments.map(instrument => ({ ...instrument, notes: [] })) };
    });
  },

  clearNote: () => {
    set((state: TStore) => {
      const newState = [...state.instruments];

      const instrument = state.lastInstrument;
      newState[instrument].notes = newState[instrument].notes.slice(0, -1);
      newState[instrument].actives = newState[instrument].actives.slice(0, -1);
      newState[instrument].scale = newState[instrument].scale.slice(0, -1);
      return { instruments: newState };
    });
  },

  setActiveButton: ({ x, y }) => {
    const exists = get().instruments[0].actives.some(a => a.x === x && a.y === y);
    if (!exists) {
      set((state: TStore) => {
        const newState = [...state.instruments];
        const currentColor = get().instruments[0].color;
        newState[0].actives.push({ x, y, color: currentColor });
        return { instruments: newState };
      });
    }
  },

  addScale: note => {
    set((state: TStore) => {
      const newState = [...state.instruments];
      newState[0].scale.push(note);
      return { instruments: newState };
    });
  },

  selectScale: (scale: string | string[]) => {
    const scaleArray = typeof scale === 'string' ? [scale] : scale;
    const { strings, tuning, frets, color } = get().instruments[0];
    const newNotes: { x: number; y: number }[] = [];

    for (let string = 0; string < strings; string++) {
      for (let fret = 0; fret <= frets; fret++) {
        const note = getNoteFromPosition(fret, string, tuning);
        if (scaleArray.includes(note)) {
          newNotes.push({ x: fret, y: string });
        }
      }
    }

    console.log(newNotes);

    set((state: TStore) => {
      const newState = [...state.instruments];
      newState[0].actives = newNotes.map(({ x, y }) => ({ x, y, color }));
      newState[0].scale = scaleArray;
      newState[0].color = color;
      newState[0].frets = frets;
      newState[0].strings = strings;
      newState[0].tuning = tuning;
      newState[0].notes = newNotes.map(({ x, y }) => ({ x, y, color }));
      return { instruments: newState };
    });
  }
}));

export { useStore };

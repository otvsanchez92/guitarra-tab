export type TActive = {
  x: number;
  y: number;
  color?: string;
};

export interface TInstrument {
  notes: TActive[];
  strings: number;
  tuning: string[];
  color: string;
  actives: TActive[];
  scale: string[];
  lastNote: TActive | null;
  frets: number;
  instrument: number;
}

export interface TStore {
  instruments: TInstrument[];
  lastInstrument: number;
  addNote: (active: TActive, instrument?: number) => void;
  changeNumberStrings: (strings: number) => void;
  changeColor: (color: string) => void;
  changeFrets: (frets: number) => void;
  changeTuning: (value: string, position: number) => void;
  clearNotes: () => void;
  clearNote: () => void;
  setActiveButton: (active: TActive) => void;
  addScale: (note: string) => void;
  selectScale: (scale: string | string[]) => void;
  addInstrument: (times?: number) => void;
  color: string;
}

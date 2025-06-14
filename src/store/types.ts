export type TActive = {
  x: number;
  y: number;
  color: string;
};

export type TStore = {
  notes: TActive[];
  strings: number;
  tuning: string[];
  color: string;
  actives: TActive[];
  addNote: (active: TActive) => void;
  changeNumberStrings: (strings: number) => void;
  changeColor: (color: string) => void;
  clearNotes: () => void;
  clearNote: () => void;
  setActiveButton: (active: TActive) => void;
  changeTuning: (value: string, position: number) => void;
  addScale: (note: string) => void;
  selectScale: (scale: string[]) => void;
  scale: string[];
  frets: number;
  changeFrets: (frets: number) => void;
};

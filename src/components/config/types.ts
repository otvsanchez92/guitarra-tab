import { TActive } from '@/store/types';

export type TConfigProps = {
  onChangeNumberStrings: (strings: number) => void;
  onChangeColor: (color: string) => void;
  clearNotes: () => void;
  clearNote: () => void;
  actives: TActive[];
  changeTuning: () => void;
  editTuning: boolean;
  copyScale: () => void;
  changeFrets: (frets: number) => void;
  frets: number;
  children: React.ReactNode;
  addInstrument: () => void;
};

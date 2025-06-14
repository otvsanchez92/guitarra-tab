export type TActive = {
  x: number;
  y: number;
};

export type TGuitarProps = {
  tuning: string[];
  onSelectNote: ({ x, y }: { x: number; y: number }) => void;
  strings: number;
  color: string;
  editTuning: boolean;
  frets: number;
  diagramIndex?: number;
};

export interface IMarksProps extends TActive {
  strings: number;
}

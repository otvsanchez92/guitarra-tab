export interface ScaleData {
  name: string;
  notes: string[];
  description: string;
  type: string;
  examples: string[];
  id: string;
}

export const commonScales: ScaleData[] = [
  {
    name: 'Escala Maior',
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    description: 'Escala mais comum em música ocidental, base para música clássica e popular',
    type: 'diatonic',
    examples: ['C', 'G', 'D', 'A', 'E', 'B', 'F#'],
    id: 'major'
  },
  {
    name: 'Escala Menor Natural',
    notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
    description: 'Escala menor mais comum, usada em música clássica e jazz',
    type: 'diatonic',
    examples: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
    id: 'natural_minor'
  },
  {
    name: 'Escala Blues',
    notes: ['C', 'Eb', 'F', 'F#', 'G', 'Bb'],
    description: 'Escala característica do blues, com a quinta menor',
    type: 'hexatonic',
    examples: ['C7', 'F7', 'G7'],
    id: 'blues'
  },
  {
    name: 'Escala Pentatônica Maior',
    notes: ['C', 'D', 'E', 'G', 'A'],
    description: 'Escala de cinco notas, muito usada em rock e blues',
    type: 'pentatonic',
    examples: ['C', 'Dm', 'Em', 'G', 'Am'],
    id: 'major_pentatonic'
  },
  {
    name: 'Escala Pentatônica Menor',
    notes: ['C', 'Eb', 'F', 'G', 'Bb'],
    description: 'Escala pentatônica mais comum, usada em rock, blues e jazz',
    type: 'pentatonic',
    examples: ['Cm', 'Fm', 'Gm'],
    id: 'minor_pentatonic'
  },
  {
    name: 'Escala Dórica',
    notes: ['C', 'D', 'Eb', 'F', 'G', 'A', 'Bb'],
    description: 'Escala modal, usada em música moderna e jazz',
    type: 'modal',
    examples: ['Cm7', 'F7', 'Gm7'],
    id: 'dorian'
  },
  {
    name: 'Escala Mixolídia',
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'Bb'],
    description: 'Escala modal, usada em blues e rock',
    type: 'modal',
    examples: ['C7', 'F7', 'G7'],
    id: 'mixolydian'
  },
  {
    name: 'Escala Lídia',
    notes: ['C', 'D', 'E', 'F#', 'G', 'A', 'B'],
    description: 'Escala modal com quartas aumentadas',
    type: 'modal',
    examples: ['Cmaj7', 'Dm7', 'Em7'],
    id: 'lydian'
  },
  {
    name: 'Escala Frígia',
    notes: ['C', 'Db', 'Eb', 'F', 'G', 'Ab', 'Bb'],
    description: 'Escala modal com segunda menor',
    type: 'modal',
    examples: ['Cm7', 'Dm7', 'Em7'],
    id: 'phrygian'
  },
  {
    name: 'Escala Eólia',
    notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
    description: 'Escala modal equivalente à menor natural',
    type: 'modal',
    examples: ['Cm7', 'Dm7', 'Em7'],
    id: 'eolian'
  }
];

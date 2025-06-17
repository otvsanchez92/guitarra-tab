export const sharpNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const flatNotes  = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const enharmonicMap: { [note: string]: number } = {
  C: 0, 'B#': 0,
  'C#': 1, Db: 1,
  D: 2,
  'D#': 3, Eb: 3,
  E: 4, Fb: 4,
  F: 5, 'E#': 5,
  'F#': 6, Gb: 6,
  G: 7,
  'G#': 8, Ab: 8,
  A: 9,
  'A#': 10, Bb: 10,
  B: 11, Cb: 11,
};

export const noteToIndex = (note: string): number => {
  return enharmonicMap[note] ?? -1;
};

export const indexToNote = (index: number, useFlats = false): string => {
  return (useFlats ? flatNotes : sharpNotes)[index % 12];
};

export const getScaleIntervals = (scale: string[]): number[] => {
  const intervals: number[] = [];
  for (let i = 0; i < scale.length - 1; i++) {
    const current = noteToIndex(scale[i]);
    const next = noteToIndex(scale[i + 1]);
    intervals.push((next - current + 12) % 12);
  }
  return intervals;
};

export const getScaleType = (scale: string[]): string => {
  const intervals = getScaleIntervals(scale);
  const intervalStr = JSON.stringify(intervals);

  const knownScales: { [key: string]: number[] } = {
    major: [2, 2, 1, 2, 2, 2, 1],
    natural_minor: [2, 1, 2, 2, 1, 2, 2],
    blues: [3, 2, 1, 1, 3, 2],
    chromatic: Array(12).fill(1),
    major_pentatonic: [2, 2, 3, 2, 3],
    minor_pentatonic: [3, 2, 2, 3, 2],
    dorian: [2, 1, 2, 2, 2, 1, 2],
    mixolydian: [2, 2, 1, 2, 2, 1, 2],
    lydian: [2, 2, 2, 1, 2, 2, 1],
    phrygian: [1, 2, 2, 2, 1, 2, 2],
    eolian: [2, 1, 2, 2, 1, 2, 2],
  };

  for (const [name, pattern] of Object.entries(knownScales)) {
    if (JSON.stringify(pattern) === intervalStr) return name;
  }

  return 'custom';
};

export const getScalePattern = (scale: string[]): string => {
  return getScaleIntervals(scale).map(i => (i === 1 ? 'm' : i)).join(' - ');
};

export const patterns: { [key: string]: number[] } = {
  major: [2, 2, 1, 2, 2, 2, 1],
  natural_minor: [2, 1, 2, 2, 1, 2, 2],
  blues: [3, 2, 1, 1, 3, 2],
  chromatic: Array(12).fill(1),
  major_pentatonic: [2, 2, 3, 2, 3],
  minor_pentatonic: [3, 2, 2, 3, 2],
  dorian: [2, 1, 2, 2, 2, 1, 2],
  mixolydian: [2, 2, 1, 2, 2, 1, 2],
  lydian: [2, 2, 2, 1, 2, 2, 1],
  phrygian: [1, 2, 2, 2, 1, 2, 2],
  eolian: [2, 1, 2, 2, 1, 2, 2],
};


export const getScaleNotes = (
  scaleType: string,
  rootNote: string,
  useFlats: boolean = false
): string[] => {

  const intervals = patterns[scaleType];
  if (!intervals) return [];

  const letters = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const enharmonicLookup: { [index: number]: string[] } = {
    0: ['C', 'B#'],
    1: ['C#', 'Db'],
    2: ['D'],
    3: ['D#', 'Eb'],
    4: ['E', 'Fb'],
    5: ['F', 'E#'],
    6: ['F#', 'Gb'],
    7: ['G'],
    8: ['G#', 'Ab'],
    9: ['A'],
    10: ['A#', 'Bb'],
    11: ['B', 'Cb'],
  };

  const rootIndex = noteToIndex(rootNote);
  const rootLetter = rootNote[0].toUpperCase();

  const letterSequence: string[] = [];
  let letterPos = letters.indexOf(rootLetter);
  for (let i = 0; i < intervals.length + 1; i++) {
    letterSequence.push(letters[letterPos % 7]);
    letterPos++;
  }

  const scale: string[] = [];
  let currentIndex = rootIndex;
  for (let i = 0; i < letterSequence.length; i++) {
    const expectedLetter = letterSequence[i];
    const noteOptions = enharmonicLookup[currentIndex];
    const matchingNote = noteOptions.find(n => n[0] === expectedLetter);
    scale.push(matchingNote ?? indexToNote(currentIndex, useFlats));

    if (i < intervals.length) {
      currentIndex = (currentIndex + intervals[i]) % 12;
    }
  }

  return scale;
};

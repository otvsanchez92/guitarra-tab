

export const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * Retorna a nota (ex: "C") com base no traste e corda
 */
export const getNoteFromPosition = (fret: number, string: number, tuning: string[]): string => {
  const openNote = tuning[string];
  const openIndex = notes.indexOf(openNote);
  if (openIndex === -1) return '';
  const noteIndex = (openIndex + fret) % 12;
  return notes[noteIndex];
};

/**
 * Retorna as posições (x = traste, y = corda) onde a nota aparece na corda informada
 */
export const getPositionFromNote = (
  note: string,
  string: number,
  tuning: string[],
  frets: number,
): { x: number; y: number } | null => {
  const openNote = tuning[string];
  console.log(openNote)
  const openIndex = notes.indexOf(openNote);
  console.log(openIndex)
  const targetIndex = notes.indexOf(note);
  console.log(targetIndex)
  if (openIndex === -1 || targetIndex === -1) return null;

  for (let fret = 0; fret <= frets; fret++) {
    const noteIndex = (openIndex + fret) % 12;
    if (noteIndex === targetIndex) {
      return { x: fret, y: string };
    }
  }

  return null;
};


const mergeNotes = [...notes, ...notes, ...notes, ...notes];

/**
 * Retorna a sequência de notas para uma corda específica
 */
export const getNotesSequence = (
  string: number,
  tuning: string[],
  frets: number,
): string[] => {
  const openNote = tuning[string];
  const openIndex = notes.indexOf(openNote);
  if (openIndex === -1) return [];

  const sequence: string[] = [];
  
  // Adiciona a nota aberta
  sequence.push(openNote);
  
  // Adiciona as notas para cada traste
  for (let fret = 1; fret <= frets; fret++) {
    const noteIndex = (openIndex + fret) % 12;
    sequence.push(notes[noteIndex]);
  }

  return sequence;
};

export const selectNote = (tonic: string, positionNote: number) => {
  const index = notes.indexOf(tonic);

  return mergeNotes[positionNote + index];
};

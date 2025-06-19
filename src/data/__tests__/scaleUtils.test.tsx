import { getScaleNotes, getScaleIntervals, getScaleType, noteToIndex, indexToNote } from '../scaleUtils'; // Ajuste o caminho conforme necessário

describe('Funções de escala musical', () => {
  describe('getScaleNotes()', () => {
    it('gera escala maior de C corretamente', () => {
      expect(getScaleNotes('major', 'C')).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']);
    });

    it('gera escala maior de C# corretamente (com E# e B#)', () => {
      expect(getScaleNotes('major', 'C#')).toEqual(['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#', 'C#']);
    });

    it('gera escala maior de F com Bb', () => {
      expect(getScaleNotes('major', 'F', true)).toEqual(['F', 'G', 'A', 'Bb', 'C', 'D', 'E', 'F']);
    });

    it('gera escala menor natural de A corretamente', () => {
      expect(getScaleNotes('natural_minor', 'A')).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A']);
    });

    it('gera escala menor natural de E com D natural', () => {
      expect(getScaleNotes('natural_minor', 'E')).toEqual(['E', 'F#', 'G', 'A', 'B', 'C', 'D', 'E']);
    });
  });

  describe('getScaleIntervals()', () => {
    it('retorna os intervalos da escala maior de C corretamente', () => {
      const notes = getScaleNotes('major', 'C');
      expect(getScaleIntervals(notes)).toEqual([2, 2, 1, 2, 2, 2, 1]);
    });

    it('retorna os intervalos da escala menor natural de A corretamente', () => {
      const notes = getScaleNotes('natural_minor', 'A');
      expect(getScaleIntervals(notes)).toEqual([2, 1, 2, 2, 1, 2, 2]);
    });
  });

  describe('getScaleType()', () => {
    it('identifica corretamente a escala maior', () => {
      const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'];
      expect(getScaleType(notes)).toBe('major');
    });

    it('identifica corretamente a escala menor natural', () => {
      const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A'];
      expect(getScaleType(notes)).toBe('natural_minor');
    });

    it('retorna "custom" para uma escala não reconhecida', () => {
      const notes = ['C', 'D', 'E', 'G', 'A', 'B', 'C'];
      expect(getScaleType(notes)).toBe('custom');
    });
  });

  describe('Conversão de notas e índices', () => {
    it('converte nota para índice corretamente', () => {
      expect(noteToIndex('C')).toBe(0);
      expect(noteToIndex('C#')).toBe(1);
      expect(noteToIndex('Db')).toBe(1);
      expect(noteToIndex('Fb')).toBe(4);
      expect(noteToIndex('B#')).toBe(0);
    });

    it('converte índice para nota corretamente', () => {
      expect(indexToNote(0)).toBe('C');
      expect(indexToNote(1)).toBe('C#');
      expect(indexToNote(11)).toBe('B');
      expect(indexToNote(10, true)).toBe('Bb');
    });
  });
});

import Note from './note.js';
let note;

describe('Note class', () => {
    beforeAll(() => {
        note = new Note('F', 1);
    });

    test('constructor should set values', () => {
        expect(note.octave).toBe(1);
        expect(note.note).toBe('F');
    });
    test('set initial octave to 0 and sharp false', () => {
        note = new Note('F');
        expect(note.octave).toBe(0);
        expect(note.sharp).toBe(false);
    });

});

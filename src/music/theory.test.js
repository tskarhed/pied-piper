import { Theory } from './theory';

describe('Music theory', () => {
    let theory;
    beforeEach(() => {
        theory = new Theory();
    });
    describe('should decode scientific music notation', () => {
        it('should return the correct octave', () => {
            expect(theory.decodeNotation('A5').octave).toBe(5);
        });
        it('should handle input with length of 3', () => {
            expect(theory.decodeNotation('C#1')).toEqual({octave: 1, absolute: 13, note: 'C#', noteIndex: 1});
        });
        it('should fail when sending in too many characters', () => {
            expect(() => {
                theory.decodeNotation('A#23');
            }).toThrow();
        });

    });

    describe('should encode scientific notation from number', () => {
        it('encodes properly', () => {
            expect(theory.encodeNotation(13)).toBe('C#1');
        });
    });

    describe('should return proper frequencies', () => {
        it('A4', () => {
            expect(theory.getFrequency(57)).toBe(440);
        });
        it('C0', () => {
            expect(theory.getFrequency(0)).toBeCloseTo(16.35);
        });
    })
});
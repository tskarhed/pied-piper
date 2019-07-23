export class Theory {
    
    // private
    // @n n half notes steps from C0 (Including black keys). Starts at C0. A4 is number 57.
    getFrequency(n){
        return Math.pow(2, (n-57)/12)*440;
    }

    //Returns amount of half-notes steps away from C0
    decodeNotation(string){
        let note;
        if(string.length === 3){
            note = string.slice(0,-1).toUpperCase();
        } else if (string.length === 2){
            note = string[0].toUpperCase();
        } else {
            throw new Error('Faulty music notation');
        }
        const octave = parseInt(string.slice(-1), 10);


        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G0', 'G#', 'A', 'A#', 'B'];
        return { note, noteIndex: notes.indexOf(note), octave, absolute: notes.indexOf(note) + 12* octave};

    }

    setOctave(octave){
        this.octave = octave;
    }

    getOctave(){
        return this.octave;
    }
}
import NoteOrder from "./noteOrder.js";

export default class Note {
    constructor(note, octave = 0, sharp = false){
        this.note = note;
        this.octave = octave;
        this.sharp = sharp;
    }


    render(){
        console.log("Rendering");
        let htmlString = ``;
        let noteOrder = NoteOrder[this.note];
        noteOrder.forEach((hole, i) => {
            let holeHTML = (hole == '+') ? `<div class="plus">+</div>` : (hole ? `<div class="covered"></div>` : `<div class="open"></div>`);
            
            htmlString += holeHTML;
        });
        return htmlString;
    }
};

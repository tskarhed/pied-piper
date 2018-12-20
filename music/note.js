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
            let holeHTML = '';
            if(i == 6){
                holeHTML = (hole == '+') ? `<div class="plus"><span>+</span></div>` : '';
            } else{
                holeHTML =  (hole ? `<div class="covered"></div>` : `<div class="open"></div>`);
            }

            htmlString += holeHTML;
        });
        return htmlString;
    }
};

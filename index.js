import Note from "./music/note.js";

let container = document.querySelector(".notes");

function addNote(noteName){
    let note = new Note(noteName);

    container.innerHTML += `<div class="note">${note.render()}</div>`;
    console.log(container.innerHTML);

}

document.forms['addNote'].onsubmit = function(e){
    e.preventDefault();
    addNote(document.forms['addNote']['note'].value);
};

import React, {Component} from "react";
import Note from "./music/note.js";

let container = document.querySelector(".notes");

export default class App extends Component{
    render(){
        return(
            <h1>This is the title</h1>
        );
    }
}

/*
function addNote(noteName){
    let note = new Note(noteName);

    container.innerHTML += `<div class="note">${note.render()}</div>`;
    console.log(container.innerHTML);

}

document.forms['addNote'].onsubmit = function(e){
    e.preventDefault();
    addNote(document.forms['addNote']['note'].value);
};
*/

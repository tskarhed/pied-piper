import React, {Component} from "react";
import NoteGroup from "./music/note-group";
import './style.css';

export default class App extends Component{
    render(){
        return(
            <React.Fragment>
            <h1>This is the title</h1>
            <NoteGroup notes={["F#", "d", "g", "a", "B", "A"]}/>
            </React.Fragment>
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

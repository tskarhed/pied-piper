import React, {Component} from "react";
import PropTypes from "prop-types";

import AddNote from "./music/add-note";
import Note from "./music/note";
import NoteOrder from "./music/noteOrder.js";

import Header from "./layout/header";

import './style.css';

let localStorage = window.localStorage;

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            selected: undefined,
            title: "Skye Boat Song - Scottish folk song",
            notes: JSON.parse(localStorage.getItem("notes")) || ["F#", "d", "g", "a", "B", "A"]
        }

        //Check for keypress for navigation
        document.addEventListener("keydown", (e) => this.onKeyPress(e));
    }

    onKeyPress(event){
        let key = event.code;
        console.log(event);

        let orderOfNotes = Object.keys(NoteOrder);
        let currentIndex = orderOfNotes.indexOf(this.state.notes[this.state.selected]);

        switch(key){
            case 'Escape':
                this.setState({selected:undefined});
                break;
            case 'ArrowRight':
                this.setState({selected: (this.state.selected == undefined ? 0 : (this.state.selected+1) % this.state.notes.length) });
                break;
            case 'ArrowLeft':
                this.setState({selected: (this.state.selected == undefined ? this.state.notes.length-1 : this.state.selected == 0 ? this.state.notes.length-1 : (this.state.selected-1) % this.state.notes.length) });
                break;

                //Consider if these should loop inifintely
            case 'ArrowUp':
                this.updateNote(this.state.selected, orderOfNotes[ currentIndex == orderOfNotes.length-1 ? orderOfNotes.length-1: currentIndex + 1 ]);
                break;
            case 'ArrowDown':
                this.updateNote(this.state.selected, orderOfNotes[ currentIndex == 0 ? 0 : currentIndex - 1]);
                break;
            case 'Delete':
                this.removeNote(this.state.selected);
                if(this.state.selected == this.state.notes.length){
                    this.setState({selected: this.state.notes.length-1});
                }
                break;
            case 'Enter':
                this.addNote('d');
                this.setState({selected: this.state.notes.length-1});
                break;
            
        }
        
    }

    addNote(note){
        console.log(note);
        let nextNotes = this.state.notes;
        nextNotes.push(note);
        console.log(nextNotes);
        this.setState({notes: nextNotes});

        localStorage.setItem("notes", JSON.stringify(nextNotes));
        console.log(this.state.notes);
    }

    updateNote(index, newNote){
        let nextNotes = this.state.notes;
        nextNotes[index] = newNote;
        this.setState({notes: nextNotes});

        localStorage.setItem("notes", JSON.stringify(nextNotes));
        console.log(this.state.notes);

    }

    removeNote(index){
        let nextNotes = this.state.notes;
        nextNotes.splice(index, 1);

        this.setState({notes: nextNotes});

        localStorage.setItem("notes", JSON.stringify(nextNotes));
    }

    render(){
        return(
            <React.Fragment>
                <Header>
                    <h1>{this.state.title}</h1>
                </Header>
                <div className="noteGroup">
                    {this.state.notes.map((note, i) => {
                        return <Note note={note} selected={i==this.state.selected} onClick={() => this.removeNote(i)} key={i}/>
                    })}
                </div>
                <AddNote onSubmit={this.addNote.bind(this)}/>
                <p>Version:  {__VERSION__}</p>
            </React.Fragment>
        );
    }
}

App.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string
};
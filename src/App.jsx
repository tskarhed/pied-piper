import React, {Component} from "react";
import PropTypes from "prop-types";

import AddNote from "./music/add-note";
import Note from "./music/note";

import Header from "./layout/header";

import './style.css';

let localStorage = window.localStorage;

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "Skye Boat Song - Scottish folk song",
            notes: JSON.parse(localStorage.getItem("notes")) || ["F#", "d", "g", "a", "B", "A"]
        }
    }

    addNote(note){
        console.log(note);
        let nextNotes = this.state.notes;
        nextNotes.push(note);
        console.log(nextNotes);
        this.setState({...this.state, notes: nextNotes});

        localStorage.setItem("notes", JSON.stringify(nextNotes));
        console.log(this.state.notes);
    }

    removeNote(index){
        let nextNotes = this.state.notes;
        nextNotes.splice(index, 1);

        this.setState({...this.state, notes: nextNotes});

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
                        return <Note note={note} onClick={() => this.removeNote(i)} key={i}/>
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
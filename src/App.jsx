import React, {Component} from "react";
import PropTypes from "prop-types";

import NoteGroup from "./music/note-group";
import AddNote from "./music/add-note";
import './style.css';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "This is the title",
            notes: ["F#", "d", "g", "a", "B", "A"]
        }
    }

    addNote(note){
        let nextNotes = this.state.notes;
        nextNotes.push(note);
        console.log(nextNotes);
        this.setState({...this.state, notes: nextNotes});
        console.log(this.state.notes);
    }

    render(){
        return(
            <React.Fragment>
            <h1>{this.state.title}</h1>
            <NoteGroup notes={this.state.notes}/>
            <AddNote onSubmit={this.addNote.bind(this)}/>
            </React.Fragment>
        );
    }
}

App.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string
};
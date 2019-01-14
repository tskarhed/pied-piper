import React, {Component} from "react";
import PropTypes from "prop-types";

import AddNote from "./add-note";
import Note from "./note";
import NoteOrder from "./noteOrder.js";

import Header from "../layout/header";
import Ornament from "../../public/ornament.svg";

let localStorage = window.localStorage;

export default class Song extends Component{
    constructor(props){
        super(props);
        this.state = {
            selected: undefined,
            title: "Skye Boat Song - Scottish folk song",
            notes: JSON.parse(localStorage.getItem("notes")) || ['d', 'e', 'd', 'g', 'g', 'a', 'b','a','D','b','a','b','e','e','d','d','b','g','b','b','a','e','a','a','g', 'e','g','g','g','e','d','d', 'e', 'd', 'g', 'g', 'a', 'b','a','D','b','a','b','e','e','d','d'               ],
            description: "'The Skye Boat Song' is a modern Scottish song which has entered into the folk canon in recent times. It can be played as a waltz, recalling the escape of Prince Charles Edward Stuart (Bonnie Prince Charlie) from Uist to the Isle of Skye after his defeat at the Battle of Culloden in 1746."
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
                this.setState({selected: (this.state.selected == undefined ? 0 : (this.state.selected+1) % (this.state.notes.length +1 )) });
                break;
            case 'ArrowLeft':
                this.setState({selected: (this.state.selected == undefined ? this.state.notes.length : this.state.selected == 0 ? this.state.notes.length : (this.state.selected-1) % this.state.notes.length) });
                break;

                //Consider if these should loop inifintely
            case 'ArrowUp':
                this.updateNote(this.state.selected, orderOfNotes[ currentIndex == orderOfNotes.length-1 ? orderOfNotes.length-1: currentIndex + 1 ]);
                break;
            case 'ArrowDown':
                this.updateNote(this.state.selected, orderOfNotes[ currentIndex == 0 ? 0 : currentIndex - 1]);
                break;
            case 'Backspace':
            case 'Delete':
                this.removeNote(this.state.selected);
                if(this.state.selected == this.state.notes.length){
                    this.setState({selected: this.state.notes.length-1});
                }
                break;
            case 'Enter':
                if(this.state.selected == this.state.notes.length){
                    this.addNote('d');
                    this.setState({selected: this.state.notes.length});
                }
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
                    <a href="https://www.freepik.com/free-vector/vintage-ornaments-kit_1155572.htm">
                        <img src={Ornament} alt="Ornament Designed by Asmaarzq" className="ornament"/>
                    </a>
                    <Header>
                        <h1>{this.state.title}</h1>
                        <p>{this.state.description}</p>
                    </Header>
                    <div className="noteGroup">
                        {this.state.notes.map((note, i) => {
                            return <Note note={note} selected={i==this.state.selected} onClick={() => this.removeNote(i)} key={i}/>
                        })}

                        <AddNote selected={this.state.selected == this.state.notes.length} action={() => this.addNote('d')}/>
                    </div>

                
            </React.Fragment>
        );
    }
}

Song.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string
};
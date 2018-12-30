import React, {Component} from "react";
import PropTypes from "prop-types";
import Note from "./note";

export default class NoteGroup extends Component{
    constructor(props){
        super(props);
        this.state = {...props};
    }

    render(){

        return (<React.Fragment>{
            this.state.notes.map((note, i) => {
                return <Note note={note} key={i}/>
            })
        }</React.Fragment>);
    }
}

NoteGroup.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.string)
};
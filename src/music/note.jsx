import React, {Component} from "react";
import NoteOrder from "./noteOrder.js";
import PropTypes from "prop-types";
import FullHole from "../../public/square.svg";

import "./note.css";

export default class Note extends Component {
    constructor(props){
        super(props);
        this.state = {...props};
    }

    render(){
        this.state.noteOrder = NoteOrder[this.props.note] || 0;

        return (
            <div className={this.props.selected ? 'note selected' : 'note'} onClick={this.props.onClick}>{
                this.state.noteOrder ?
                this.state.noteOrder.map((hole, i) => {

                    if(i == 6){
                        //Check octave
                        return (hole == '+') ? <div className="plus" key={i}><span>+</span></div> : <div key={i} style={{height: 16}}></div>;
                    }

                    if(hole == 2){
                        return <FullHole className="covered" key={i}/>
                    }

                    if(hole == 0){
                        return <div className="open" key={i}></div>;
                    }
                }) : <div className="note empty"></div>
        }</div>);
    }
};

Note.defaultProps = {
    octave: 0,
    note: 'D'
};

Note.propTypes = {
    note: PropTypes.string,
    octave: PropTypes.number,
    sharp: PropTypes.bool
};

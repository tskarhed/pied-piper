import React, {Component} from "react";
import NoteOrder from "./noteOrder.js";
import PropTypes from "prop-types";
import FullHole from "../../public/square.svg";

export default class Note extends Component {
    constructor(props){
        super(props);
        this.state = {...props};
        this.state.noteOrder = NoteOrder[props.note] || 0;
    }


    render(){

        return (
            <div className="note">{
                this.state.noteOrder ?
                this.state.noteOrder.map((hole, i) => {

                    if(i == 6){
                        //Check octave
                        return (hole == '+') ? <div className="plus" key={i}><span>+</span></div> : '';
                    }

                    if(hole == 2){
                        return <FullHole className="covered" key={i}/>
                    }

                    if(hole == 0){
                        return <div className="open" key={i}></div>;
                    }
                }) : <div className="empty"></div>
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

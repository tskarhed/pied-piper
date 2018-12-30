import React, {Component} from "react";
import NoteOrder from "./noteOrder.js";
import PropTypes from "prop-types";
import noteOrder from "./noteOrder.js";

export default class Note extends Component {
    constructor(props){
        super(props);
        this.state = {...props};
        this.state.noteOrder = NoteOrder[props.note];
    }


    render(){
        // console.log("Rendering");
        // let htmlString = ``;
        // noteOrder.forEach((hole, i) => {
        //     let holeHTML = '';
        //     if(i == 6){
        //         holeHTML = (hole == '+') ? `<div class="plus"><span>+</span></div>` : '';
        //     } else{
        //         holeHTML =  (hole ? `<div class="covered"></div>` : `<div class="open"></div>`);
        //     }

        //     htmlString += holeHTML;
        // });
        return (
            <div className="note">{
                this.state.noteOrder.map((hole, i) => {
                    if(i == 6){
                        //Check octave
                        return (hole == '+') ? <div className="plus" key={i}><span>+</span></div> : '';
                    }

                    if(hole == 2){
                        return <div className="covered" key={i}></div>;
                    }

                    if(hole == 0){
                        return <div className="open" key={i}></div>;
                    }
                })
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
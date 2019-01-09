import React from "react";
import PropTypes from "prop-types";
import './note.css';

export default class AddNote extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className={this.props.selected ? 'addNote selected' : 'addNote'} onClick={() => this.props.action()}>
                <span className="im">&#xe072;</span>
            </div>
            );
    }
};


AddNote.propTypes = {
    action: PropTypes.func
};

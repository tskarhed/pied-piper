import React from "react";
import PropTypes from "prop-types";

export default class AddNote extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    render(){
        return (
            <React.Fragment>
                <input onChange={(e) => this.handleChange(e)} value={this.state.value}/>
                <button onClick={() => this.props.onSubmit(this.state.value)}>Add note</button>
            </React.Fragment>);
    }
};


AddNote.propTypes = {
    value: PropTypes.string,
    onSubmit: PropTypes.func
};

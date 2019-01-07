import React from "react";
import PropTypes from "prop-types";
import noteOrder from "./noteOrder";

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
                <select onChange={(e) => this.props.onSubmit(e.value)}>
                    {Object.keys(noteOrder).map((note) => {
                        return <option>{note}</option>
                    })}
                </select>
            </React.Fragment>);
    }
};


AddNote.propTypes = {
    value: PropTypes.string,
    onSubmit: PropTypes.func
};

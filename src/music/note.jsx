import React, { Component } from "react";
import NoteOrder from "./noteOrder.js";
import PropTypes from "prop-types";
import FullHole from "../../public/square.svg";

import "./note.css";

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false,
      ...props
    };
  }

  handleMouseEnter = () => {
    console.log("Hover");
    this.setState({
      mouseOver: true
    });
  };

  handleMouseLeave = () => {
    this.setState({
      mouseOver: false
    });
  };

  handleClick = key => {
    console.log(key);
    const note = Object.keys(NoteOrder).reverse()[key + 8];
    console.log(note);
    this.props.onUpdate(note);
  };

  render() {
    this.state.noteOrder = NoteOrder[this.props.note] || 0;

    return (
      <div
        className={
          this.props.selected || this.state.mouseOver ? "note selected" : "note"
        }
        onClick={this.props.onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.state.noteOrder ? (
          this.state.noteOrder.map((hole, i) => {
            if (i == 6) {
              //Check octave
              return hole == "+" ? (
                <div
                  className="plus"
                  key={i}
                  onClick={() => this.handleClick(7)}
                >
                  <span>+</span>
                </div>
              ) : (
                <div
                  key={i}
                  style={{ height: 16 }}
                  onClick={() => this.handleClick(-7)}
                />
              );
            }

            if (hole == 2) {
              return (
                <img
                  src={FullHole}
                  className="covered"
                  key={i}
                  onClick={() => this.handleClick(i)}
                />
              );
            }

            if (hole == 0) {
              return (
                <div
                  className="open"
                  key={i}
                  onClick={() => this.handleClick(i)}
                />
              );
            }
          })
        ) : (
          <div className="note empty" />
        )}
      </div>
    );
  }
}

Note.defaultProps = {
  octave: 0,
  note: "D"
};

Note.propTypes = {
  note: PropTypes.string,
  octave: PropTypes.number,
  sharp: PropTypes.bool,
  onUpdate: PropTypes.func
};

import React, {Component} from "react";
import PropTypes from "prop-types";

import {BrowserRouter as Router, Route } from "react-router-dom";

import Song from "./music/song";
import Menu from "./layout/menu";

import Content from "./layout/content";

import './style.css';
import './layout/layout.css';


export default class App extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
        <React.Fragment>
            <Menu/>
            <Content>
                <Route path="/" component={Song}/>
            </Content>
            <footer className="footer">
                <p>Version:  {__VERSION__}</p>
                <a href="https://twitter.com/tskarhed">
                    
                <span className="im">&#xe0b1;</span> Any feedback?
                </a>
            </footer>
        </React.Fragment>
        );
    }
}

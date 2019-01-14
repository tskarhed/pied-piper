import React, {Component} from "react";
import PropTypes from "prop-types";

import {Route, Switch } from "react-router-dom";

import Song from "./music/song";
import SongList from "./music/songList";
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
                <Switch>
                    <Route exact path="/" component={SongList}/>

                    <Route path="/song" component={Song}/>
                </Switch>
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

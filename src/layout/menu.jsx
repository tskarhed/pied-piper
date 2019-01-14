import React from "react";

import {NavLink, Switch} from "react-router-dom";

import "./layout.css";
import "../style.css";

let routes = [
    {
        name: "My songs",
        path: "/",
        icon: "archive"
    },{
        name: "New songs",
        path: "/new-song",
        icon: "plus"
    },
];

export default function Menu(){
    return (
        <div className="menu menu">
            <i className="im im-menu menu menuIcon"></i>
            <div className="menu menuItems">
                {routes.map((route, i) => {
                    return <NavLink key={i} className="menu menuItem" to={route.path}><i className={`im im-${route.icon}`}></i>{route.name}</NavLink>
                })}
            </div>
        </div>
    );
}
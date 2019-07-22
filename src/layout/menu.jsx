import React from "react";

import { NavLink, Switch } from "react-router-dom";

import Ornament from "../../public/ornament.svg";
import "./layout.css";
import "../style.css";

let routes = [
  {
    name: "My songs",
    path: "/",
    icon: "archive"
  },
  {
    name: "New songs",
    path: "/new-song",
    icon: "plus"
  }
];

export default function Menu() {
  return (
    <div className="menu menu">
      <NavLink className="menu menuItem" to="/">
        My songs
      </NavLink>
      <a href="https://www.freepik.com/free-vector/vintage-ornaments-kit_1155572.htm">
        <img
          src={Ornament}
          alt="Ornament Designed by Asmaarzq"
          className="ornament"
        />
      </a>

      <NavLink className="menu menuItem" to="new-song">
        New songs
      </NavLink>
    </div>
  );
}

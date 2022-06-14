import React from "react";
import ReactDOM from "react-dom";

function init() {
  const rootElement = document.querySelector("#react-root");
  if (rootElement == null) {
    console.error("react root element could not be found");
    return;
  }

  const element = <h1>Hello, world</h1>;
  ReactDOM.render(element, rootElement);
}

init();

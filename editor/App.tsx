import React from "react";
import ReactDOM from "react-dom";
import { AddNote } from "./AddNote";
import { NoteList } from "./NoteList";

function init() {
  const rootElement = document.querySelector("#react-root");
  if (rootElement == null) {
    console.error("react root element could not be found");
    return;
  }

  ReactDOM.render(
    <>
      <AddNote />
      <NoteList />
    </>,
    rootElement
  );
}

init();

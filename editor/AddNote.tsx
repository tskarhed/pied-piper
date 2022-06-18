import React from "react";
import { Note } from "./Note";
import { noteHoles } from "./noteHoles";

export const AddNote = () => {
  const addSpace = <button>Add space</button>;
  const addEnter = <button>Add divider</button>;
  return (
    <section className="addNote">
      {Object.keys(noteHoles)
        .filter((key) => key[1] !== "b")
        .map((key) => {
          return <Note key={key} note={key} />;
        })}
      {addSpace}
      {addEnter}
    </section>
  );
};

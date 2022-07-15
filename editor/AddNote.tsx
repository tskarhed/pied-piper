import React, { FC } from "react";
import { Note } from "./Note";
import { noteHoles } from "./noteHoles";

interface Props {
  onAdd: (value: string) => void;
}

export const AddNote: FC<Props> = ({ onAdd }) => {
  const addSpace = <button onClick={() => onAdd(" ")}>Add space</button>;
  const addEnter = <button onClick={() => onAdd("Enter")}>Add divider</button>;
  return (
    <section className="addNote">
      {Object.keys(noteHoles)
        .filter((key) => key[1] !== "b")
        .map((key) => {
          return (
            <Note
              onClick={(_event, value) => onAdd(value)}
              key={key}
              note={key}
            />
          );
        })}
      {addSpace}
      {addEnter}
    </section>
  );
};

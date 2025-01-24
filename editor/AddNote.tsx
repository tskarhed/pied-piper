import React, { FC } from "react";
import { Note } from "./Note";
import { simpleAbcNoteMap } from "./noteHoles";

interface Props {
  onAdd: (value: string) => void;
}

export const AddNote: FC<Props> = ({ onAdd }) => {
  const addSpace = <button onClick={() => onAdd("|")}>Add space</button>;
  return (
    <section className="addNote">
      {Object.keys(simpleAbcNoteMap)
        .filter((key) => key[0] !== "_")
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
    </section>
  );
};

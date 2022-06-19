import React, { useState } from "react";
import { AddNote } from "./AddNote";
import { NoteList } from "./NoteList";
import { NoteList2 } from "./NoteList2";

export interface NoteObject {
  note: string;
  /**
   *  Key for lists to remember the same note throughout the session.
   */
  key: string;
}

export const Index = () => {
  const [songObjects, setSongObjects] = useState<NoteObject[]>([]);

  return (
    <>
      <AddNote
        onAdd={(value) => {
          console.log("adding " + value);
          setSongObjects(
            songObjects.concat({
              note: value,
              key: generateKeyId(value, songObjects.length),
            })
          );
        }}
      />
      <NoteList2
        song={songObjects}
        onClick={(index) =>
          setSongObjects(songObjects.filter((_val, i) => i != index))
        }
      />
    </>
  );
};

function generateKeyId(note: string, index: number) {
  return `${note}-${index}`;
}

function generateKeyIds(notes: string[]): { note: string; id: string }[] {
  return notes.map((note, i) => ({ note, id: `${note}-${i}` }));
}

import React, { useEffect, useState } from "react";
import { LayoutGroup, motion, Reorder } from "framer-motion";
import { Note } from "./Note";

export const NoteList = () => {
  const song = ["e", "E", "d", "D", " ", "E", "d", "D"];
  const [notesObj, setNotesObj] = useState(generateKeyIds(song));

  return (
    <Reorder.Group axis="x" values={notesObj} onReorder={setNotesObj}>
      {notesObj.map((note) => (
        <Reorder.Item value={note} key={note.id}>
          <Note note={note.note} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

function generateKeyIds(notes: string[]): { note: string; id: string }[] {
  return notes.map((note, i) => ({ note, id: `${note}-${i}` }));
}

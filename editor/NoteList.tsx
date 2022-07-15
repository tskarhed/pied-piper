import React, { FC, useState } from "react";
import { AnimatePresence, Reorder } from "framer-motion";
import { Note } from "./Note";

interface Props {
  song: string[];
}

export const NoteList: FC<Props> = ({ song }) => {
  const [notesObj, setNotesObj] = useState(generateKeyIds(song));

  return (
    <Reorder.Group axis="x" values={notesObj} onReorder={setNotesObj}>
      <AnimatePresence>
        {notesObj.map((note) => {
          const isNewline = note.note == "Enter";

          return (
            <Reorder.Item
              className={isNewline ? "break" : ""}
              value={note}
              key={note.id}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.2 }}
            >
              {isNewline ? <></> : <Note note={note.note} />}
            </Reorder.Item>
          );
        })}
      </AnimatePresence>
    </Reorder.Group>
  );
};

function generateKeyIds(notes: string[]): { note: string; id: string }[] {
  return notes.map((note, i) => ({ note, id: `${note}-${i}` }));
}

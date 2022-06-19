import React, { FC, useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, Reorder } from "framer-motion";
import { Note, noteVariants } from "./Note";
import { NoteObject } from "./Index";

interface Props {
  song: NoteObject[];
  onClick: (index: number) => void;
}

export const NoteList2: FC<Props> = ({ song, onClick }) => {
  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap" }}
      animate={{ transition: { staggerChildren: 0.02 } }}
    >
      <AnimatePresence initial>
        {song.map((note, i) => {
          const isNewline = note.note == "Enter";

          return (
            <motion.span
              layout
              variants={noteVariants}
              className={isNewline ? "break" : ""}
              key={note.key}
            >
              <Note
                animatePresence
                note={note.note}
                onClick={() => onClick(i)}
              />
            </motion.span>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

function generateKeyIds(notes: string[]): { note: string; id: string }[] {
  return notes.map((note, i) => ({ note, id: `${note}-${i}` }));
}

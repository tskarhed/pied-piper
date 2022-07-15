import React, { FC, useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, Reorder } from "framer-motion";
import { Note, noteVariants } from "./Note";
import { NoteObject } from "./Index";

interface Props {
  song: NoteObject[];
  onClick: (index: number) => void;
}

const styles = {
  cursor: "pointer",
  display: "inline-block",
};

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
            <motion.div
              layout
              variants={noteVariants}
              className={isNewline ? "break" : ""}
              style={styles}
              key={note.key}
              onClick={() => onClick(i)}
            >
              <Note animatePresence note={note.note} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

function generateKeyIds(notes: string[]): { note: string; id: string }[] {
  return notes.map((note, i) => ({ note, id: `${note}-${i}` }));
}

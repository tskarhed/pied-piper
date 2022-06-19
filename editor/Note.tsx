import React, { FC, MouseEvent, useState } from "react";
import { motion } from "framer-motion";
import { noteHoles } from "./noteHoles";

interface Props {
  note: string;
  onClick?: (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    value: string
  ) => void;
  animatePresence?: boolean;
}
type State = (number | string)[];

export const noteVariants = {
  hover: {
    scale: 1.1,
  },
  hidden: {
    opacity: 0,
    scale: 0.4,
  },
  normal: {
    opacity: 1,
    scale: 1,
  },
};

export const Note: FC<Props> = ({ note, onClick, animatePresence = false }) => {
  const styles = {
    cursor: "pointer",
  };

  if (note == " ") {
    return (
      <motion.div
        onClick={(event) => {
          if (onClick) onClick(event, note);
        }}
        style={styles}
        className="note space"
      ></motion.div>
    );
  } else if (note == "Enter") {
    return (
      <motion.hr
        onClick={(event) => {
          if (onClick) onClick(event, note);
        }}
        style={styles}
      />
    );
  }
  const [holes, _setHoles] = useState<State>(noteHoles[note]);
  return (
    <motion.div
      variants={noteVariants}
      whileTap="hover"
      whileDrag="hover"
      whileHover="hover"
      whileFocus="hover"
      initial={animatePresence ? "hidden" : ""}
      animate={animatePresence ? "normal" : ""}
      exit={animatePresence ? "hidden" : ""}
      style={styles}
      className="note"
      onClick={(event) => {
        if (onClick) onClick(event, note);
      }}
    >
      {holes.map((hole) => {
        switch (hole) {
          case 0:
            return <div className="open"></div>;
          case 1:
            return <div className="half covered"></div>;
          case 2:
            return <div className="covered"></div>;
          case "+":
            return <div className="plus">+</div>;
        }
      })}
    </motion.div>
  );
};

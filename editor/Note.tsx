import React, { FC, MouseEvent, useState } from "react";
import { motion } from "framer-motion";
import { noteHoles } from "./noteHoles";

interface Props {
  note: string;
  onClick?: (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    value: string
  ) => void;
}
type State = (number | string)[];

const styles = {
  cursor: "pointer",
};

export const Note: FC<Props> = ({ note, onClick }) => {
  if (note == " ") {
    return <div className="note space"></div>;
  } else if (note == "Enter") {
    return <hr />;
  }
  const [holes, _setHoles] = useState<State>(noteHoles[note]);
  return (
    <div
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
    </div>
  );
};

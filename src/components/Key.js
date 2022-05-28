import React, { useContext } from "react";
import { AppContext } from "../App";

function Key({ keyVal, big }) {
  const { board, setBoard, curAttempt, setCurAttempt, onEnter, onSelectLetter, onDelete } = useContext(AppContext);
  const selectLetter = () => {
    if (keyVal === "ENTER") {
        onEnter();
    } else if (keyVal === "DELETE") {
        onDelete();
    } else {
        onSelectLetter(keyVal);
    }
  };
  return (
    <div className="key" id={big && "big"} onClick={selectLetter}>
      {keyVal}
    </div>
  );
}

export default Key;

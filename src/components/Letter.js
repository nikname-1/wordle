import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPosition, attemptValue, occ }) {
  const { board, correctWord, curAttempt, setDisabledLetters } =
    useContext(AppContext);
    
  const letter = board[attemptValue][letterPosition];

  const correct = correctWord[letterPosition] === letter.toLowerCase();
  const almost =
    !correct &&
    letter !== "" &&
    correctWord.toLowerCase().includes(letter.toLowerCase());

  const letterState =
    curAttempt.attempt > attemptValue &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [curAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {" "}
      {letter}
    </div>
  );
}

export default Letter;

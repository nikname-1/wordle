import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

export const letterState = {
  correct: "correct",
  almost: "almost",
  error: "error",
};

function Letter({ letterPosition, attemptValue }) {
  const { board, correctWord, curAttempt, setDisabledLetters, finStates } =
    useContext(AppContext);
  const letter = board[attemptValue][letterPosition];
  const correct = correctWord[letterPosition] === letter.toLowerCase();
  const almost =
    !correct &&
    letter !== "" &&
    correctWord.toLowerCase().includes(letter.toLowerCase());

  // const letterState =
  //   curAttempt.attempt > attemptValue &&
  //   (correct ? "correct" : almost ? "almost" : "error");
  // console.log(finStates);
  const letterState =
    curAttempt.attempt > attemptValue
      ? finStates[attemptValue][letterPosition]
      : "";

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

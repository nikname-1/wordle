import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

function GameOver() {
  const DICTIONARY_API_BASE_URL =
    "https://api.dictionaryapi.dev/api/v2/entries/en/";
  const [definition, setDefinition] = useState("Not Found");
  const { gameOver, correctWord, curAttempt } = useContext(AppContext);

  const fetchWordDefinitions = async (word) => {
    console.log(`Making request for definitions of ${word}...`);
    const response = await fetch(DICTIONARY_API_BASE_URL + word);
    const json = await response.json();
    return json[0].meanings
      .flatMap((m) => m.definitions)
      .flatMap((d) => d.definition);
  };
  const getWordDefinitions = () => {
    fetchWordDefinitions(correctWord).then((meanings) => {
      setDefinition(meanings[0]);
    });
  };
  useEffect(() => getWordDefinitions());
  return (
    <div className="gameOver">
      <h3>
        {" "}
        {gameOver.guessedWord ? "You Correctly Guessed" : "You Failed :/"}
      </h3>
      <h2>Correct: {correctWord.toUpperCase()}</h2>
      {gameOver.guessedWord && (
        <h3> You guessed in {curAttempt.attempt} attempts</h3>
      )}
      <h3>{definition}</h3>
    </div>
  );
}

export default GameOver;

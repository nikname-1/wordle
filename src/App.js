import Keyboard from "./components/Keyboard";
import Board from "./components/Board";
import "./App.css";
import { boardDefault, generateWordSet } from "./Words";
import { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";
import { letterState } from "./components/Letter";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [curAttempt, setCurAttempt] = useState({
    attempt: 0,
    position: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [correctWord, setCorrectWord] = useState("");
  const [finStates, setFinStates] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  useEffect(() => {
    generateWordSet().then((words) => {
      // console.log(words);
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const checkGuess = (guessedWord) => {
    var word = correctWord.split("");
    var states = ["", "", "", "", ""];
    var count = {};
    word.forEach((val) => (count[val] = (count[val] || 0) + 1));

    for (let i = 0; i < 5; i++) {
      if (guessedWord[i] === correctWord[i]) {
        states[i] = letterState.correct;
        count[guessedWord[i]] -= 1;
      }
    }
    // console.log(count);
    for (let i = 0; i < 5; i++) {
      if (correctWord.includes(guessedWord[i]) && count[guessedWord[i]] > 0) {
        states[i] = letterState.almost;
        count[guessedWord[i]] -= 1;
      } else if (states[i] !== letterState.correct) {
        states[i] = letterState.error;
      }
    }
    // console.log(states);
    const newStates = [...finStates];
    newStates[curAttempt.attempt] = states;
    setFinStates(newStates);
  };

  const onSelectLetter = (keyVal) => {
    if (curAttempt.position > 4 || curAttempt.attempt > 5) return;
    const newBoard = [...board];
    newBoard[curAttempt.attempt][curAttempt.position] = keyVal;
    setBoard(newBoard);
    setCurAttempt({ ...curAttempt, position: curAttempt.position + 1 });
  };

  const onDelete = () => {
    if (curAttempt.position === 0) return;
    const newBoard = [...board];
    newBoard[curAttempt.attempt][curAttempt.position - 1] = "";
    setBoard(newBoard);
    setCurAttempt({ ...curAttempt, position: curAttempt.position - 1 });
  };

  const onEnter = () => {
    if (curAttempt.position !== 5 || curAttempt.attempt > 5) return;

    let curWord = "";
    for (let i = 0; i < 5; i++) {
      curWord += board[curAttempt.attempt][i].toLowerCase();
    }

    if (wordSet.has(curWord.toLowerCase())) {
      setCurAttempt({ attempt: curAttempt.attempt + 1, position: 0 });
      checkGuess(curWord);
    } else {
      alert("Word Not Found!");
      return;
    }
    if (curWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    if (curAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };

  const retry = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          curAttempt,
          setCurAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
          finStates,
        }}
      >
        <div className="game">
          <div className={gameOver.gameOver ? "gameOver" : ""}>
            <Board />
          </div>
          { 
            gameOver.gameOver &&
            <div className="retry">
              <button type="button" onClick={retry}>
                RETRY?
              </button>
            </div> 
          }
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
        {/* <div className="retry"></div> */}
      </AppContext.Provider>
    </div>
  );
}

export default App;

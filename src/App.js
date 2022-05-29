import Keyboard from "./components/Keyboard";
import Board from "./components/Board";
import "./App.css";
import { boardDefault, generateWordSet } from "./Words";
import { useState, createContext, useEffect } from "react";

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
  const correctWord = "GRONK";

  useEffect(() => {
    generateWordSet().then((words) => {
      console.log(words);
      setWordSet(words.wordSet);
    });
  }, []);

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
      curWord += board[curAttempt.attempt][i];
    }

    if (wordSet.has(curWord.toLowerCase())) {
      setCurAttempt({ attempt: curAttempt.attempt + 1, position: 0 });
    } else {
      alert("Word Not Found!");
    }
    if (curWord === correctWord) {
      alert("You Guessed Correctly!");
    }
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
        }}
      >
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;

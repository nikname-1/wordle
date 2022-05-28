import Keyboard from "./components/Keyboard";
import Board from "./components/Board";
import "./App.css";
import { boardDefault } from "./Words";
import { useState, createContext } from "react";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [curAttempt, setCurAttempt] = useState({
    attempt: 0,
    position: 0,
  });

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
    setCurAttempt({ attempt: curAttempt.attempt + 1, position: 0 });
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{ board, setBoard, curAttempt, setCurAttempt, onSelectLetter, onDelete, onEnter}}
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

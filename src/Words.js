import wordBank from "./wordle-bank.txt";
import guessBank from "./wordle-bank-guess.txt";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  let wordSet = new Set();
  let todaysWord;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArray = result.split("\n");
      todaysWord = wordArray[Math.floor(Math.random() * wordArray.length)];
      wordArray.forEach(wordSet.add, wordSet);
    });
  await fetch(guessBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArray = result.split("\n");
      wordArray.forEach(wordSet.add, wordSet);
    });

  return { wordSet, todaysWord };
};

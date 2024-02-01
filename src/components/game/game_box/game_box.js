import React from 'react'
import GameTile from '../game_tile/game_tile';
import { useSelector } from 'react-redux';

function GameBox() {
  const words = useSelector(state => {
    console.log("inside gamebox useSelector");
    return state.game.words;
  });
  const word = useSelector(state => {
    console.log("inside gamebox word useSelector");
    return state.game.word;
  });
  var className = "";
  if (word.length <= 5) {
    className = "gamebox";
  } else if (word.length === 6 || word.length === 7) {
    className = "gamebox-6-7";
  } else {
    className = "gamebox-8-11";
  }

  console.log("inside gamebox");
  console.log(word, words.word1, words.word2, words.word3, words.word4, words.word5);
  return (
    <div className={className}>
      <GameTile word={words.word1} realword={word} row="1" />
      <GameTile word={words.word2} realword={word} row="2" />
      <GameTile word={words.word3} realword={word} row="3" />
      <GameTile word={words.word4} realword={word} row="4" />
      <GameTile word={words.word5} realword={word} row="5" />
    </div>
  )
}

export default GameBox

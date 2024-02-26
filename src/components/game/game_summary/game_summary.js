import React from 'react'
import { useSelector } from 'react-redux'

function GameSummary() {
  const userGame = useSelector((state) => {
    return state.auth.userGame;
  });
  const todaysWords = useSelector((state) => {
    return state.game.todaysWords;
  });
  return (
    <div>
      <main className="game">
        <h2>Today's Summary</h2>
        {console.log("today's word", todaysWords)}
        {todaysWords.map((item, index) => {
          console.log("item , index", item, index);
          return (<div key={index}>
          <strong>Clue : </strong>{item.clue} <strong>Ans : </strong> {item.word} - {userGame.GameState[index] === "W" ? <span>"You Won!"</span> : "You Lost!"}
          </div>)
        })}
        
      </main>  
    </div>
  )
}

export default GameSummary
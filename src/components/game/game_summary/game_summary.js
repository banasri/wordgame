import React from 'react'
import { useSelector } from 'react-redux'
import "./game_summary.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faBookOpenReader } from '@fortawesome/free-solid-svg-icons';


function GameSummary() {
  const userGame = useSelector((state) => {
    return state.auth.userGame;
  });
  const todaysWords = useSelector((state) => {
    return state.game.todaysWords;
  });
  return (
    <div>
      <main>
        <h2>Quick Recap</h2>
        <div className='wordContainer'>
        {console.log("today's word", todaysWords)}
        {todaysWords.map((item, index) => {
          console.log("item , index", item, index);
          return (
              <div className='wordDetail' key={index}>
              <strong>{item.word} :</strong> - {item.meaning} {userGame.GameState[index] === "W" ? <FontAwesomeIcon className='icon-fa-won' icon={faTrophy} /> : <FontAwesomeIcon className='icon-fa-lost' icon={faBookOpenReader} />}
              </div>
          )
        })}
        </div>
      </main>  
    </div>
  )
}

export default GameSummary
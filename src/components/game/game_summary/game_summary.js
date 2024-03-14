import React from 'react'
import { useSelector } from 'react-redux'
import "./game_summary.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import Stats from '../../stats/Stats';


function GameSummary() {
  const userGame = useSelector((state) => {
    return state.auth.userGame;
  });
  const todaysWords = useSelector((state) => {
    return state.game.todaysWords;
  });
  const todayScore = useSelector((state) => {
    return state.auth.todayScore;
  });

  return (
    <div>
      <main>
        <h2>Quick Recap</h2>
        <h3>Today's Score - { todayScore } <FontAwesomeIcon className='icon-fa-won' icon={faTrophy} /></h3>
        <div className='wordContainer'>
        {console.log("today's word", todaysWords)}
        {todaysWords.map((item, index) => {
          console.log("item , index", item, index);
          return (
              <div className='wordDetail' key={index}>
              <div>
              <strong>Clue : {item.clue} Answer : {item.word}</strong> {userGame.GameState[index] === "W" ? <FontAwesomeIcon className='icon-fa-won' icon={faTrophy} /> : <FontAwesomeIcon className='icon-fa-lost' icon={faBookOpenReader} />}
              </div>
              <div>
              <strong>Meaning</strong> - {item.meaning} 
              </div>
              {item.sentence ? 
                <div>
              <strong>Sentence</strong> - {item.sentence} 
              </div> : null}
              </div>
          )
        })}
        </div>
      </main>  
      <Stats /> 
    </div>
  )
}

export default GameSummary
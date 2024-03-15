import React from 'react';
import { useSelector } from 'react-redux';
import '../stats/Stats.css';

function Stats() {
const userGameStat = useSelector((state) => {
    return state.auth.userGameStat;
    });
  return (
    <>
      <h2>Statistics</h2>
      <div className='stats-container'>
      <ul className='ul-stats'>
        <li>
        <div className='listNum'>{userGameStat.GamesPlayed}</div>
        <div className='listText'>Played</div>
        </li>
        <li>
        <div className='listNum'>{Math.round((userGameStat.NumOfGamesWon * 100)/userGameStat.GamesPlayed)}</div>
        <div className='listText'>Win %</div>
        </li>
        <li>
        <div className='listNum'>{userGameStat.CurrentStreak}</div>
        <div className='listText'>Current Streak</div>
        </li>
        <li>
        <div className='listNum'>{userGameStat.MaxStreak}</div>
        <div className='listText'>Max Streak</div>
        </li>
      </ul>
    </div>
    </>
    
  )
}

export default Stats

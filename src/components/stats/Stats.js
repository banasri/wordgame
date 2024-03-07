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
        <div className='listNum' aria-hidden="true">{userGameStat.GamesPlayed}</div>
        <div className='listText' aria-hidden="true">Played</div>
        </li>
        <li>
        <div className='listNum' aria-hidden="true">{Math.round((userGameStat.NumOfGamesWon * 100)/userGameStat.GamesPlayed)}</div>
        <div className='listText' aria-hidden="true">Win %</div>
        </li>
        <li>
        <div className='listNum' aria-hidden="true">{userGameStat.CurrentStreak}</div>
        <div className='listText' aria-hidden="true">Current Streak</div>
        </li>
        <li>
        <div className='listNum' aria-hidden="true">{userGameStat.MaxStreak}</div>
        <div className='listText' aria-hidden="true">Max Streak</div>
        </li>
      </ul>
    </div>
    </>
    
  )
}

export default Stats

import React from 'react'
import NavBar from '../layout/NavBar'
import './Dashboard.css'
import Game from './game/game';

function Dashboard() {
  return (
    <div className='display-area'>
      <NavBar />
      <Game/>
    </div>
  )
}

export default Dashboard

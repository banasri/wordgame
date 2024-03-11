import React, { useEffect } from 'react';
import { useSelector, useDispatch} from "react-redux";
import NavBar from '../layout/NavBar';
import "../layout/Layout.css";
import { FetchUserScores, STATUSES} from '../../store/authSlice';

function Leaderboard() {
  const user = useSelector((state) => state.auth.user);
  const scores = useSelector((state) => state.auth.scores);
  const getAllScoreStatus = useSelector((state) => state.auth.getAllScoreStatus);
  const scoresSet = useSelector((state) => state.auth.scoresSet);
  //const getAllScoreStatus = useSelector((state) => state.auth.getAllScoreStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchUserScores());
    console.log("scores", scores);
  }, [scoresSet]);

  return (
    <>
    {user ? <NavBar /> : 
    <div className="navbar"> 
      <div className='navbar-logo'>
      <div className='image-container'>
          <img src="/image/WCLogo.png" alt="Logo" className="logoForm" />
        </div>
        <h1><span className='textWord'>Word</span>
        <span className='textCup'>Cup</span></h1>
      </div>
    </div>  
    } 
    <h2 className='lb-heading'>Today's Leaderboard</h2> 
    <table className="student-list">
    <thead>
        <tr>
            <th>Name</th>
            <th>Score</th>
            <th>School, Class</th>
        </tr>
    </thead>
    <tbody>
    {scores.map((item, index) => {
     return (<tr key={index}>
            <td>{scores[index].firstName} {scores[index].lastName}</td>
            <td>{scores[index].score}</td>
            <td>{scores[index].school}, Class - {scores[index].class}</td>
      </tr>)
    })}
    </tbody>
</table>
    </>
  )
}

export default Leaderboard

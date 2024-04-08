import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from "react-redux";
import NavBar from '../layout/NavBar';
import "../layout/Layout.css";
import { FetchUserScores} from '../../store/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { initScores } from '../../store/authSlice';

function Leaderboard() {
  const user = useSelector((state) => state.auth.user);
  const scores = useSelector((state) => state.auth.scores);
  //const getAllScoreStatus = useSelector((state) => state.auth.getAllScoreStatus);
  const scoresSet = useSelector((state) => state.auth.scoresSet);
  //const getAllScoreStatus = useSelector((state) => state.auth.getAllScoreStatus);
  const dispatch = useDispatch();
  const today = new Date().toISOString().slice(0, 10);
  const yestday = new Date();
  yestday.setDate(yestday.getDate() - 1);
  const yesterday = yestday.toISOString().slice(0, 10);
  const [lbDate, setLbDate] = useState(today); 
  function splitAndTruncateString(inputString) {
    // Split the input string based on commas or spaces
    const parts = inputString.split(/[,\s]+/);
  
    // Iterate over each part and truncate if length is greater than 10 characters
    const truncatedParts = parts.map(part =>
      part.length > 15 ? `${part.slice(0, 15)}...` : part
    );
  
    // Join the truncated parts with spaces
    const result = truncatedParts.join(' ');
  
    return result;
  }

  useEffect(() => {
    dispatch(initScores());
  }, []);
  
  useEffect(() => {
    // console.log("From useEffect lbDate", lbDate);
    // console.log("From useEffect score", scores);
    console.log("From useEffect score.length", scores.length);
    console.log("From useEffect scoresSet", scoresSet);
    dispatch(FetchUserScores(1, lbDate));
    if(scoresSet && scores.length === 0)
    {
      setLbDate(yesterday);
    }
    console.log("scores", scores);
  }, [scoresSet, lbDate]);

  return (
    <>
    {user ? <NavBar fromPage="Leaderboard"/> : 
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
    { lbDate === today ? <h2 className='lb-heading'>Today's Leaderboard</h2> :
    <h2 className='lb-heading'>Yesterday's Leaderboard</h2> }
    <table className="student-list">
    <thead>
        <tr>
            <th></th>
            <th>Name</th>
            <th>Score</th>
            <th>Institute, Division</th>
        </tr>
    </thead>
    <tbody>
    {scores.map((item, index) => {
     return (<tr key={index}>
            <td>{index + 1}</td>
            <td>{scores[index].firstName} {scores[index].lastName}
            </td>
            <td>{scores[index].score}</td>
            {scores[index].school ?  (scores[index].class ? <td>{splitAndTruncateString(scores[index].school)} , Division - {splitAndTruncateString(scores[index].class)} </td> : <td>{splitAndTruncateString(scores[index].school)}</td> )  
            : (scores[index].class ? <td>Division - {splitAndTruncateString(scores[index].class)}</td> : 
            <td>{ user && user.uid === scores[index].uid ? 
            <Link to="/updateprofile"><FontAwesomeIcon icon={faPencil} /></Link> : null}</td>
            ) }
            </tr>)
    })}
    </tbody>
</table>
    </>
  )
}

export default Leaderboard

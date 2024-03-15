import React, { useEffect } from 'react';
import { useSelector, useDispatch} from "react-redux";
import NavBar from '../layout/NavBar';
import "../layout/Layout.css";
import { FetchUserScores, STATUSES} from '../../store/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Leaderboard() {
  const user = useSelector((state) => state.auth.user);
  const scores = useSelector((state) => state.auth.scores);
  const getAllScoreStatus = useSelector((state) => state.auth.getAllScoreStatus);
  const scoresSet = useSelector((state) => state.auth.scoresSet);
  //const getAllScoreStatus = useSelector((state) => state.auth.getAllScoreStatus);
  const dispatch = useDispatch();
  
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
    dispatch(FetchUserScores());
    console.log("scores", scores);
  }, [scoresSet]);

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
    <h2 className='lb-heading'>Today's Leaderboard</h2> 
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

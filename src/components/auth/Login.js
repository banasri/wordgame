import React, { useEffect, useState } from 'react';
import './Auth.css'; // Import the CSS file
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInUser, signInWithGoogle, fetchUserProfile, fetchUserGame, fetchUserGameStat, fetchNdUpdateUserProfile, fetchNdUpdateUserGame, fetchNdUpdateUserGameStat} from '../../store/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [googleLinkClicked, setGoogleLinkClicked] = useState(false);
  const [uiError, setUiError] = useState("");
  let user = useSelector((state) => {
    return state.auth.user;
  });
  let error = useSelector((state) => {
    return state.auth.error;
  });
  let userDoc = {};
  let userGame = {};
  let userGameStat = {};
  useEffect(() => {
    setUiError("");
    if(error){
      if(error.indexOf("invalid-credential") !== -1){
        setUiError("Incorrect email or password");
      } else 
      if(error.indexOf("missing-password") !== -1){
        setUiError("Password is missing");
      } else 
      if(error.indexOf("invalid-email") !== -1){
        setUiError("Invalid email");
      } else
      if(error.indexOf("temporarily disabled") !== -1) {
        setUiError("Too many requests - Try again later");
      } else {
        setUiError("An error has happened");
      }
    }
    if (user && !error) {
      console.log("user is already logeeg in", user);
      if(googleLinkClicked){
        updtProfile();
        console.log("userGame", userGame);
          Promise.all([
            dispatch(fetchNdUpdateUserProfile(user.uid, userDoc)),
            dispatch(fetchNdUpdateUserGame(user.uid, userGame)),
            dispatch(fetchNdUpdateUserGameStat(user.uid, userGameStat))
          ]) 
          .then(() => {
            if(!error) {
              dispatch({type:'SET_LOGIN', payload : true});
              navigate("/wordcup");
            }
          })
          .catch((error) =>{
            console.log("Error from fetch/update data");
          })
      } else {
        Promise.all([
          dispatch(fetchUserProfile(user.uid)),
          dispatch(fetchUserGame(user.uid)),
          dispatch(fetchUserGameStat(user.uid))
        ]) 
        .then(() => {
          if(!error) {
            dispatch({type:'SET_LOGIN', payload : true});
            navigate("/wordcup");
          }
        })
        .catch((error) =>{
          console.log("Error from fetch/update data");
        })
      }
    }
  },[user, error]);
  
  const [formData, setFormData] = useState({
    // Initialize form fields
    email: '',
    password: '' 
  });
  function handleChange(e) {
    setUiError("");
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
    //console.log(e);
  }

  function handleSubmit(e) {
    console.log("In submit");
    console.log(e);
    setUiError("");
    e.preventDefault();
    if(!googleLinkClicked){
      signIn();
    }
  }
  function handleKeyPress(event) {
    console.log("from keypress!")
    setUiError("");
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      signIn(event);
    }
  };
  function  updtProfile() {
    console.log("From updateProfile function!!!!");
    console.log('user', user);
    console.log('error', error);
    const nameParts = user.username.trim().split(' ');
    const firstName = nameParts.shift(); 
    const lastName = nameParts.join(' ');
    userDoc = {
              username : user.username,
              firstname : firstName,
              lastname : lastName,
              email : user.email
            };
    
    console.log("userDoc", userDoc);
    console.log("user.uid", user.uid);
    const lastPlayedDate = new Date().toISOString().slice(0, 10);
    const currentDate = new Date();

    // Subtract one day (in milliseconds)
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
    const previousDate = new Date(currentDate - oneDayInMilliseconds);

    // Format the date to YYYY-MM-DD
    const previousDateString = previousDate.toISOString().slice(0, 10);
    userGame = {
      LastPlayedDate : lastPlayedDate,
      WordIndex : 0,
      Current : 1,
      Word1Guess : {},
      Word2Guess : {},
      Word3Guess : {},
      GameState : []  
    };
    userGameStat = {
      GamesPlayed : 0,
      NumOfGamesWon : 0,
      CurrentStreakDate : previousDateString,
      CurrentStreak : 0,
      MaxStreak : 0,
      GuessDistribution : {}  
    }
  }
  function signIn() {
    // console.log("event from signIn ", e);
    // e.preventDefault();
    setUiError("");
    dispatch(signInUser(formData.email, formData.password)).then((res) => {
      console.log("after dispatch inside then SignIn");
    });
  
    console.log("after dispatch  SignIn");
  }
  function signInGoogle(e) {
    setUiError("");
    console.log("event from signInGoogle ", e);
    setGoogleLinkClicked(true);
    dispatch(signInWithGoogle()).then((res) =>{
      console.log("after dispatch inside then signInWithGoogle");
    });
  
    console.log("after dispatch  signInGoogle");
  }

  return (
    <div className='form-container' onKeyDown={handleKeyPress}>
    <form className="login-form" onSubmit={handleSubmit}>
      <div className='image-container'>
        <img src="/image/WCLogo.png" alt="Logo" className="logoForm" />
      </div>
      <h3>Log In</h3>
      {uiError && <div className='error-container'>{uiError}</div>}
      <button onClick={signInGoogle} className="google-button">
        <div className="google-logo-box">
        <img src="/image/googleIcon.png" alt="Google Logo" className="google-logo" />
        </div>
          Continue with Google
      </button>
      <div className="horizontal-bar">
        <div className="bar"></div>
        <span className="or-text">or</span>
        <div className="bar"></div>
      </div>
      <label htmlFor='email'>Email Address:</label>
      <input type="email" id="email" required={true} value={formData.email} onChange={handleChange} />
      <br />
      <label htmlFor='password'>Password:</label>
      <input type="password" id="password" required={true} value={formData.password} onChange={handleChange} />
      <br />
      <button type="submit" className='form-button'>Log In</button>
    </form>
    </div>
  );
};

export default Login;

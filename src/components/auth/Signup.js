import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css'; // Import the CSS file
import { registerUser, signInWithGoogle, fetchNdUpdateUserProfile, fetchNdUpdateUserGame, fetchNdUpdateUserGameStat} from '../../store/authSlice';

const Signup = () => {
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
    console.log(error)
    if(error){
      if(error.indexOf("weak-password") !== -1){
        setUiError("Password should be at least 6 characters");
      } else
      if(error.indexOf("missing-password") !== -1){
        setUiError("Password is missing");
      } else  
      if(error.indexOf("invalid-email") !== -1){
        setUiError("Invalid email");
      } else 
      if(error.indexOf("email-already-in-use") !== -1){
        setUiError("Email is already registed");
      } else {
        setUiError("An error has happened");
      }
    }
    if (user && !error) {
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
          navigate("/game");
        }
      })
      .catch((error) =>{
        console.log("Error from fetch/update data");
      })
      //navigate("/game");
    }
  },[user, error, dispatch, navigate]);
  

  const [formData, setFormData] = useState({
    // Initialize form fields
    email: '',
    password: '',
    firstName: '',
    lastName : ''
  });
  function handleSubmit(e) {
    console.log("In submit");
    console.log(e);
    setUiError("");
    e.preventDefault();
    if(!googleLinkClicked){
      signUp();
    }
  }
  
  function handleChange(e) {
    setUiError("");
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
    //console.log(e);
  }
  function handleKeyPress(event) {
    console.log("from keypress!");
    setUiError("");
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      signUp();
    }
  };
  function  updtProfile() {
    console.log("From updateProfile function!!!!");
    console.log('user', user);
    console.log('error', error);
    userDoc = {
      username : formData.firstName + " " + formData.lastName,
      firstName : formData.firstName,
      lastName : formData.lastName,
      email : formData.email
    };
    if(googleLinkClicked) {
      const nameParts = user.displayName.trim().split(' ');
      const firstName = nameParts.shift(); 
      const lastName = nameParts.join(' ');
      userDoc = {
                username : user.displayName,
                firstName : firstName,
                lastName : lastName,
                email : user.email
              };
    }
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
  function signUp() {
    //console.log(e);
    setUiError("");
    console.log(formData);
    dispatch(registerUser(formData.email, formData.password)).then(() => {
      //dispatch(fetchNdUpdateUserProfile(user.uid, userDoc)).then(() => {
        console.log("after dispatch inside then signUp");
        console.log('user', user);
        //navigate("/game");
      //});
    });

  }

  function signInGoogle() {
    setUiError("");
    setGoogleLinkClicked(true);
    dispatch(signInWithGoogle()).then((res) =>{
      console.log("after dispatch inside then signInWithGoogle");
      //updtProfile();
      // navigate("/game");
    });
  
    console.log("after dispatch  signInGoogle");
  }
  

  return (
    <div className='form-container' onKeyDown={handleKeyPress}>
    {/* <form className="login-form" onKeyDown={handleKeyPress}> */}
    <form className="login-form" onSubmit={handleSubmit}>
      <div className='image-container'>
        <img src="/image/WCLogo.png" alt="Logo" className="logoForm" />
      </div>
      <h3>Sign Up</h3>
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
      <label htmlFor='firstName'>First Name:</label>
      <input type="text" id="firstName" required={true} value={formData.firstName} onChange={handleChange} />
      <br />
      <label htmlFor='lastName'>Last Name:</label>
      <input type="text" id="lastName" required={true} value={formData.lastName} onChange={handleChange} />
      <br />
      <label htmlFor='email'>Email Address:</label>
      <input type="email" id="email" required={true} value={formData.email} onChange={handleChange} />
      <br />
      <label htmlFor='password'>Password:</label>
      <input type="password" id="password" required={true} value={formData.password} onChange={handleChange} />
      <br />
      <button type="submit" className='form-button'>Sign Up</button>
      <div className='smallFont'>
      Already have an account? <Link to="/login">Log In</Link>
    </div>
    </form>
    </div>
  );
};

export default Signup;

import React, { useEffect, useState } from 'react';
import './Auth.css'; // Import the CSS file
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';
import { signInUser, signInWithGoogle, fetchUserProfile, updateProfile} from '../../store/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [googleLinkClicked, setGoogleLinkClicked] = useState(false);
  let user = useSelector((state) => {
    return state.auth.user;
  });
  let userProfileExists = useSelector((state) => {
    return state.auth.userProfileExists;
  });
  let error = useSelector((state) => {
    return state.auth.error;
  });
  useEffect(() => {
    if (user && !error) {
      if(googleLinkClicked){
        updtProfile();
      }
      //navigate("/wordcup");
    }
  },[user, error]);
  
  const [formData, setFormData] = useState({
    // Initialize form fields
    email: '',
    password: '' 
  });
  function handleChange(e) {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
    //console.log(e);
  }

  function handleSubmit(e) {
    console.log("In submit");
    console.log(e);
    e.preventDefault();
    if(!googleLinkClicked){
      signIn();
    }
  }
  function handleKeyPress(event) {
    console.log("from keypress!")
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      signIn(event);
    }
  };
  function  updtProfile() {
    console.log("From updateProfile function!!!!");
    console.log('user', user);
    console.log('error', error);
    if(!error) {
      dispatch(fetchUserProfile(user.uid)).then(() => {
        console.log("From updateProfile after fetch");
        if(!error) {
          
          const nameParts = user.username.trim().split(' ');
          const firstName = nameParts.shift(); 
          const lastName = nameParts.join(' ');
          const userDoc = {
                    username : user.username,
                    firstName : firstName,
                    lastName : lastName,
                    email : user.email
                  };
          
          console.log("userDoc", userDoc);
          console.log("userProfileExists", userProfileExists);
          console.log("user.uid", user.uid);
          dispatch(updateProfile(userDoc, userProfileExists, user.uid)).then(() =>{
            if(!error) { 
              navigate("/wordcup");
            }
          });
        }
      })
    }
  }
  function signIn() {
    // console.log("event from signIn ", e);
    // e.preventDefault();
    dispatch(signInUser(formData.email, formData.password)).then((res) => {
      console.log("after dispatch inside then SignIn");
    });
  
    console.log("after dispatch  SignIn");
  }
  function signInGoogle(e) {
    console.log("event from signInGoogle ", e);
    setGoogleLinkClicked(true);
    dispatch(signInWithGoogle()).then((res) =>{
      console.log("after dispatch inside then signInWithGoogle");
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
      <h3>Log In</h3>
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
      <input type="email" id="email" value={formData.email} onChange={handleChange} />
      <br />
      <label htmlFor='password'>Password:</label>
      <input type="password" id="password" value={formData.password} onChange={handleChange} />
      <br />
      <button type="submit" className='form-button' onClick={signIn}>Log In</button>
    </form>
    </div>
  );
};

export default Login;

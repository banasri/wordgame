import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the CSS file
import { registerUser, signInWithGoogle, fetchNdUpdateUserProfile} from '../../store/authSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [googleLinkClicked, setGoogleLinkClicked] = useState(false);
  let user = useSelector((state) => {
    return state.auth.user;
  });
  let error = useSelector((state) => {
    return state.auth.error;
  });
  useEffect(() => {
    if (user && !error) {
      updtProfile();
      //navigate("/wordcup");
    }
  },[user, error]);
  

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
    e.preventDefault();
    if(!googleLinkClicked){
      signUp();
    }
  }
  function handleChange(e) {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
    //console.log(e);
  }
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      signUp();
    }
  };
  function  updtProfile() {
    console.log("From updateProfile function!!!!");
    console.log('user', user);
    console.log('error', error);
    let userDoc = {
      username : formData.firstName + " " + formData.lastName,
      firstName : formData.firstName,
      lastName : formData.lastName,
      email : formData.email
    };
    if(googleLinkClicked) {
      const nameParts = user.username.trim().split(' ');
      const firstName = nameParts.shift(); 
      const lastName = nameParts.join(' ');
      userDoc = {
                username : user.username,
                firstName : firstName,
                lastName : lastName,
                email : user.email
              };
    }
    console.log("userDoc", userDoc);
    console.log("user.uid", user.uid);
    if(!error) {
      dispatch(fetchNdUpdateUserProfile(user.uid, userDoc)).then(() => {
        console.log("From updateProfile after fetch and update");
        // if the userProfile info changed, then call update. Else skip update
        if(!error) {
          navigate("/wordcup");
        }
      })
    }
  }
  function signUp() {
    //console.log(e);
    console.log(formData);
    dispatch(registerUser(formData.email, formData.password)).then(() => {
      console.log("after dispatch inside then signUp");
      console.log('user', user);
      // navigate("/wordcup");
    });

  }

  function signInGoogle() {
    setGoogleLinkClicked(true);
    dispatch(signInWithGoogle()).then((res) =>{
      console.log("after dispatch inside then signInWithGoogle");
      //updtProfile();
      // navigate("/wordcup");
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
      <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />
      <br />
      <label htmlFor='lastName'>Last Name:</label>
      <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />
      <br />
      <label htmlFor='email'>Email Address:</label>
      <input type="email" id="email" value={formData.email} onChange={handleChange} />
      <br />
      <label htmlFor='password'>Password:</label>
      <input type="password" id="password" value={formData.password} onChange={handleChange} />
      <br />
      <button type="submit" className='form-button' onClick={signUp}>Sign Up</button>
    </form>
    </div>
  );
};

export default Signup;

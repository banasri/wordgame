import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the CSS file
import { registerUser, signInWithGoogle} from '../../store/authSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.auth.user;
  });
  useEffect(() => {
    if (user) {
      navigate("/wordcup");
    }
  },[user, navigate]);
  

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
    signUp();
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
  function signUp() {
    //console.log(e);
    console.log(formData);
    dispatch(registerUser(formData.email, formData.password)).then(() => {
      console.log("after dispatch inside then signUp");
      // navigate("/wordcup");
    });

  }

  function signInGoogle() {
    dispatch(signInWithGoogle()).then((res) =>{
      console.log("after dispatch inside then signInWithGoogle");
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

import React, { useState } from 'react';
import './Auth.css'; // Import the CSS file

const Signup = () => {
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleFnameChange = (e) => {
    setFname(e.target.value);
  };
  const handleLnameChange = (e) => {
    setLname(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic using email and password
    console.log('Login with:', email, password);
  };
  const signInGoogle = () => {

  }

  return (
    <div className='form-container'>
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
      <label>First Name:</label>
      <input type="text" value={Fname} onChange={handleFnameChange} />
      <br />
      <label>Last Name:</label>
      <input type="text" value={Lname} onChange={handleLnameChange} />
      <br />
      <label>Email Address:</label>
      <input type="email" value={email} onChange={handleEmailChange} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <br />
      <button type="submit" className='form-button'>Sign Up</button>
    </form>
    </div>
  );
};

export default Signup;

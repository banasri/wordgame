import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updtPassword } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import {  signout} from '../../store/authSlice';


function ChangePassword() {
    let user = useSelector((state) => {
        return state.auth.user;
      });
      let error = useSelector((state) => {
        return state.auth.error;
      });
      const [uiError, setUiError ] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        // Initialize form fields
        email: '',
        password: '',
        passwordConfirm: '',
      });
      useEffect(() => {
        setFormData((prevData) => ({...prevData, ...user}));
    }, [user]);
      function handleChange(e) {
        setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
        //console.log(e);
      }
    
      function handleSubmit(e) {
        console.log("In submit");
        console.log(e);
        e.preventDefault();
        setUiError("");
        console.log("user", user);
        if(formData.password !== formData.passwordConfirm) {
            return setUiError("Passwords do not match");
        } 
        dispatch(updtPassword(user, formData.password)).then(() => {
          if(!error) {
            dispatch(signout());
            navigate('/login');
          }
        })
        .catch((error) =>{
          console.log("Error from fetch/update data");
          setUiError(error);
        })
      }
  return (
    <div className='form-container'>
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className='image-container'>
        <img src="/image/WCLogo.png" alt="Logo" className="logoForm" />
      </div>
      <h3>Change Password</h3>
      {uiError && <div className='error-container'>{uiError}</div>}
      <label htmlFor='email'>Email Address</label>
      <input type="email" id="email" value={formData.email} disabled={true} />
      <br />
      <label htmlFor='password'>New Password</label>
      <input type="password" id="password" value={formData.password} onChange={handleChange} />
      <br />
      <label htmlFor='passwordConfirm'>Password Confirmation</label>
      <input type="password" id="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} />
      <br />
      <button type="submit" className='form-button'>Update</button>
    </form>
    </div>
  )
}

export default ChangePassword

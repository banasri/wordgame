import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../store/authSlice';


function ForgotPassword() {
    let error = useSelector((state) => {
        return state.auth.error;
    });
    
    const [uiError, setUiError ] = useState("");
    const [uiMsg, setUiMsg ] = useState("");
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        // Initialize form fields
        email: '',
    });

    function handleChange(e) {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
    //console.log(e);
    }

    function handleSubmit(e) {
        console.log("In submit");
        console.log(e);
        e.preventDefault();
        setUiError("");
        if(formData.email === "") {
            setUiMsg("Email id is required");
        } else {
            dispatch(resetPassword(formData.email)).then(() => {
                if(!error) {
                    setUiMsg("Check your inbox for further instructions");
                }
            })
            .catch((error) =>{
                console.log("Error from reset password", error);
                setUiError(error);
            })
        }
        
    }
  return (
    <div className='form-container'>
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className='image-container'>
        <img src="/image/WCLogo.png" alt="Logo" className="logoForm" />
      </div>
      <h3>Password Reset</h3>
      {uiError && <div className='error-container'>{uiError}</div>}
      {uiMsg && <div className='message-container'>{uiMsg}</div>}
      <label htmlFor='email'>Email Address</label>
      <input type="email" id="email" value={formData.email} required={true} onChange={handleChange}/>
      <br />
      <button type="submit" className='form-button'>Reset Password</button>
      <div className='smallFont'>
      <Link to="/login">Log In</Link>
      </div>
    </form>
    </div>
  )
}

export default ForgotPassword

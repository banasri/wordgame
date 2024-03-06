import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  fetchNdUpdateUserProfile} from '../../store/authSlice';

function UpdateProfile() {
    const userProfile = useSelector((state) => {
        return state.auth.userProfile;
    })
    const user = useSelector((state) => {
        return state.auth.user;
    });
    let error = useSelector((state) => {
      return state.auth.error;
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        // Initialize form fields
        email: '',
        firstName: '',
        lastName : '',
        school : '',
        class : '',
        phone : ''
      });
    useEffect(() => {
        setFormData(userProfile);
    }, [userProfile]);

    function handleSubmit(e) {
        console.log("In submit");
        console.log(e);
        e.preventDefault();
        console.log("After submit, user, formData", user, formData);
        dispatch(fetchNdUpdateUserProfile(user.uid, formData, true)) 
          .then(() => {
            if(!error) {
              navigate("/wordcup");
            }
          })
          .catch((error) =>{
            console.log("Error from fetch/update data");
          })
    }
  function handleChange(e) {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
    //console.log(e);
    }
  return (
    <div className='form-container'>
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className='image-container'>
        <img src="/image/WCLogo.png" alt="Logo" className="logoForm" />
      </div>
      <h3>Update Profile</h3>
      <label htmlFor='firstName'>First Name:</label>
      <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />
      <br />
      <label htmlFor='lastName'>Last Name:</label>
      <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />
      <br />
      <label htmlFor='school'>School Name and Address:</label>
      <input type="text" id="school" value={formData.school} onChange={handleChange} />
      <br />
      <label htmlFor='class'>Class:</label>
      <input type="text" id="class" value={formData.class} onChange={handleChange} />
      <br />
      <label htmlFor='phone'>Phone Number:</label>
      <input type="text" id="phone" value={formData.phone} onChange={handleChange} />
      <br />
      
      <button type="submit" className='form-button'>Update</button>
    </form>
    </div>
  )
}

export default UpdateProfile

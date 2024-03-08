import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  fetchNdUpdateUserProfile} from '../../store/authSlice';
import Dropdown from './Dropdown';

function UpdateProfile() {
  let states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"
    ];
    //const [selectedOption, setSelectedOption] = useState(null);
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
        phone : '',
        state : '',
      });
    useEffect(() => {
        setFormData(userProfile);
    }, [userProfile]);
    // const handleSelect = (option) => {
    //   setSelectedOption(option);
    //   formData.state = selectedOption;
    //   // Do whatever you want with the selected option
    //   console.log('Selected option:', option);
    // };
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
    //console.log(e);
    if(e.target){
      setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
    } else {
      setFormData((prevData) => ({ ...prevData, state: e }));
    }
    //console.log(e);
    }
  return (
    <div className='form-container'>
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className='image-container'>
        <img src="/image/WCLogo.png" alt="Logo" className="logoForm" />
      </div>
      <h3>Update Profile</h3>
      <div className='inlineContainer'>
        <div>
          <label htmlFor='firstName'>First Name:</label>
          <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />
          <br />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name:</label>
          <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />
          <br />
        </div>
      </div>
      
      <label htmlFor='school'>School Name and Address:</label>
      <input type="text" id="school" value={formData.school} onChange={handleChange} />
      <br />
      <label htmlFor='state'>Select your state:</label>
      <Dropdown id="state" options={states} onSelect={handleChange} initialValue={formData.state}/>
      <div className='inlineContainer'>
        <div>
          <label htmlFor='class'>Class:</label>
          <input type="text" id="class" value={formData.class} onChange={handleChange} />
          <br />
        </div>
        <div>
          <label htmlFor='phone'>Phone Number:</label>
          <input type="text" id="phone" value={formData.phone} onChange={handleChange} />
          <br />
        </div>
      </div>
      
      
      <button type="submit" className='form-button'>Update</button>
    </form>
    </div>
  )
}

export default UpdateProfile

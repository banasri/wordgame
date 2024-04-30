import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchNdUpdateUserProfile } from '../../store/authSlice';
import Dropdown from './Dropdown';

function UpdateProfile() {
  const countryList = [
    "Afghanistan",
    "Åland Islands",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan (Province of China)",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
    "United States of America (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ];
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
  const [showState, setShowState] = useState(true);
  const [formData, setFormData] = useState({
    // Initialize form fields
    email: '',
    firstName: '',
    lastName: '',
    school: '',
    class: '',
    phone: '',
    country: '',
    state: '',
  });
  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, ...userProfile }));
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
        if (!error) {
          navigate("/game");
        }
      })
      .catch((error) => {
        console.log("Error from fetch/update data");
      })
  }
  function handleChange(e) {
    //console.log(e);
    if (e.target) {
      setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
    } else {
      setFormData((prevData) => ({ ...prevData, state: e }));
    }
    //console.log(e);
  }
  function handleChangeCountry(e) {
    console.log(e);
    setFormData((prevData) => ({ ...prevData, country: e }));
    if (e !== "India") {
      setShowState(false);
    } else {
      setShowState(true);
    }
    console.log("formData", formData);
  }
  return (
    <div className='form-container'>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className='image-container'>
          <img src="/image/WCLogo.png" alt="Logo" className="logoForm" />
        </div>
        <h3>Update Profile</h3>
        <label htmlFor='email'>Email</label>
        <input type="text" id="email" value={formData.email} disabled={true} />
        <br />
        <div className='inlineContainer'>
          <div>
            <label htmlFor='firstName'>First Name</label>
            <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />
            <br />
          </div>
          <div>
            <label htmlFor='lastName'>Last Name</label>
            <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />
            <br />
          </div>
        </div>

        <label htmlFor='school'>Institute Name and Address</label>
        <input type="text" id="school" value={formData.school} onChange={handleChange} placeholder='School/College/Organisation' />
        <br />
        <div className='inlineContainer'>
          <div>
            <label htmlFor='class'>Division</label>
            <input type="text" id="class" value={formData.class} onChange={handleChange} placeholder='Class/Year/Department' />
            <br />
          </div>
          <div>
            <label htmlFor='phone'>Phone Number</label>
            <input type="text" id="phone" value={formData.phone} onChange={handleChange} />
            <br />
          </div>
        </div>
        <label htmlFor='state'>Select your Country</label>
        <Dropdown id="state" options={countryList} onSelect={handleChangeCountry} initialValue={"India"} />
        <br />
        {showState ? <><label htmlFor='state'>Select your state</label>
          <Dropdown id="state" options={states} onSelect={handleChange} initialValue={formData.state} />
          <br /></> : null}
        <button type="submit" className='form-button'>Update</button>
      </form>
    </div>
  )
}

export default UpdateProfile

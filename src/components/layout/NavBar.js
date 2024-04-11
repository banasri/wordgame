import React, { useState } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCog, faRankingStar, faQuestionCircle, faHome } from '@fortawesome/free-solid-svg-icons';
import "./Layout.css";
import { signout } from '../../store/authSlice';

const NavBar = ({fromPage}) => {
   console.log("fromPage - ", fromPage);
   const userProfile = useSelector((state) => state.auth.userProfile);
   console.log(userProfile);
   const getInitials = (userProfile) => {
    const firstInitial = userProfile && userProfile.firstName ? userProfile.firstName.charAt(0).toUpperCase() : '';
    const lastInitial = userProfile && userProfile.lastName ? userProfile.lastName.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
  };
  const dispatch = useDispatch();
  const [profileClick, setProfileClick] = useState(false);
  function handleClickQues() {
    dispatch({type:'SET_QUEST_MODAL'});
  }
  function handleClickProf() {
    setProfileClick(!profileClick);
  }
  function handleLogout() {
    dispatch(signout());
  }
  return (
    <>
    <div className="navbar"> 
      <div className='navbar-icons' onClick={handleClickProf}>
      <a className="btn-profile">{getInitials(userProfile)}</a>
      </div>
      <div className='navbar-logo'>
      <div className='image-container'>
          <img src="/image/WCLogo.png" alt="Logo" className="logoForm" />
        </div>
        <h1><span className='textWord'>Word</span>
        <span className='textCup'>Cup</span></h1>
      </div>
        
            {/* <SignedInLinks />             
            <SignedOutLinks /> */}
            {(fromPage && fromPage === "Leaderboard") ?  
            <div className='navbar-icons'>
              <Link to="/game"><FontAwesomeIcon className='icon-fa' icon={faHome} /></Link>
            </div>     
            :
            <div className='navbar-icons'>
              <FontAwesomeIcon className='icon-fa' onClick={handleClickQues} icon={faQuestionCircle} />
              <Link to="/leaderboard"><FontAwesomeIcon className='icon-fa' icon={faRankingStar} /></Link>
              {/* <FontAwesomeIcon className='icon-fa' icon={faCog} /> */}
            </div>
            }
        
    </div>  
      {profileClick ? <div className='profileModal'>
      <FontAwesomeIcon className='icon-x' icon={faXmark} onClick={handleClickProf} />
      <Link to="/updateprofile" >
              Profile
            </Link>
        <a href="/changePassword">Change Password</a>
        <a href="/" onClick={handleLogout}>Logout</a>
        </div> : null}
    </>
    
    
     
  )
}

export default NavBar

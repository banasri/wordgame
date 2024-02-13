import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { useDispatch} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faSheetPlastic, faQuestionCircle, faBars, faChartSimple } from '@fortawesome/free-solid-svg-icons';


const NavBar = () => {
//   const user = useSelector((state) => state.auth.user);
//   console.log(user);
  const dispatch = useDispatch();
  function handleClickQues() {
    dispatch({type:'SET_QUEST_MODAL'});
  }
  return (
    <div className="navbar"> 
      <div className='navbar-icons'>
          <FontAwesomeIcon className='icon-fa' icon={faBars} />
      </div>
      <div className='navbar-logo'>
      <div className='image-container'>
          <img src="/image/WCLogo.png" alt="Logo" className="logoForm" />
        </div>
        <h1><span className='textWord'>Word </span>
        <span className='textCup'>Cup</span></h1>
      </div>
        
            {/* <SignedInLinks />             
            <SignedOutLinks /> */}
        <div className='navbar-icons'>
          <FontAwesomeIcon className='icon-fa' onClick={handleClickQues} icon={faQuestionCircle} />
          <FontAwesomeIcon className='icon-fa' icon={faChartSimple} />
          <FontAwesomeIcon className='icon-fa' icon={faCog} />
        </div>
    </div>   
  )
}

export default NavBar

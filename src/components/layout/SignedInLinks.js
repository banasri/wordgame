import React from 'react';
//import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { signout } from "../../store/reducers/authSlice";

const SignedInLinks = () => {
  //const dispatch = useDispatch();

  function handleClick(e) {
    //dispatch(signout());
  }
  return (
    <ul className="right">
        <li><NavLink to='/' onClick={handleClick}>Log Out</NavLink></li>
        <li><NavLink to='/' className="btn btn-floating torquoise darken-3">BG</NavLink></li>

    </ul> 
  )
}

export default SignedInLinks

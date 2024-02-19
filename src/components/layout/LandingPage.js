import React, { useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function LandingPage() {
  const user = useSelector((state) => {
    return state.auth.user;
  });
  const error = useSelector((state) => {
    return state.auth.error;
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (user && !error) {
      navigate("/wordcup");
    }
  }, [user, error, navigate]);
  return (
    <div className="landing-page">
      <div className="logo-container">
        {/* Your circular logo goes here */}
        <img src="/image/WCLogo.png" alt="Logo" className="logo" />
      </div>
      <div className="text-container">
        <p className="text">Play <span className='textWord'>Word</span>
        <span className='textCup'>Cup</span> Everyday!</p>
      </div>
      <div className="button-container">
      <Link to="/login"><button className="rounded-btn login-btn">Login</button></Link>
      <Link to="/signup"> <button className="rounded-btn signup-btn">Signup</button></Link>
      <Link to="/"><button className="rounded-btn faqs-btn">How to play</button></Link>
      </div>
    </div>
  );
}

export default LandingPage

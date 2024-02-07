import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import LandingPage from './components/layout/LandingPage';
import Dashboard from './components/game/Dashboard';
import { auth } from './firebase';
import { STATUSES } from './store/authSlice';
import { loginUser, setStatus, logoutUser } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("From App useEffect!")
      console.log(authUser);
      if (authUser) {
        console.log(authUser);
        dispatch(
          loginUser({
            uid: authUser.uid,
            username: authUser.displayName,
            email: authUser.email,
          })
        );
        dispatch(setStatus(STATUSES.IDLE));
      } else {
        dispatch(logoutUser());
        dispatch(setStatus(STATUSES.IDLE));
        console.log("User is not logged in.");
      }
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/wordcup" element={<Dashboard />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

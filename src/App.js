import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import LandingPage from './components/layout/LandingPage';
import Dashboard from './components/game/Dashboard';
import { auth } from './firebase';
import { STATUSES } from './store/authSlice';
import { loginUser, setStatus, logoutUser, fetchUserGame, fetchUserProfile, fetchUserGameStat } from "./store/authSlice";
import PrivateRoute from './components/game/PrivateRoute';
import UpdateProfile from './components/auth/UpdateProfile';
import Leaderboard from './components/game/Leaderboard';
import ChangePassword from './components/auth/ChangePassword';
import ForgotPassword from './components/auth/ForgotPassword';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("From App useEffect!")
      console.log(authUser);
      if (authUser) {
        console.log(authUser);
        Promise.all([
          dispatch(fetchUserGame(authUser.uid)),
          dispatch(fetchUserProfile(authUser.uid)),
          dispatch(fetchUserGameStat(authUser.uid))
        ])
        .then(() => {
          dispatch(
            loginUser(authUser)
            // loginUser({
            //   uid: authUser.uid,
            //   username: authUser.displayName,
            //   email: authUser.email,
            // })
          );
          dispatch(setStatus(STATUSES.IDLE));
          dispatch({type:'SET_LOGIN', payload : true});
        })
        .catch((error) =>{
          console.log("Error from fetch/update data");
        });
      } else {
        dispatch(logoutUser());
        dispatch(setStatus(STATUSES.IDLE));
        dispatch({type:'SET_LOGIN', payload : false});
        console.log("User is not logged in.");
      }
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route path="/leaderboard" element={<Leaderboard />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/changePassword" element={<ChangePassword />}></Route>
          <Route path="/resetPassword" element={<ForgotPassword />}></Route>
          <Route path="/wordcup" element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }></Route>
          <Route path="/updateprofile" element={
                    <PrivateRoute>
                      <UpdateProfile />
                    </PrivateRoute>
                    }></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

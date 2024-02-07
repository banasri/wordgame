import { auth, googleProvider } from "../firebase"
//import { getDocs, collection } from "firebase/firestore";
import { createSlice } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup} from "firebase/auth";
//import { updateEmail, updatePassword, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail} from "firebase/auth";

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user : null,
        status: STATUSES.IDLE,
        isSignedIn : false,
        error : null,
    },
    reducers: {
          loginUser: (state, action) => {
            console.log("in authSlice reducers: loginUser");
            state.user = action.payload;
            state.isSignedIn = true;
          },
          logoutUser: (state) => {
            console.log("in authSlice reducers: logoutUser");
            state.user = null;
            state.isSignedIn = false;
          },
          setStatus : (state, action) => {
            state.status = action.payload;
          },
    },
});

export const { loginUser, logoutUser, setStatus } = authSlice.actions;
export default authSlice.reducer;

// Thunks

export function signInUser(email, password) {
    return async function signInUserThunk(dispatch) {
        //dispatch(authSlice.actions.setStatus(STATUSES.LOADING));
        try {
            const res = await signInWithEmailAndPassword(
                auth, 
                email, 
                password
            );
            console.log("res : ", res);
            
            dispatch(
                loginUser({
                  uid: res.uid,
                  username: res.displayName,
                  email: res.email,
                })
              );
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

export function registerUser(email, password) {
  return async function registerUserThunk(dispatch) {
      //dispatch(authSlice.actions.setStatus(STATUSES.LOADING));
      try {
          const res = await createUserWithEmailAndPassword(
              auth, 
              email, 
              password
          );
          console.log("res : ", res);
          
          dispatch(
              loginUser({
                uid: res.uid,
                username: res.displayName,
                email: res.email,
              })
            );
          dispatch(setStatus(STATUSES.IDLE));
      } catch (err) {
          console.log(err);
          dispatch(setStatus(STATUSES.ERROR));
      }
  };
}

export function signInWithGoogle() {
  return async function signInWithGoogleThunk(dispatch) {
      dispatch(authSlice.actions.setStatus(STATUSES.LOADING));
      try {
          //const res = await signInWithRedirect(auth, googleProvider);
          const res = await signInWithPopup(auth, googleProvider);
          console.log("res : ", res);
          
          dispatch(
              loginUser({
                uid: res.uid,
                username: res.displayName,
                email: res.email,
              })
            );
          dispatch(setStatus(STATUSES.IDLE));
      } catch (err) {
          console.log(err);
          dispatch(setStatus(STATUSES.ERROR));
      }
  };
}

export function signout() {
  return async function signoutThunk(dispatch) {
      //dispatch(authSlice.actions.setStatus(STATUSES.LOADING));
      try {
          const res = await signOut(auth);
          console.log("res : ", res);
          
          dispatch(logoutUser());
          dispatch(setStatus(STATUSES.IDLE));
      } catch (err) {
          console.log(err);
          dispatch(setStatus(STATUSES.ERROR));
      }
  };
}



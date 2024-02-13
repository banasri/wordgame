import { auth, googleProvider, db } from "../firebase"
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
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
        username : null,
        email : null,
        userProfile : null,
        status: STATUSES.IDLE,
        profileStatus: STATUSES.IDLE,
        gameStatus: STATUSES.IDLE,
        isSignedIn : false,
        error : null,
        userProfileExists : true,
        userGameExists : false,
    },
    reducers: {
          loginUser: (state, action) => {
            console.log("in authSlice reducers: loginUser");
            console.log(action.payload);
            state.user = action.payload;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.isSignedIn = true;
          },
          logoutUser: (state) => {
            console.log("in authSlice reducers: logoutUser");
            state.user = null;
            state.username = null;
            state.email = null;
            state.isSignedIn = false;
          },
          setStatus : (state, action) => {
            state.status = action.payload;
          },
          setProfileStatus : (state, action) => {
            state.profileStatus = action.payload;
          },
          setGameStatus : (state, action) => {
            state.gameStatus = action.payload;
          },
          setUserProfileExists : (state, action) => {
            state.userProfileExists = action.payload;
          },
          setError : (state, action) => {
            state.error = action.payload;
          },
    },
});

export const { loginUser, logoutUser, setStatus, 
  setProfileStatus, setGameStatus, setUserProfileExists,
   setError } = authSlice.actions;
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
      console.log("inside register thunk");
      try {
          const res = await createUserWithEmailAndPassword(
              auth, 
              email, 
              password
          );
          console.log("res : ", res);
          dispatch(
              loginUser(res.user)
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
                uid: res.user.uid,
                username: res.user.displayName,
                email: res.user.email,
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

export function updateProfile(profile, userProfileExists, uid) {
  return async function updateProfileThunk(dispatch) {

  console.log("name, phone, school", profile);
  console.log("currentUser.uid", uid);

  const docData = {
    ...profile
    };
    try {
      if (userProfileExists) 
      {
        await updateDoc(doc(db, "userProfile", uid), docData);
      } else {
        await setDoc(doc(db, "userProfile", uid), docData);
      }
    } catch(error) {
      console.error("Error updating document:", error);
      dispatch(setProfileStatus(STATUSES.ERROR));
    }

}
}
  export function fetchUserProfile(uid) {
    return async function fetchUserProfileThunk(dispatch) {
        console.log("From Reducer - fetchUserProfile");
        dispatch(setProfileStatus(STATUSES.LOADING));
        try {
            console.log("From Reducer - fetchUserProfile... try");
            const docRef = doc(db, "userProfile", uid);
            const docSnap = await getDoc(docRef);
            console.log("docSnap After ... ");

            if (docSnap.exists()) {
                // dispatch to set the userProfile info.
                console.log("docSnap exists");
                const data = docSnap.data();
                console.log("docSnap exists - after doc.data()");
                console.log("docSnap", data);
                dispatch(setUserProfileExists(true));
              } else {
                console.log('No such document!');
                dispatch(setUserProfileExists(false));
              }
              dispatch(setProfileStatus(STATUSES.IDLE));
        } catch (error) {
            console.error("Error fetching document:", error);
            dispatch(setError("Error fetching userProfile document"));
            dispatch(setProfileStatus(STATUSES.ERROR));
        }
    };
}

export function fetchNdUpdateUserProfile(uid, profile) {
  return async function fetchNdUpdateUserProfileThunk(dispatch) {
      console.log("From Reducer - fetchNdUpdateUserProfile");
      dispatch(setProfileStatus(STATUSES.LOADING));
      try {
          console.log("From Reducer - fetchNdUpdateUserProfile... try");
          const docRef = doc(db, "userProfile", uid);
          const docSnap = await getDoc(docRef);
          //console.log("docSnap After ... ");
          const docData = {
            ...profile
          };
          if (docSnap.exists()) {
              // dispatch to set the userProfile info.
              console.log("docSnap exists");
              const data = docSnap.data();
              console.log("docSnap exists - after doc.data()");
              console.log("docSnap", data);
              console.log("docSnap", docData);
              // if(data.username !== docData.username ||
              //    data.firstname !== docData.firstname ||
              //    data.lastname !== docData.lastname ||
              //    data.email !== data.email) {
              //     try{
              //       await updateDoc(doc(db, "userProfile", uid), docData);
              //     } catch(e) {
              //       console.log(e);
              //       dispatch(setError("Error updating userProfile document: " + e));
              //       dispatch(setProfileStatus(STATUSES.ERROR));
              //     }
              //    }
              
              dispatch(setUserProfileExists(true));
            } else {
              try{
                await setDoc(doc(db, "userProfile", uid), docData);
              } catch(e) {
                console.log(e);
                dispatch(setError("Error updating userProfile document: " + e));
                dispatch(setProfileStatus(STATUSES.ERROR));
              }
              console.log('No such document!');
              dispatch(setUserProfileExists(false));
            }
            dispatch(setProfileStatus(STATUSES.IDLE));
      } catch (error) {
          console.error("Error fetching document:", error);
          dispatch(setError("Error fetching userProfile document: " + error));
          dispatch(setProfileStatus(STATUSES.ERROR));
      }
  };
}



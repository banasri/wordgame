import { auth, googleProvider, db } from "../firebase"
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { createSlice } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup} from "firebase/auth";
//import { updateEmail, updatePassword, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail} from "firebase/auth";
import { Timestamp } from "firebase/firestore";
export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user : null,
        //username is got only when user signs in using google
        username : null,
        email : null,
        formData : null,
        userProfile : null,
        status: STATUSES.IDLE,
        profileStatus: STATUSES.IDLE,
        gameStatus: STATUSES.IDLE,
        gameStatsStatus: STATUSES.IDLE,
        isSignedIn : false,
        error : null,
        userProfileExists : true,
        userGameExists : false,
        userGame : {},
        userGameStat : {}
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
          setUserProfile: (state, action) => {
            state.userProfile = action.payload;
          },
          setUserGame: (state, action) => {
            state.userGame = action.payload;
          },
          setUserGameStat: (state, action) => {
            state.userGameStat = action.payload;
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
          setGameStatStatus : (state, action) => {
            state.gameStatsStatus = action.payload;
          },
          setUserProfileExists : (state, action) => {
            state.userProfileExists = action.payload;
          },
          setError : (state, action) => {
            state.error = action.payload;
          },
    },
});

export const { loginUser, logoutUser, setUserProfile, setUserGame, setUserGameStat, setStatus, 
  setProfileStatus, setGameStatus, setGameStatStatus, setUserProfileExists,
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
                  uid: res.user.uid,
                  username: res.user.displayName,
                  email: res.user.email,
                })
              );
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setError("Error Signing in: " + err));
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
          dispatch(setError("Error Registering: " + err));
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
          dispatch(setError("Error Google Signin: " + err));
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
          dispatch(setError("Error Signing out: " + err));
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
      dispatch(setUserProfile(docData));
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
                dispatch(setUserProfile(data));
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
              dispatch(setUserProfileExists(true));
              dispatch(setUserProfile(data));
            } else {
              try{
                await setDoc(doc(db, "userProfile", uid), docData);
                dispatch(setUserProfile(docData));
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

export function fetchNdUpdateUserGame(uid, game) {
  return async function fetchNdUpdateUserGameThunk(dispatch) {
      console.log("From Reducer - fetchNdUpdateUserGame");
      dispatch(setGameStatus(STATUSES.LOADING));
      try {
          console.log("From Reducer - fetchNdUpdateUserGame... try");
          const docRef = doc(db, "userGame", uid);
          const docSnap = await getDoc(docRef);
          const docData = {
            ...game
          };
          console.log("docSnap", docData);
          if (docSnap.exists()) {
              // dispatch to set the userProfile info.
              console.log("docSnap exists");
              const data = docSnap.data();
              console.log("data", data);
              console.log("docSnap", docData);
              dispatch(setUserGame(data));
            } else {
              console.log("docSnap does not exist");
              try{
                await setDoc(doc(db, "userGame", uid), docData);
                dispatch(setUserGame(docData));
              } catch(e) {
                console.log(e);
                dispatch(setError("Error updating userGame document: " + e));
                dispatch(setGameStatus(STATUSES.ERROR));
              }
            }
            dispatch(setGameStatus(STATUSES.IDLE));
      } catch (error) {
          console.error("Error fetching document:", error);
          dispatch(setError("Error fetching userGame document: " + error));
          dispatch(setGameStatus(STATUSES.ERROR));
      }
  };
}

export function fetchUserGame(uid) {
  return async function fetchUserGameThunk(dispatch) {
      console.log("From Reducer - fetchUserGame");
      dispatch(setGameStatus(STATUSES.LOADING));
      try {
          console.log("From Reducer - fetchUserGame... try");
          const docRef = doc(db, "userGame", uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
              console.log("docSnap exists");
              const data = docSnap.data();
              console.log("data", data);
              dispatch(setUserGame(data));
            } else {
              const docData =  {
                LastPlayedDate : Timestamp.fromDate(new Date()),
                CurrentGameNum : 0,
                Word1Guess : ["", "", "", "", ""],
                Word2Guess : ["", "", "", "", ""],
                Word3Guess : ["", "", "", "", ""],
                GameState : ["", "", ""]  
              };
              try{
                await setDoc(doc(db, "userGame", uid), docData);
                dispatch(setUserGame(docData));
              } catch(e) {
                console.log(e);
                dispatch(setError("Error updating userGame document: " + e));
                dispatch(setGameStatus(STATUSES.ERROR));
              }
            }
            dispatch(setGameStatus(STATUSES.IDLE));
      } catch (error) {
          console.error("Error fetching document:", error);
          dispatch(setError("Error fetching userGame document: " + error));
          dispatch(setGameStatus(STATUSES.ERROR));
      }
  };
}

export function UpdateUserGame(uid, game, dataFromDB, dataExists) {
  return async function UpdateUserGameThunk(dispatch) {
      console.log("From Reducer - UpdateUserGame");
      dispatch(setGameStatus(STATUSES.LOADING));
      const docData = {
        ...game
      };
      if (dataExists) {
          // dispatch to set the userProfile info.
          console.log("docSnap exists");
          const data = dataFromDB;
          console.log("data", data);
          console.log("docSnap", docData);
          try{
            await updateDoc(doc(db, "userGame", uid), docData);
            dispatch(setUserGame(docData));
          } catch(e) {
            console.log(e);
            dispatch(setError("Error updating userGame document: " + e));
            dispatch(setGameStatus(STATUSES.ERROR));
          }
        } else {
          try{
            await setDoc(doc(db, "userGame", uid), docData);
            dispatch(setUserGame(docData));
          } catch(e) {
            console.log(e);
            dispatch(setError("Error updating userGame document: " + e));
            dispatch(setGameStatus(STATUSES.ERROR));
          }
          console.log('No such document!');
        }
        dispatch(setGameStatus(STATUSES.IDLE));
  };
}

export function fetchNdUpdateUserGameStat(uid, gameStat) {
  return async function fetchNdUpdateUserGameStatThunk(dispatch) {
      console.log("From Reducer - fetchNdUpdateUserStatGame");
      dispatch(setGameStatStatus(STATUSES.LOADING));
      try {
          console.log("From Reducer - fetchNdUpdateUserStatGame... try");
          const docRef = doc(db, "userGameStat", uid);
          const docSnap = await getDoc(docRef);
          const docData = {
            ...gameStat
          };
          console.log("docSnap", docData);
          if (docSnap.exists()) {
              // dispatch to set the userProfile info.
              console.log("docSnap exists");
              const data = docSnap.data();
              console.log("data", data);
              console.log("docSnap", docData);
              dispatch(setUserGameStat(data));
            } else {
              console.log("docSnap does not exist");
              try{
                await setDoc(doc(db, "userGameStat", uid), docData);
                dispatch(setUserGameStat(docData));
              } catch(e) {
                console.log(e);
                dispatch(setError("Error updating userGameStat document: " + e));
                dispatch(setGameStatStatus(STATUSES.ERROR));
              }
            }
            dispatch(setGameStatStatus(STATUSES.IDLE));
      } catch (error) {
          console.error("Error fetching document:", error);
          dispatch(setError("Error fetching userGameStat document: " + error));
          dispatch(setGameStatStatus(STATUSES.ERROR));
      }
  };
}

export function fetchUserGameStat(uid) {
  return async function fetchUserGameStatThunk(dispatch) {
      console.log("From Reducer - fetchUserGameStat");
      dispatch(setGameStatStatus(STATUSES.LOADING));
      try {
          console.log("From Reducer - fetchUserGameStat... try");
          const docRef = doc(db, "userGameStat", uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
              console.log("docSnap exists");
              const data = docSnap.data();
              console.log("data", data);
              dispatch(setUserGameStat(data));
            } else {
              const docData = {
                GamesPlayed : 0,
                NumOfGamesWon : 0,
                CurrentStreak : 0,
                MaxStreak : 0,
                GuessDistribution : [0, 0, 0, 0, 0]  
              };
              try{
                await setDoc(doc(db, "userGameStat", uid), docData);
                dispatch(setUserGameStat(docData));
              } catch(e) {
                console.log(e);
                dispatch(setError("Error updating userGameStat document: " + e));
                dispatch(setGameStatStatus(STATUSES.ERROR));
              }
            }
            dispatch(setGameStatStatus(STATUSES.IDLE));
      } catch (error) {
          console.error("Error fetching document:", error);
          dispatch(setError("Error fetching userGame document: " + error));
          dispatch(setGameStatStatus(STATUSES.ERROR));
      }
  };
}

export function UpdateUserGameStat(uid, game, dataFromDB, dataExists) {
  return async function UpdateUserGameStatThunk(dispatch) {
      console.log("From Reducer - UpdateUserGameStat");
      dispatch(setGameStatStatus(STATUSES.LOADING));
      const docData = {
        ...game
      };
      if (dataExists) {
          // dispatch to set the userProfile info.
          console.log("docSnap exists");
          const data = dataFromDB;
          console.log("data", data);
          console.log("docSnap", docData);
          try{
            await updateDoc(doc(db, "userGameStat", uid), docData);
            dispatch(setUserGameStat(docData));
          } catch(e) {
            console.log(e);
            dispatch(setError("Error updating userProfile document: " + e));
            dispatch(setGameStatStatus(STATUSES.ERROR));
          }
        } else {
          try{
            await setDoc(doc(db, "userGameStat", uid), docData);
            dispatch(setUserGameStat(docData));
          } catch(e) {
            console.log(e);
            dispatch(setError("Error updating userProfile document: " + e));
            dispatch(setGameStatStatus(STATUSES.ERROR));
          }
          console.log('No such document!');
        }
        dispatch(setGameStatStatus(STATUSES.IDLE));
  };
}

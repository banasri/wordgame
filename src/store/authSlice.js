import { auth, googleProvider, db } from "../firebase"
import { doc, getDoc, updateDoc, setDoc, query, where, collection, addDoc, getDocs, serverTimestamp, orderBy } from "firebase/firestore";
import { createSlice } from '@reduxjs/toolkit';
import { sendPasswordResetEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup, updatePassword } from "firebase/auth";
import dummyScores from "../../src/dumScore.json";
export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    //username is got only when user signs in using google
    username: null,
    email: null,
    userProfile: null,
    status: STATUSES.IDLE,
    changePasswordStatus: STATUSES.IDLE,
    profileStatus: STATUSES.IDLE,
    gameStatus: STATUSES.IDLE,
    gameStatsStatus: STATUSES.IDLE,
    scoreStatus: STATUSES.IDLE,
    getAllScoreStatus: STATUSES.IDLE,
    isSignedIn: false,
    todayScore: 0,
    error: null,
    userProfileExists: true,
    userGame: {},
    userGameStat: {},
    scores: [],
    scoresSet: false
  },
  reducers: {
    loginUser: (state, action) => {
      console.log("in authSlice reducers: loginUser");
      console.log(action.payload);
      state.user = action.payload;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isSignedIn = true;
      state.error = null;
    },
    logoutUser: (state) => {
      console.log("in authSlice reducers: logoutUser");
      state.user = null;
      state.userProfile = null;
      state.userGame = {};
      state.username = null;
      state.email = null;
      state.userGameStat = {};
      state.userProfileExists = true;
      state.isSignedIn = false;
      state.error = null;
    },
    setScores: (state, action) => {
      console.log("in authSlice reducers: setScores");
      console.log(action);
      state.scores = action.payload;
      state.scoresSet = true;
    },
    initScores: (state) => {
      console.log("in authSlice reducers: setScores");
      state.scores = [];
      state.scoresSet = false;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setUserGame: (state, action) => {
      state.userGame = action.payload;
      console.log("state.userGame", state.userGame);
      console.log("state.userGame.length", state.userGame.length);
      let todayScore = 0;
      for (let i = 0; i < 3; i++) {
        if (state.userGame.GameState[i] && state.userGame.GameState[i] === "W") {
          console.log(todayScore);
          todayScore++;
          console.log(todayScore);
        }
      }
      state.todayScore = todayScore;
    },
    setChangePasswordStatus: (state, action) => {
      state.changePasswordStatus = action.payload;
    },
    setUserGameStat: (state, action) => {
      state.userGameStat = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setProfileStatus: (state, action) => {
      state.profileStatus = action.payload;
    },
    setGameStatus: (state, action) => {
      state.gameStatus = action.payload;
    },
    setGameStatStatus: (state, action) => {
      state.gameStatsStatus = action.payload;
    },
    setScoreStatus: (state, action) => {
      state.scoreStatus = action.payload;
    },
    setGetAllScoreStatus: (state, action) => {
      state.getAllScoreStatus = action.payload;
    },
    setUserProfileExists: (state, action) => {
      state.userProfileExists = action.payload;
    },
    setError: (state, action) => {
      console.log('state', state);
      console.log('action', action);
      state.error = action.payload;
    },

  },
});

export const { loginUser, logoutUser, setScores, initScores, setUserProfile, setUserGame, setUserGameStat, setStatus,
  setChangePasswordStatus, setProfileStatus, setGameStatus, setScoreStatus, setGetAllScoreStatus, setGameStatStatus, setUserProfileExists,
  setError } = authSlice.actions;
export default authSlice.reducer;

// Thunks

export function signInUser(email, password) {
  return async function signInUserThunk(dispatch) {
    //dispatch(authSlice.actions.setStatus(STATUSES.LOADING));
    dispatch(setError(""));
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("res : ", res);

      dispatch(
        loginUser(res.user)
        // loginUser({
        //   uid: res.user.uid,
        //   username: res.user.displayName,
        //   email: res.user.email,
        // })
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
    dispatch(setError(""));
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
export function updtPassword(user, password) {
  return async function updtPasswordThunk(dispatch) {
    //dispatch(authSlice.actions.setStatus(STATUSES.LOADING));
    console.log("inside updtPassword thunk");
    dispatch(setChangePasswordStatus(STATUSES.LOADING));
    dispatch(setError(""));
    try {
      const res = await updatePassword(
        user,
        password
      );
      console.log("res : ", res);
      dispatch(setChangePasswordStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setError("Error Registering: " + err));
      dispatch(setChangePasswordStatus(STATUSES.ERROR));
    }
  };
}

export function signInWithGoogle() {
  return async function signInWithGoogleThunk(dispatch) {
    dispatch(authSlice.actions.setStatus(STATUSES.LOADING));
    dispatch(setError(""));
    try {
      //const res = await signInWithRedirect(auth, googleProvider);
      const res = await signInWithPopup(auth, googleProvider);
      console.log("res : ", res);

      dispatch(
        loginUser(res.user)
        // loginUser({
        //   uid: res.user.uid,
        //   username: res.user.displayName,
        //   email: res.user.email,
        // })
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
    dispatch(setError(""));
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
export function resetPassword(email) {
  return async function resetPasswordThunk(dispatch) {
    //dispatch(authSlice.actions.setStatus(STATUSES.LOADING));
    dispatch(setError(""));
    try {
      const res = await sendPasswordResetEmail(auth, email);
      console.log("res : ", res);
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setError("Error sending reset password email: " + err));
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function updateProfile(profile, userProfileExists, uid) {
  return async function updateProfileThunk(dispatch) {

    console.log("name, phone, school", profile);
    console.log("currentUser.uid", uid);
    dispatch(setError(""));
    const docData = {
      ...profile
    };
    try {
      if (userProfileExists) {
        await updateDoc(doc(db, "userProfile", uid), docData);
      } else {
        await setDoc(doc(db, "userProfile", uid), docData);
      }
      dispatch(setUserProfile(docData));
    } catch (error) {
      console.error("Error updating document:", error);
      dispatch(setError("Error updating document: " + error));
      dispatch(setProfileStatus(STATUSES.ERROR));
    }
  }
}
export function fetchUserProfile(uid) {
  return async function fetchUserProfileThunk(dispatch) {
    console.log("From Reducer - fetchUserProfile");
    dispatch(setProfileStatus(STATUSES.LOADING));
    dispatch(setError(""));
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
      dispatch(setError("Error fetching userProfile document - " + error));
      dispatch(setProfileStatus(STATUSES.ERROR));
    }
  };
}

export function fetchNdUpdateUserProfile(uid, profile, update = false) {
  return async function fetchNdUpdateUserProfileThunk(dispatch) {
    console.log("From Reducer - fetchNdUpdateUserProfile");
    dispatch(setProfileStatus(STATUSES.LOADING));
    dispatch(setError(""));
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
        if (update) {
          await updateDoc(docRef, docData);
          dispatch(setUserProfile(docData));
        } else {
          dispatch(setUserProfile(data));
        }
      } else {
        try {
          await setDoc(doc(db, "userProfile", uid), docData);
          dispatch(setUserProfile(docData));
        } catch (e) {
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
    dispatch(setError(""));
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
        try {
          await setDoc(doc(db, "userGame", uid), docData);
          dispatch(setUserGame(docData));
        } catch (e) {
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
    dispatch(setError(""));
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
        const lastPlayedDate = new Date().toISOString().slice(0, 10);
        const docData = {
          LastPlayedDate: lastPlayedDate,
          WordIndex: 0,
          Current: 1,
          Word1Guess: {},
          Word2Guess: {},
          Word3Guess: {},
          GameState: []
        };
        try {
          await setDoc(doc(db, "userGame", uid), docData);
          dispatch(setUserGame(docData));
        } catch (e) {
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

export function UpdateUserGame(uid, gameData) {
  return async function UpdateUserGameThunk(dispatch) {
    console.log("From Reducer - UpdateUserGame");
    dispatch(setGameStatus(STATUSES.LOADING));
    dispatch(setError(""));
    const docData = {
      ...gameData
    };

    console.log("docData", docData);
    try {
      await updateDoc(doc(db, "userGame", uid), docData);
      dispatch(setUserGame(docData));
    } catch (e) {
      console.log(e);
      dispatch(setError("Error updating userGame document: " + e));
      dispatch(setGameStatus(STATUSES.ERROR));
    }
    dispatch(setGameStatus(STATUSES.IDLE));
  };
}

export function fetchNdUpdateUserGameStat(uid, gameStat) {
  return async function fetchNdUpdateUserGameStatThunk(dispatch) {
    console.log("From Reducer - fetchNdUpdateUserStatGame");
    dispatch(setGameStatStatus(STATUSES.LOADING));
    dispatch(setError(""));
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
        try {
          await setDoc(doc(db, "userGameStat", uid), docData);
          dispatch(setUserGameStat(docData));
        } catch (e) {
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
    dispatch(setError(""));
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
        //const lastPlayedDate = new Date().toISOString().slice(0, 10);
        const currentDate = new Date();

        // Subtract one day (in milliseconds)
        const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
        const previousDate = new Date(currentDate - oneDayInMilliseconds);

        // Format the date to YYYY-MM-DD
        const previousDateString = previousDate.toISOString().slice(0, 10);

        const docData = {
          GamesPlayed: 0,
          NumOfGamesWon: 0,
          CurrentStreakDate: previousDateString,
          CurrentStreak: 0,
          MaxStreak: 0,
          GuessDistribution: {}
        };
        try {
          await setDoc(doc(db, "userGameStat", uid), docData);
          dispatch(setUserGameStat(docData));
        } catch (e) {
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
    dispatch(setError(""));
    const docData = {
      ...game
    };
    if (dataExists) {
      // dispatch to set the userProfile info.
      console.log("docSnap exists");
      const data = dataFromDB;
      console.log("data", data);
      console.log("docSnap", docData);
      try {
        await updateDoc(doc(db, "userGameStat", uid), docData);
        dispatch(setUserGameStat(docData));
      } catch (e) {
        console.log(e);
        dispatch(setError("Error updating userProfile document: " + e));
        dispatch(setGameStatStatus(STATUSES.ERROR));
      }
    } else {
      try {
        await setDoc(doc(db, "userGameStat", uid), docData);
        dispatch(setUserGameStat(docData));
      } catch (e) {
        console.log(e);
        dispatch(setError("Error updating userProfile document: " + e));
        dispatch(setGameStatStatus(STATUSES.ERROR));
      }
      console.log('No such document!');
    }
    dispatch(setGameStatStatus(STATUSES.IDLE));
  };
}

export function UpdateUserScore(uid, isTest) {
  return async function UpdateUserScoreThunk(dispatch) {
    console.log("From Reducer - UpdateUserScore");
    console.log("From Reducer - UpdateUserScore isTest :", isTest);
    if (isTest) return;
    dispatch(setScoreStatus(STATUSES.LOADING));
    dispatch(setError(""));
    // Get today's date 
    const today = new Date().toISOString().slice(0, 10);
    let docData = {
      date: today,
      uid: uid,
      score: 1,
    };
    // Query Firestore for scores based on UID and date

    try {
      const scoreRef = collection(db, "score");
      const q = query(scoreRef, where("uid", "==", uid), where("date", "==", today));
      const docSnap = await getDocs(q);
      console.log("docSnap", docSnap);
      console.log("docSnap count", docSnap.size);
      let firstId = "";
      let scoreDB = 0;
      if (docSnap.size) {
        docSnap.forEach((doc) => {
          if (firstId === "") {
            firstId = doc.id;
            scoreDB = doc.data().score;
          }
          console.log(doc.id, ' => ', doc.data());
        });
        //console.log("docSnap exists docSnap.data()", docSnap.data());
        docData = {
          ...docData,
          score: scoreDB + 1,
        }
        await updateDoc(doc(db, "score", firstId), docData);
      } else {
        console.log("docSnap does not exists");
        const docRef = await addDoc(collection(db, "score"), docData);
        firstId = docRef.id;
      }
      const docRef = doc(db, "score", firstId);
      await updateDoc(docRef, {
        timestamp: serverTimestamp()
      });
    }
    catch (e) {
      console.log(e);
      dispatch(setError("Error updating score document: " + e));
      dispatch(setScoreStatus(STATUSES.ERROR));
    }
    dispatch(setScoreStatus(STATUSES.IDLE));
  };
}
function dateCalc() {

  let dateString = process.env.REACT_APP_LIVE_DT;
  const [year, month, day] = dateString.split('-').map(Number);
  let today = new Date();
  let liveDate = new Date(year, month - 1, day);

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = today - liveDate;

  // Convert the difference to days
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  const dateFactor = Math.floor(differenceInDays);
  return dateFactor;
}
export function FetchUserScores(minScore = 1, today) {
  return async function FetchUserScoresThunk(dispatch) {
    console.log("From Reducer - FetchUserScores");
    console.log("today !!!!", today);
    dispatch(setGetAllScoreStatus(STATUSES.LOADING));
    dispatch(setError(""));
    const dateFactor = dateCalc();
    // Get today's date 
    // const today = new Date().toISOString().slice(0, 10);
    const scores = [];
    // Query Firestore for scores based on UID and date
    const constScores = dummyScores[0].scores;
    console.log(constScores);
    console.log(constScores.length);
    const ind = dateFactor % constScores.length;
    for (let i = 0; i < constScores[ind].length; i++) {
      scores.push(constScores[ind][i]);
    }
    console.log(scores);
    console.log(scores.length);
    const index = scores.length;
    try {
      const scoreRef = collection(db, "score");
      const q = query(scoreRef, where("score", ">=", minScore), where("date", "==", today), orderBy("score", "desc"), orderBy("timestamp", "asc"));
      console.log("Before docSnap");
      const docSnap = await getDocs(q);
      console.log("After docSnap");
      console.log("docSnap", docSnap);
      console.log("docSnap count", docSnap.size);
      if (docSnap.size) {
        docSnap.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          scores.push(doc.data());
        });
      } else {
        console.log("docSnap does not exists");
      }
    }
    catch (e) {
      console.log(e);
      dispatch(setError("Error fetching scores: " + e));
      dispatch(setGetAllScoreStatus(STATUSES.ERROR));
    }
    console.log("index", index);
    try {
      for (let i = index; i < scores.length; i++) {
        const docRef = doc(db, "userProfile", scores[i].uid);
        const docSnap = await getDoc(docRef);
        const profileData = docSnap.data();
        scores[i] = { ...scores[i], ...profileData };
        console.log("scores[i]", scores[i]);
      }
      dispatch(setScores(scores));
    } catch (e) {
      console.log(e);
      dispatch(setError("Error fetching profile for scores: " + e));
    }

    dispatch(setGetAllScoreStatus(STATUSES.IDLE));
  };
}

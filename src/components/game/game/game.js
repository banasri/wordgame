import Instructions from "../instructions/instructions";
import React, { useState, useEffect } from "react";
import "./game.css";
import GameBox from "../game_box/game_box";
import Keyboard from "../keyboard/keyboard";
import Clue from "../clue/clue";
import { useSelector, useDispatch } from "react-redux";
import GameOver from "../gameover/game_over";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, getCountFromServer } from "firebase/firestore";
import { UpdateUserGame, UpdateUserGameStat} from '../../../store/authSlice';
const Game = (props) => {
  const userProfileExists = useSelector((state) => {
    return state.auth.userProfileExists;
  });
  const user = useSelector((state) => {
    return state.auth.user;
  });
  const userGame = useSelector((state) => {
    return state.auth.userGame;
  });
  const userGameStat = useSelector((state) => {
    return state.auth.userGameStat;
  });
  const userProfile = useSelector((state) => {
    return state.auth.userProfile;
  });
  const showHowToPlay = useSelector((state) => {
    return state.game.showHowToPlay;
  });
  const [showModal, setShowModal] = useState(!userProfileExists);
  const [showWord, setShowWord] = useState(true);
  //const [howToPlay, setHowToPlay] = useState(showHowToPlay);

  const pass = useSelector((state)=>{
    return state.game.pass;
   });
  const isGameOver = useSelector((state)=>{
    return state.game.isGameOver;
   });
  const gameOver = useSelector((state)=>{
    return state.game.gameOver;
   });
  const alert = useSelector((state)=>{
    return state.game.alert;
   });
  
   const word = useSelector((state)=>{
    return state.game.word;
   });
   const current = useSelector((state)=>{
    return state.game.current;
   });
   const words = useSelector((state)=>{
    return state.game.words;
   });
   const wordIndex = useSelector((state)=>{
    return state.game.wordIndex;
   });
  //initialise the hook
  const dispatch = useDispatch();
  
  const onChangeAlert = () => {
    dispatch({ type: "CLEAR_ALERT" })
  };

  useEffect(() => {
      console.log("game.js in tryAgain");
      setShowWord(true);
  }, []);
  
  useEffect(() => {
    //update database if current or wordIndex changes
    const lastPlayedDate = new Date().toISOString().slice(0, 10);
    let newUserGame =  {};
    if (userGame.LastPlayedDate === lastPlayedDate) {
      newUserGame = {
        ...userGame,
        WordIndex : wordIndex,
        Current : current,
        LastPlayedDate : lastPlayedDate
      }
    } else {
      newUserGame = {
        LastPlayedDate : lastPlayedDate,
        WordIndex : wordIndex,
        Current : current,
        Word1Guess : {},
        Word2Guess : {},
        Word3Guess : {},
        GameState : []  
      }
    }
    let wordInd = wordIndex+1;
    const key = "Word" + wordInd + "Guess";
    let win = userGameStat.NumOfGamesWon;
    if(isGameOver){
      if(pass) {
        win++;
        console.log("if pass , newUserGame.GameState",newUserGame.GameState);
        newUserGame.GameState = [...newUserGame.GameState, "W"];
      } else {
        console.log("if not pass , newUserGame.GameState",newUserGame.GameState);
        newUserGame.GameState = [...newUserGame.GameState, "L"];
      }  
    }

    newUserGame = {
      ...newUserGame,
      [key] : words,
    };
    console.log("newUserGame :", newUserGame)
    dispatch(UpdateUserGame(user.uid, newUserGame)).then(() => {
        console.log("data updated successfully!");
        if(isGameOver) {
          let newUserGameStat = {
            ...userGameStat,
            GamesPlayed : userGameStat.GamesPlayed + 1,
            NumOfGamesWon : win,
            CurrentStreak : 0,
            MaxStreak : 0,
            GuessDistribution : [0, 0, 0, 0, 0]  
          }
          dispatch(UpdateUserGameStat(user.uid, newUserGameStat)).then(() => {
            dispatch({ type: "UPDATE_GAMEOVER" })
          })
          .catch((error) =>{
            console.log("Error from fetch/update data");
          });
        }
    })
    .catch((error) =>{
      console.log("Error from fetch/update data");
    })

  }, [current, wordIndex]);
  

  useEffect(() => {
    console.log("11111111111111111111111");
    console.log("userProfileExists ", userProfileExists );
    console.log("userProfile ", userProfile );
    console.log("userGame ", userGame );
    console.log("userGameStat ", userGameStat );
    //console.log("howToPlay ", howToPlay );
    if(showHowToPlay) {
      setShowModal(true);
    }
    //setShowHowToPlay(howToPlay);
    const todayWords = [];
    let dateString = process.env.REACT_APP_LIVE_DT;
    const [year, month, day] = dateString.split('-').map(Number);
    let today = new Date();
    let liveDate = new Date(year, month - 1, day);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = today - liveDate;

    // Convert the difference to days
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    const dateFactor = Math.floor(differenceInDays) + 1;
    console.log("dateFactor===>", dateFactor);
    let startId = dateFactor * 3 - 2;
    let endId = dateFactor * 3;
    
   
    
    
    const fetchData = async () => {
      //get count of wordlist from server
      let count = 0;
      
      const coll = collection(db, "wordList");
      try {
        const snapshot = await getCountFromServer(coll);
        console.log('count: ', snapshot.data().count);
        count = snapshot.data().count;
      } catch(err) {
        console.log("error getting count");
      }
      console.log("1.Step getCount ==========>", count);
      console.log("2.Convert count to a nearest multiple of 3 ==========>");
      const countMulti3 = (Math.ceil(count/3))*3;
      console.log("countMulti3",countMulti3);
      if(endId > count) {
        console.log("endId > count", endId, count);
        const rem = (dateFactor*3) % countMulti3;
        startId = rem + 1;
        endId = rem + 3;
      }
      console.log("3.Convert startId and endId ==========>", startId, endId );
      try {
        const q = query(collection(db, "wordList"), where("id", ">=", startId), 
                                                    where("id", "<=", endId));
        const querySnapshot = await getDocs(q);
        console.log("querySnapshot", querySnapshot);
        querySnapshot.forEach((doc) => {
          todayWords.push(doc.data());          
        });
        
        dispatch({ type: "SET_WORDS", words: todayWords});
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch, showHowToPlay]);

  if (alert) {
    setTimeout(() => {
      onChangeAlert();
    }, 1000);
  }

  if (gameOver) {
    setTimeout(() => {
      setShowWord(false);
    }, 1000);
    //update database.
  }
  
    // Promise.all([
    //   //dispatch(fetchNdUpdateUserProfile(user.uid, userDoc)),
    //   dispatch(UpdateUserGame(user.uid, newUserGame)),
    //   //dispatch(fetchNdUpdateUserGameStat(user.uid, userGameStat))
    // ]) 
    // .then(() => {
    //   console.log("data updated successfully!")

    // })
    // .catch((error) =>{
    //   console.log("Error from fetch/update data");
    // })
  

  return (
    <main
      className="game"
      onClick={() => {
        console.log("Clicked!");
        setShowModal(false);
        console.log(showHowToPlay);
        // if(showHowToPlay) {
        //   setHowToPlay(false);
        // }
        //setShowHowToPlay(false);
      }}
    >
      <Clue row="1"/>
      {alert ? <p className="alert">Not a valid word</p> : null}
      <GameBox />
      <Keyboard />
      {/* {showModal && !userProfileExists ? <Instructions /> : null} */}
      {/* {showModal || showHowToPlay ? <Instructions /> : null} */}
      {showModal ? <Instructions /> : null}
      {gameOver ? <GameOver pass={pass} /> : null}
      {gameOver & showWord &!pass ? <p className="alert">{word}</p> : null}
    </main>
  );
};

export default Game;

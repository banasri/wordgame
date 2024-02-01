import Instructions from "../instructions/instructions";
import React, { useState, useEffect } from "react";
import "./game.css";
import GameBox from "../game_box/game_box";
import Keyboard from "../keyboard/keyboard";
import Clue from "../clue/clue";
import { useSelector, useDispatch } from "react-redux";
import GameOver from "../gameover/game_over";
import { db } from "../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Game = (props) => {
  const [showModal, setShowModal] = useState(true);
  const [showWord, setShowWord] = useState(true);

  const pass = useSelector((state)=>{
    return state.game.pass;
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
  //initialise the hook
  const dispatch = useDispatch();
  
  const onChangeAlert = () => {
    dispatch({ type: "CLEAR_ALERT" })
  };

  useEffect(() => {
      console.log("game.js in tryAgain");
      setShowWord(true);
    //}
  }, []);
  

  useEffect(() => {
    console.log("11111111111111111111111");
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
    const startId = dateFactor * 3 - 2;
    const endId = dateFactor * 3;
    
    const fetchData = async () => {
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
  }, [dispatch]);

  if (alert) {
    setTimeout(() => {
      onChangeAlert();
    }, 1000);
  }

  if (gameOver) {
    setTimeout(() => {
      setShowWord(false);
    }, 1000);
  }

  return (
    <main
      className="game"
      onClick={() => {
        setShowModal(false);
      }}
    >
      <Clue row="1"/>
      {alert ? <p className="alert">Not a valid word</p> : null}
      <GameBox />
      <Keyboard />
      {showModal ? <Instructions /> : null}
      {gameOver ? <GameOver pass={pass} /> : null}
      {gameOver & showWord &!pass ? <p className="alert">{word}</p> : null}
    </main>
  );
};

export default Game;

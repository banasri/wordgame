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
import { UpdateUserGame, UpdateUserGameStat, UpdateUserScore } from '../../../store/authSlice';
import GameSummary from "../game_summary/game_summary";
import ConfettiExplosion from "react-confetti-explosion";

const Game = (props) => {
  const lastPlayedDate = new Date().toISOString().slice(0, 10);
  const [isExploding, setIsExploding] = useState(false);
  const bigExplodeProps = {
    force: 0.6,
    duration: 4000,
    particleCount: 200,
    floorHeight: 1600,
    floorWidth: 1600
  };

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
  const showSummaryFromStore = useSelector((state) => {
    return state.game.showSummary;
  });
  const clue = useSelector((state) => {
    return state.game.clue;
  });
  const [showModal, setShowModal] = useState(!userProfileExists);
  const [showWord, setShowWord] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [showSummary, setShowSummary] = useState(showSummaryFromStore);
  //const [howToPlay, setHowToPlay] = useState(showHowToPlay);

  const pass = useSelector((state) => {
    return state.game.pass;
  });
  const isGameOver = useSelector((state) => {
    return state.game.isGameOver;
  });
  const gameOver = useSelector((state) => {
    return state.game.gameOver;
  });
  const alert = useSelector((state) => {
    return state.game.alert;
  });
  const alertMsg = useSelector((state) => {
    return state.game.alertMsg;
  });

  const word = useSelector((state) => {
    return state.game.word;
  });
  const current = useSelector((state) => {
    return state.game.current;
  });
  const words = useSelector((state) => {
    return state.game.words;
  });
  const wordIndex = useSelector((state) => {
    return state.game.wordIndex;
  });
  //initialise the hook
  const dispatch = useDispatch();

  const onChangeAlert = () => {
    dispatch({ type: "CLEAR_ALERT" })
  };

  // useEffect(() => {
  //     console.log("game.js in First Mount");
  //     setShowWord(true);
  // }, []);
  useEffect(() => {
    if (clue) {
      console.log("clue", clue);
      setShowAll(true);
    } else {
      setShowAll(false);
    }
  }, [clue]);

  useEffect(() => {
    //console.log("howToPlay ", howToPlay );
    if (showHowToPlay) {
      setShowModal(true);
    }
    //setShowHowToPlay(howToPlay);
  }, [showHowToPlay]);

  function dateDiff(date1, date2) {
    const currentDate1 = new Date(date1);
    const currentDate2 = new Date(date2); // Current date
    console.log("currentDate1", currentDate1);
    console.log("currentDate2", currentDate2);
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = currentDate1 - currentDate2;

    // Convert milliseconds to days
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const differenceInDays = differenceInMilliseconds / millisecondsPerDay;
    console.log("differenceInDays", differenceInDays);
    return differenceInDays;
  }
  useEffect(() => {
    //update database if current or wordIndex changes

    let newUserGame = {};
    console.log("game.js useEffect : userGame.LastPlayedDate", userGame.LastPlayedDate);
    console.log("game.js useEffect : lastPlayedDate", lastPlayedDate);
    console.log("game.js useEffect : userGame.wordIndex", userGame.WordIndex);
    console.log("game.js useEffect : wordIndex", wordIndex);
    console.log("game.js useEffect : userGame.current", userGame.Current);
    console.log("game.js useEffect : current", current);
    if (wordIndex > 2) {
      setShowSummary(true);
      dispatch({ type: "SET_GAME_SUMMARY" });
    }
    if (wordIndex <= 2 &&
      (userGame.LastPlayedDate !== lastPlayedDate ||
        userGame.WordIndex < wordIndex ||
        (userGame.WordIndex === wordIndex && userGame.Current < current))) {
      let DiffDate = dateDiff(lastPlayedDate, userGameStat.CurrentStreakDate);
      let currentStreak = userGameStat.CurrentStreak;
      let maxStreak = userGameStat.MaxStreak;
      let currentStreakDate = userGameStat.CurrentStreakDate;
      let guessDistribution = userGameStat.GuessDistribution;

      if (DiffDate > 1) {
        currentStreak = 0;
      }
      if (userGame.LastPlayedDate === lastPlayedDate) {
        newUserGame = {
          ...userGame,
          WordIndex: wordIndex,
          Current: current,
          LastPlayedDate: lastPlayedDate
        }
      } else {
        newUserGame = {
          LastPlayedDate: lastPlayedDate,
          WordIndex: wordIndex,
          Current: current,
          Word1Guess: {},
          Word2Guess: {},
          Word3Guess: {},
          GameState: []
        }
      }
      let wordInd = wordIndex + 1;
      const key = "Word" + wordInd + "Guess";
      let win = userGameStat.NumOfGamesWon;
      if (isGameOver) {
        if (pass) {
          win++;
          let keyy = "Guess" + (current - 1);
          let keyyVal = guessDistribution[keyy] ? guessDistribution[keyy] : 0;
          console.log("Game.js - keyy", keyy);
          guessDistribution = { ...guessDistribution, [keyy]: ++keyyVal };
          if (userGameStat.CurrentStreakDate !== lastPlayedDate
            || currentStreak === 0) {
            currentStreak++;
            currentStreakDate = lastPlayedDate;
            maxStreak = Math.max(maxStreak, currentStreak);
          }

          console.log("if pass , newUserGame.GameState", newUserGame.GameState);
          newUserGame.GameState = [...newUserGame.GameState, "W"];
        } else {
          console.log("if not pass , newUserGame.GameState", newUserGame.GameState);
          newUserGame.GameState = [...newUserGame.GameState, "L"];
        }
        if (wordIndex === 2) {
          if (currentStreakDate !== lastPlayedDate) {
            currentStreak = 0;
          }
        }
      }

      newUserGame = {
        ...newUserGame,
        [key]: words,
      };
      console.log("newUserGame :", newUserGame)
      dispatch(UpdateUserGame(user.uid, newUserGame)).then(() => {
        console.log("data updated successfully!");
        if (isGameOver) {
          let newUserGameStat = {
            ...userGameStat,
            GamesPlayed: userGameStat.GamesPlayed + 1,
            NumOfGamesWon: win,
            CurrentStreakDate: lastPlayedDate,
            CurrentStreak: currentStreak,
            MaxStreak: maxStreak,
            GuessDistribution: guessDistribution
          }
          if (pass) {
            Promise.all([
              dispatch(UpdateUserGameStat(user.uid, newUserGameStat)),
              dispatch(UpdateUserScore(user.uid)),
            ]).then(() => {
              dispatch({ type: "UPDATE_GAMEOVER" })
            }).catch((error) => {
              console.log("Error from fetch/update data", error);
            });
          } else {
            dispatch(UpdateUserGameStat(user.uid, newUserGameStat)).then(() => {
              dispatch({ type: "UPDATE_GAMEOVER" })
            })
              .catch((error) => {
                console.log("Error from fetch/update data", error);
              });

          }

        }
      })
        .catch((error) => {
          console.log("Error from fetch/update data", error);
        })
    }


  }, [current, wordIndex]);


  useEffect(() => {
    console.log("11111111111111111111111");
    console.log("userProfileExists ", userProfileExists);
    console.log("userProfile ", userProfile);
    console.log("userGame ", userGame);
    console.log("userGameStat ", userGameStat);

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
      console.log("From fetchData game.js wsxy");
      //get count of wordlist from server
      let count = 0;

      const coll = collection(db, "wordList");
      try {
        const snapshot = await getCountFromServer(coll);
        console.log('count: ', snapshot.data().count);
        count = snapshot.data().count;
      } catch (err) {
        console.log("error getting count");
      }
      console.log("1.Step getCount ==========>", count);
      console.log("2.Convert count to a nearest multiple of 3 ==========>");
      const countMulti3 = (Math.ceil(count / 3)) * 3;
      console.log("countMulti3", countMulti3);
      if (endId > count) {
        console.log("endId > count", endId, count);
        const rem = (dateFactor * 3) % countMulti3;
        startId = rem + 1;
        endId = rem + 3;
      }
      console.log("3.Convert startId and endId ==========>", startId, endId);
      try {
        const q = query(collection(db, "wordList"), where("id", ">=", startId),
          where("id", "<=", endId));
        const querySnapshot = await getDocs(q);
        console.log("querySnapshot", querySnapshot);
        querySnapshot.forEach((doc) => {
          todayWords.push(doc.data());
        });
        dispatch({ type: "SET_USERGAME", userGame: userGame });
        dispatch({ type: "SET_WORDS", words: todayWords });
        if (userGame.GameState.length === 3 && userGame.LastPlayedDate === lastPlayedDate) {
          setShowSummary(true);
          dispatch({ type: "SET_GAME_SUMMARY" });
          console.log("Show game summary");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        onChangeAlert();
      }, 1000);
    }
  }, [alert]);

  useEffect(() => {
    if (pass) {
      setIsExploding(true);
      setTimeout(() => {
        setIsExploding(false);
      }, 1500);
    }
  }, [pass]);


  // if (gameOver) {
  //   setTimeout(() => {
  //     setShowWord(false);
  //   }, 1000);
  //   //update database.
  // }

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
      className={showSummary ? "gamesummary" : "game"}
      onClick={() => {
        console.log("Clicked!");
        setShowModal(false);
        dispatch({ type: 'SET_QUEST_MODAL_F' });
        console.log(showHowToPlay);

      }}
    >
      {alert ? <p className="alert">{alertMsg}</p> : null}
      {showSummary ? <GameSummary /> :
        showAll ? <>
          {isExploding && (
            <div className="source">
              <ConfettiExplosion {...bigExplodeProps} />
            </div>
          )}
          <Clue row="1" />
          <GameBox />
          <Keyboard />
          {gameOver ? <GameOver pass={pass} /> : null}
          {/* {gameOver & showWord &!pass ? <p className="alert">{word}</p> : null} */}
        </> : null}
      {showModal ? <Instructions /> : null}

    </main>
  );
};

export default Game;

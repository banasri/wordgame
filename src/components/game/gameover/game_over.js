import React from "react";
import { useSelector, useDispatch} from "react-redux";
import "../gameover/game_over.css";

const GameOver = (props) => {
  console.log("in game over!!!!");
  console.log(props);
    //initialise the hook
  const dispatch = useDispatch();
  const setRefresh = () => {
    console.log("Gameover : TRY AGAIN ");
    dispatch({type:'SET_WORD'});
    //dispatch({ type: "REFRESH" });
  };
  const { word, clue, meaning, sentence } = useSelector((state) => ({
    word: state.game.word,
    clue: state.game.clue,   
    meaning : state.game.meaning,
    sentence : state.game.sentence
  }));
  
  return (
    <div className="containerDetails">
      <section className="gameInstructions" style={{ width: "100%" }}>
        {props.pass ? (
          <div style={{ color: "green" }}>
            <p>
              <strong>YOU WON!</strong>
            </p>
            <p style={{ color : "blue"}}>
              Clue : {clue}
            </p>
            <p
              style={{ color: "blue"}}
            >
              Ans : {word}
            </p>
            <p
              style={{ color: "blue"}}
            >
              Meaning : {meaning}
            </p>
            <p
              style={{ color: "blue"}}
            >
              Example Sentence : {sentence}
            </p>
            <p
               onClick={setRefresh}
               style={{ color: "blue", textDecoration: "underline" , cursor: "pointer"}}
             >
               Okey dokey
            </p>
            
          </div>
        ) : (
          <div style={{ color: "red" }}>
            <p>
              <strong>Ooops! Sorry, you lost.</strong>
            </p>
            <p
              style={{ color: "blue", textDecoration: "underline"}}
            >
              Ans : {word}
            </p>
            <p
              style={{ color: "blue"}}
            >
              Meaning : {meaning}
            </p>
            <p
              style={{ color: "blue"}}
            >
              Example Sentence : {sentence}
            </p>
            <p
               onClick={setRefresh}
               style={{ color: "blue", textDecoration: "underline" , cursor: "pointer"}}
             >
               Okey dokey
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default GameOver;

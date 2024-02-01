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
  const { word, clue, meaning, sentence, wordIndex } = useSelector((state) => ({
    word: state.game.word,
    clue: state.game.clue,
    //clueType : state.clueType, 
    meaning : state.game.meaning,
    sentence : state.game.sentence,
    wordIndex : state.game.wordIndex
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
            {wordIndex < 2 ? <p
               onClick={setRefresh}
               style={{ color: "blue", textDecoration: "underline" , cursor: "pointer"}}
             >
               Play again
           </p> : <p>Come again tomorrow!</p>}
            
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
            {wordIndex < 2 ? <p
               onClick={setRefresh}
               style={{ color: "blue", textDecoration: "underline" , cursor: "pointer"}}
             >
               Try again
           </p> : <p>Come again tomorrow!</p>}
            
          </div>
        )}
      </section>
    </div>
  );
};

export default GameOver;

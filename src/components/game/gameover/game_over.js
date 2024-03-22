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
  const word = useSelector((state) => {
    return state.game.word;
  });

  const clue = useSelector((state) => {
    return state.game.clue; 
  });

  
  return (
    <div className="containerDetails">
      <section className="gameOver" style={{ width: "100%" }}>
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
            
            <button onClick={setRefresh} className='gameOver-btn'>Okey dokey</button>
            
          </div>
        ) : (
          <div style={{ color: "red" }}>
            <p>
              <strong>Ooops! Sorry, you lost.</strong>
            </p>
            <p style={{ color : "blue"}}>
              Clue : {clue}
            </p>
            <p
              style={{ color: "blue"}}
            >
              Ans : {word}
            </p>
            
            <button onClick={setRefresh} className='gameOver-btn'>Okey dokey</button>
         
          </div>
        )}
      </section>
    </div>
  );
};

export default GameOver;

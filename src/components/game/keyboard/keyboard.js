import React from 'react';
import "./keyboard.css";
import { useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';

function Keyboard() {

    const letterColors = useSelector((state)=>{
      console.log("inside keyboard useSelector");
      return state.game.letterColors;
    });

    const dispatch = useDispatch();

    const detectKeydown = (event) => {
      console.log("in keyboard useEffect");
      console.log(event);
      console.log(event.key);
      if (event.key === "Enter" || event.key === " "){
        event.preventDefault();
      }
      if (event.key === "Enter"){
        dispatch({type:'CHECK_WORD'});
      } else if (event.key === "Delete" || event.key === "Backspace" ) {
        dispatch({type:'EDIT_WORD', payload : "DEL"});
      } else if (
        ((event.key === 'a') || (event.key === 'A')) ||
        ((event.key === 'b') || (event.key === 'B')) ||
        ((event.key === 'c') || (event.key === 'C')) ||
        ((event.key === 'd') || (event.key === 'D')) ||
        ((event.key === 'e') || (event.key === 'E')) ||
        ((event.key === 'f') || (event.key === 'F')) ||
        ((event.key === 'g') || (event.key === 'G')) ||
        ((event.key === 'h') || (event.key === 'H')) ||
        ((event.key === 'i') || (event.key === 'I')) ||
        ((event.key === 'j') || (event.key === 'J')) ||
        ((event.key === 'k') || (event.key === 'K')) ||
        ((event.key === 'l') || (event.key === 'L')) ||
        ((event.key === 'm') || (event.key === 'M')) ||
        ((event.key === 'n') || (event.key === 'N')) ||
        ((event.key === 'o') || (event.key === 'O')) ||
        ((event.key === 'p') || (event.key === 'P')) ||
        ((event.key === 'q') || (event.key === 'Q')) ||
        ((event.key === 'r') || (event.key === 'R')) ||
        ((event.key === 's') || (event.key === 'S')) ||
        ((event.key === 't') || (event.key === 'T')) ||
        ((event.key === 'u') || (event.key === 'U')) ||
        ((event.key === 'v') || (event.key === 'V')) ||
        ((event.key === 'w') || (event.key === 'W')) ||
        ((event.key === 'x') || (event.key === 'X')) ||
        ((event.key === 'y') || (event.key === 'Y')) ||
        ((event.key === 'z') || (event.key === 'Z')) ||
        (event.key === ' ')
                )
      {
        console.log("when any letter is pressed");
        dispatch({type:'EDIT_WORD', payload : event.key.toUpperCase()});
      } 
    }
    useEffect(() => {
      document.addEventListener("keydown", detectKeydown, true);
    }, []);
    
    const onEdit = (event) => {
        console.log("onEdit Event");
        console.log(event);
        console.log(event.target.dataset);

        if (event.target.dataset.check) {
          dispatch({type:'CHECK_WORD'});
        }
        console.log("in keyboard onEdit");
          if (event.target.dataset.value) {
            dispatch({type:'EDIT_WORD', payload : event.target.dataset.value});
          }
          event.currentTarget.blur();
   
    };
    
  return (
    <section className="keyboard1">
        <div className="key-row" onClick={onEdit}>
          <button
            data-value="Q"
            style={{ backgroundColor: letterColors["Q"] }}
          >
            Q
          </button>
          <button
            data-value="W"
            style={{ backgroundColor: letterColors["W"] }}
          >
            W
          </button>
          <button
            data-value="E"
            style={{ backgroundColor: letterColors["E"] }}
          >
            E
          </button>
          <button
            data-value="R"
            style={{ backgroundColor: letterColors["R"] }}
          >
            R
          </button>
          <button
            data-value="T"
            style={{ backgroundColor: letterColors["T"] }}
          >
            T
          </button>
          <button
            data-value="Y"
            style={{ backgroundColor: letterColors["Y"] }}
          >
            Y
          </button>
          <button
            data-value="U"
            style={{ backgroundColor: letterColors["U"] }}
          >
            U
          </button>
          <button
            data-value="I"
            style={{ backgroundColor: letterColors["I"] }}
          >
            I
          </button>
          <button
            data-value="O"
            style={{ backgroundColor: letterColors["O"] }}
          >
            O
          </button>
          <button
            data-value="P"
            style={{ backgroundColor: letterColors["P"] }}
          >
            P
          </button>
        </div>
        <div className="key-row" onClick={onEdit}>
          <button
            data-value="A"
            style={{ backgroundColor: letterColors["A"] }}
          >
            A
          </button>
          <button
            data-value="S"
            style={{ backgroundColor: letterColors["S"] }}
          >
            S
          </button>
          <button
            data-value="D"
            style={{ backgroundColor: letterColors["D"] }}
          >
            D
          </button>
          <button
            data-value="F"
            style={{ backgroundColor: letterColors["F"] }}
          >
            F
          </button>
          <button
            data-value="G"
            style={{ backgroundColor: letterColors["G"] }}
          >
            G
          </button>
          <button
            data-value="H"
            style={{ backgroundColor: letterColors["H"] }}
          >
            H
          </button>
          <button
            data-value="J"
            style={{ backgroundColor: letterColors["J"] }}
          >
            J
          </button>
          <button
            data-value="K"
            style={{ backgroundColor: letterColors["K"] }}
          >
            K
          </button>
          <button
            data-value="L"
            style={{ backgroundColor: letterColors["L"] }}
          >
            L
          </button>
        </div>
        <div className="key-row" onClick={onEdit}>
          <button
            data-value="Z"
            style={{ backgroundColor: letterColors["Z"] }}
          >
            Z
          </button>
          <button
            data-value="X"
            style={{ backgroundColor: letterColors["X"] }}
          >
            X
          </button>
          <button
            data-value="C"
            style={{ backgroundColor: letterColors["C"] }}
          >
            C
          </button>
          <button
            data-value="V"
            style={{ backgroundColor: letterColors["V"] }}
          >
            V
          </button>
          <button
            data-value="B"
            style={{ backgroundColor: letterColors["B"] }}
          >
            B
          </button>
          <button
            data-value="N"
            style={{ backgroundColor: letterColors["N"] }}
          >
            N
          </button>
          <button
            data-value="M"
            style={{ backgroundColor: letterColors["M"] }}
          >
            M
          </button>
        </div>
        <div className="key-row" onClick={onEdit}>
          <button data-check="\n">
            ENTER
          </button>
          <button data-value=" ">Space Bar</button>
          <button data-value="DEL">DEL</button>
        </div>
      </section>
  )
}

export default Keyboard
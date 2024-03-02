import React from 'react';
import "./keyboard.css";
import { useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';

function Keyboard() {

    const letterColors = useSelector((state)=>{
      console.log("inside keyboard useSelector");
      return state.game.letterColors;
    });
    const letterNums = useSelector((state)=>{
      console.log("inside keyboard useSelector");
      console.log(state.game.letterNums)
      return state.game.letterNums;
    });

    const dispatch = useDispatch();

    
    useEffect(() => {
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

      document.addEventListener("keydown", detectKeydown, true);
      
      return () => {
        document.removeEventListener("keydown", detectKeydown, true);
      };
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
              Q{letterNums["Q"]>1?<sup>{letterNums["Q"]}</sup>:null}
            </button>
            <button
              data-value="W"
              style={{ backgroundColor: letterColors["W"] }}
            >
              W{letterNums["W"]>1?<sup>{letterNums["W"]}</sup>:null}
            </button>
            <button
              data-value="E"
              style={{ backgroundColor: letterColors["E"] }}
            >
              E{letterNums["E"]>1?<sup>{letterNums["E"]}</sup>:null}
            </button>
            <button
              data-value="R"
              style={{ backgroundColor: letterColors["R"] }}
            >
              R{letterNums["R"]>1?<sup>{letterNums["R"]}</sup>:null}
            </button>
            <button
              data-value="T"
              style={{ backgroundColor: letterColors["T"] }}
            >
              T{letterNums["T"]>1?<sup>{letterNums["T"]}</sup>:null}
            </button>
            <button
              data-value="Y"
              style={{ backgroundColor: letterColors["Y"] }}
            >
              Y{letterNums["Y"]>1?<sup>{letterNums["Y"]}</sup>:null}
            </button>
            <button
              data-value="U"
              style={{ backgroundColor: letterColors["U"] }}
            >
              U{letterNums["U"]>1?<sup>{letterNums["U"]}</sup>:null}
            </button>
            <button
              data-value="I"
              style={{ backgroundColor: letterColors["I"] }}
            >
              I{letterNums["I"]>1?<sup>{letterNums["I"]}</sup>:null}
            </button>
            <button
              data-value="O"
              style={{ backgroundColor: letterColors["O"] }}
            >
              O{letterNums["O"]>1?<sup>{letterNums["O"]}</sup>:null}
            </button>
            <button
              data-value="P"
              style={{ backgroundColor: letterColors["P"] }}
            >
              P{letterNums["P"]>1?<sup>{letterNums["P"]}</sup>:null}
            </button>
          </div>
          <div className="key-row" onClick={onEdit}>
            <button
              data-value="A"
              style={{ backgroundColor: letterColors["A"] }}
            >
              A{letterNums["A"]>1?<sup>{letterNums["A"]}</sup>:null}
            </button>
            <button
              data-value="S"
              style={{ backgroundColor: letterColors["S"] }}
            >
              S{letterNums["S"]>1?<sup>{letterNums["S"]}</sup>:null}
            </button>
            <button
              data-value="D"
              style={{ backgroundColor: letterColors["D"] }}
            >
              D{letterNums["D"]>1?<sup>{letterNums["D"]}</sup>:null}
            </button>
            <button
              data-value="F"
              style={{ backgroundColor: letterColors["F"] }}
            >
              F{letterNums["F"]>1?<sup>{letterNums["F"]}</sup>:null}
            </button>
            <button
              data-value="G"
              style={{ backgroundColor: letterColors["G"] }}
            >
              G{letterNums["G"]>1?<sup>{letterNums["G"]}</sup>:null}
            </button>
            <button
              data-value="H"
              style={{ backgroundColor: letterColors["H"] }}
            >
              H{letterNums["H"]>1?<sup>{letterNums["H"]}</sup>:null}
            </button>
            <button
              data-value="J"
              style={{ backgroundColor: letterColors["J"] }}
            >
              J{letterNums["J"]>1?<sup>{letterNums["J"]}</sup>:null}
            </button>
            <button
              data-value="K"
              style={{ backgroundColor: letterColors["K"] }}
            >
              K{letterNums["K"]>1?<sup>{letterNums["K"]}</sup>:null}
            </button>
            <button
              data-value="L"
              style={{ backgroundColor: letterColors["L"] }}
            >
              L{letterNums["L"]>1?<sup>{letterNums["L"]}</sup>:null}
            </button>
          </div>
          <div className="key-row" onClick={onEdit}>
            <button
              data-value="Z"
              style={{ backgroundColor: letterColors["Z"] }}
            >
              Z{letterNums["Z"]>1?<sup>{letterNums["Z"]}</sup>:null}
            </button>
            <button
              data-value="X"
              style={{ backgroundColor: letterColors["X"] }}
            >
              X{letterNums["X"]>1?<sup>{letterNums["X"]}</sup>:null}
            </button>
            <button
              data-value="C"
              style={{ backgroundColor: letterColors["C"] }}
            >
              C{letterNums["C"]>1?<sup>{letterNums["C"]}</sup>:null}
            </button>
            <button
              data-value="V"
              style={{ backgroundColor: letterColors["V"] }}
            >
              V{letterNums["V"]>1?<sup>{letterNums["V"]}</sup>:null}
            </button>
            <button
              data-value="B"
              style={{ backgroundColor: letterColors["B"] }}
            >
              B{letterNums["B"]>1?<sup>{letterNums["B"]}</sup>:null}
            </button>
            <button
              data-value="N"
              style={{ backgroundColor: letterColors["N"] }}
            >
              N{letterNums["N"]>1?<sup>{letterNums["N"]}</sup>:null}
            </button>
            <button
              data-value="M"
              style={{ backgroundColor: letterColors["M"] }}
            >
              M{letterNums["M"]>1?<sup>{letterNums["M"]}</sup>:null}
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
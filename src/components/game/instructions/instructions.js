import React from "react";
import "./instructions.css";

const Instructions = () => {
  return (
    <div className="container">
      <section className="gameInstructions">
        <div className="close-icon">
        {/* <FontAwesomeIcon onClick={handleClick} className='icon-fa' icon={faClose} /> */}
        </div>
        <div className="instructions">
          <h4>How to play <span className='textWord'>Word</span>
        <span className='textCup'>Cup</span></h4>
        <p>
        <strong>Click anywhere to start.</strong>
        </p>
        <p>
              You can play maximum 3 words in a day.         
        </p>
          <p>
            Win at least one to maintain streak!
          </p>
          <p>
            Guess each word in <strong>5</strong> tries. Each guess must be at least <strong>four-letter</strong> valid word.
          </p>
          <p>
            After each guess, the color of the tiles will change.
          </p>
          <div className="examples">
          <p>
            <strong>Examples</strong>
          </p>
          <hr></hr>
          <div className="example">
            <div className="wordInst">
              <div className="instTile"  style={{ backgroundColor: "#6aaa64" }}>S</div>
              <div className="instTile">N</div>
              <div className="instTile">E</div>
              <div className="instTile">A</div>
              <div className="instTile">K</div>
            </div>
            <p>
              The letter <strong>S</strong> is in the word and in the correct
              spot.
            </p>
          </div>

          <div className="example">
            <div className="wordInst">
              <div className="instTile" >C</div>
              <div className="instTile"  style={{ backgroundColor: "#c9b458" }}>H</div>
              <div className="instTile" >O</div>
              <div className="instTile" >R</div>
              <div className="instTile" >E</div>
            </div>
            <p>
              The letter <strong>H</strong> is in the word but in the wrong
              spot.
            </p>
          </div>

          <div className="example">
            <div className="wordInst">
              <div className="instTile" >B</div>
              <div className="instTile" >R</div>
              <div className="instTile" >A</div>
              <div className="instTile"  style={{ backgroundColor: "#787c7e" }}>V</div>
              <div className="instTile" >E</div>
            </div>
            <p>
              The letter <strong>V</strong> is not in the word in any spot.
            </p>
          </div>

          <hr></hr>
        </div>
          <p>
            The word can start from anywhere but cannot contain spaces. 
          </p>
          <div className="examples">
            <p>
              <strong>Example Word - Modest.</strong>
            </p>
            <div className="example">
              <div className="wordInst">
                <div className="instTile" >&nbsp;</div>
                <div className="instTile" >&nbsp;</div>
                <div className="instTile" style={{ backgroundColor: "#787c7e" }}>B</div>
                <div className="instTile" style={{ backgroundColor: "#6aaa64" }}>E</div>
                <div className="instTile" style={{ backgroundColor: "#6aaa64" }}>S</div>
                <div className="instTile" style={{ backgroundColor: "#6aaa64" }}>T</div>
              </div>
              <p>
                The letters E, S, T are in the word and in the correct
                spot.
              </p>
            </div>
          </div>
        </div>
        
      </section>
    </div>
  );
};

export default Instructions;

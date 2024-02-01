import React from 'react';
import "./game_tile.css"
import { useSelector, useDispatch } from 'react-redux';

function GameTile(props) {
    
   console.log("props game_tile");
   console.log(props);
   
   let realWord = props.realword;
   const realWordArr = realWord.split("");

   const current = useSelector((state)=>{
    return state.game.current;
   });
   console.log("current" + current);
  //initialise the hook
   const dispatch = useDispatch();
   const setkeycolor = (letter, color) => {
      dispatch({ type: "SET_KEYCOLOR", key: letter, color: color })
   };

   function replaceChar(origString, replaceChar, index)
    {
        let firstPart = origString.slice(0, index);
         
        let lastPart = origString.slice(index + 1);
     
        let newString =
            firstPart + replaceChar + lastPart;
         
        return newString;
    };

   const checkvalidity = (index) => 
    {
      console.log("in checkvalidity");
      console.log("index : " + index);
      console.log("current , props.row" , current, props.row);
      console.log("real word : " + props.realword + ", word : " + props.word);
    if (current > props.row) {
      if (props.word.toLowerCase()[index] === realWord.toLowerCase()[index]) {
        console.log("green");
        setkeycolor(props.word[index], "#6aaa64");
        realWord = replaceChar(realWord, ' ', index);
        return "tile green";
      } else if (realWord.toLowerCase().includes(props.word.toLowerCase()[index])) {
        const ind = realWord.toLowerCase().indexOf(props.word.toLowerCase()[index]);
        if (props.word.toLowerCase()[ind] === realWord.toLowerCase()[ind]) {
          const charAtInd = props.word.toLowerCase()[ind];
          realWord = replaceChar(realWord, ' ', ind);
          if (realWord.toLowerCase().indexOf(props.word.toLowerCase()[index]) < 0) {
            realWord = replaceChar(realWord, charAtInd, ind);
            return "tile grey";
          } else {
            return "tile yellow";
          }
        }
        realWord = replaceChar(realWord, ' ', ind);
        console.log("yellow");
        setkeycolor(props.word[index], "#c9b458");
        return "tile yellow";
      } else if (props.word.toLowerCase()[index] === " ") 
      {
        return "tile";
      } else {
        console.log("grey");
        setkeycolor(props.word[index], "#787c7e");
        return "tile grey";
      }
    }
    console.log("tile");
    return "tile";
  };
  return (
      <section key={props.row}>
      <div className="wordrow">
      {realWordArr.map((item,index) => {
        return (<div key={index} className={props.word[index] ? checkvalidity(index) : "tile"}>
          {props.word ? props.word[index] : null}
        </div>)
      } )}
      </div>
      </section>
  )
}

export default GameTile

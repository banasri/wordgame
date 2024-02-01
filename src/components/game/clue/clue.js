import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import "./clue.css";
function Clue(props) {

  const clue = useSelector((state)=>{
    console.log("inside clue useSelector");
    console.log(state);
    return state.game.clue;
   });

   const wordIndex = useSelector((state)=>{
    //console.log("inside wordIndex useSelector");
    return state.game.wordIndex;
   });

   const todayWords = useSelector((state) => {
    return state.game.todayWords;
   })

  //initialise the hook
  const dispatch = useDispatch();

  useEffect(() => {
    if (todayWords && todayWords.length > 0) {
      dispatch({type:'SET_WORD'});
    }
  }, [todayWords, dispatch]);


  return (
    <div className='clue-container'>
      <div className='clue-num'>
        {wordIndex + 1}/{3}
      </div>
      <h2 className="clue">{clue}</h2>
    </div>
  )
}

export default Clue

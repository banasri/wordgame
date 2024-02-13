//import wordsClues from "../../src/wordsClues.json";
import validWords from "../../src/validWords.json";

const initialState = {
    maxGame : 3,
    todaysWords : [], 
    wordIndex : 0,
    isLoggedIn : false,
    clue : "",
    clueType : "",
    meaning : "",
    sentence : "",
    wordLength : 5,
    current : 1,
    word : "",
    words : {
      word1: "",
      word2: "",
      word3: "",
      word4: "",
      word5: ""
    },
    showHowToPlay : false,
    alert: false,
    pass: false,
    tryAgain: false,
    gameOver: false,
    showWord : true,
    letterColors: {
        Q: null,
        W: null,
        E: null,
        R: null,
        T: null,
        Y: null,
        U: null,
        I: null,
        O: null,
        P: null,
        A: null,
        S: null,
        D: null,
        F: null,
        G: null,
        H: null,
        J: null,
        K: null,
        L: null,
        Z: null,
        X: null,
        C: null,
        V: null,
        B: null,
        N: null,
        M: null,
      },
      letterNums : {
        Q: 0,
        W: 0,
        E: 0,
        R: 0,
        T: 0,
        Y: 0,
        U: 0,
        I: 0,
        O: 0,
        P: 0,
        A: 0,
        S: 0,
        D: 0,
        F: 0,
        G: 0,
        H: 0,
        J: 0,
        K: 0,
        L: 0,
        Z: 0,
        X: 0,
        C: 0,
        V: 0,
        B: 0,
        N: 0,
        M: 0,
      }

};

// const clueReducer = createReducer(initialState, (builder) => {
//     console.log(builder);
//     builder.addCase('SET_WORD', (state, action) =>{
//         console.log("inside SET_WORD");
//         const index = Math.round((Math.random() * 4));
//         state.clue = wordsClues[0]["clues"][index].clue;
//         state.word = wordsClues[0]["clues"][index].word;

//     });
//     builder.addDefaultCase((state, action) => {
//        return state; 
//     });
// })
const clueReducer = (state = initialState, action) => {
  console.log("state ");
  console.log(state);
    switch(action.type) {
        case 'SET_WORDS' : 
            console.log('2222222222222222222');
            console.log(action);
            const allWords = action.words;
            const wordIndex = state.wordIndex;
            // const clueSize = wordsClues[0]["clues"].length;
            // console.log("clueSize", clueSize);
            // console.log("inside clueReducer : SET_WORD");
            // const index = Math.floor((Math.random() * clueSize));
            // console.log("index : " + index);
            // console.log(wordsClues[0]);
            return { 
                ...initialState,
                todaysWords : allWords,
                clue : allWords[wordIndex].clue,
                word : allWords[wordIndex].word,
                //clueType : allWords[wordIndex].clueType,
                meaning : allWords[wordIndex].meaning,
                sentence : allWords[wordIndex].sentence,
                wordLength : allWords[wordIndex].word.length
            };
        case 'SET_WORD' :
          let index = state.wordIndex + 1;
          console.log("in SET_WORD .......");
          console.log(state);
          if(index === state.maxGame) {
            return {
              ...initialState,
            }
          }
          return { 
            ...initialState,
            todaysWords : state.todaysWords,
            wordIndex : index,
            clue : state.todaysWords[index].clue,
            word : state.todaysWords[index].word,
            //clueType : allWords[wordIndex].clueType,
            meaning : state.todaysWords[index].meaning,
            sentence : state.todaysWords[index].sentence,
            wordLength : state.todaysWords[index].word.length,
            tryAgain: !state.tryAgain,
          };               
        case 'EDIT_WORD' :
          console.log("inside clueReducer : EDIT_WORD"); 
        if (!state.pass) {
            let pos = "word" + state.current;
            console.log("pos - " + pos);
            console.log("action.letter - " + action);
            console.log(action);
            console.log("state.wordLength - " + state.wordLength);
            if (action.payload === "DEL") {
              return {
                ...state,
                words: {
                  ...state.words,
                  [pos]: state.words[pos].slice(0, -1)
                }  
              };
            }
            if (state.words[pos].length !== state.wordLength) {
              console.log("action");
              console.log(action);
              console.log("action.payload");
              console.log(action.payload);
              console.log(state.words[pos]);
              let newword = state.words[pos] + action.payload;
              console.log("word - " + newword);
              
              return {
                ...state,
                words: {
                  ...state.words,
                  [pos]: newword,
                }
              };
            }
          }
          return {
            ...state,
          };
          case "CHECK_WORD":
            console.log("inside Reducer : CHECK_WORD");
            let keyyy = "word" + state.current;
            console.log("state.words", state.words)
            keyyy = state.words[keyyy].toLowerCase().trim();
            if (validWords[0]["words"].includes(keyyy)) {
              console.log("valid word");
              console.log("CHECK_WORD, keyyy.length, state.wordLength, keyyy",
               keyyy.length, state.wordLength, keyyy);
              if ((keyyy.length === state.wordLength) & (keyyy === state.word.toLowerCase())) {
                return {
                  ...state,
                  pass: true,
                  gameOver: true,
                  current: state.current + 1,
                };
              } else if (keyyy.length >= 4 && keyyy.length <= state.wordLength) {
                if (state.current === 5) {
                  return {
                    ...state,
                    gameOver: true,
                    current: state.current + 1,
                  };
                }
                return {
                  ...state,
                  pass: false,
                  current: state.current + 1,
                };
              }
            } else {
              console.log("here 11111111111111111");
              return {
                ...state,
                alert: true,
              };
            };
            // console.log("here 222222222222222222");
            // return {
            //   ...state,
            //   alert: true,
            // };
            break;
        case "SET_KEYCOLOR":
          console.log("in SET_KEYCOLOR");
          console.log("action", action)
          const key = action.key;
          console.log("action.key, action.color", action.key, action.color);
          console.log("letterColors[action.key]", state.letterColors[action.key]);
          let count = 0;
          for(let i =0; i < state.word.length; i++){
            console.log("state.word ", state.word);
            if(state.word[i].toUpperCase() === key){
              count++;
            }
          }
          //console.log("the letter " + key + " appears " + count + " times." );
          if( state.letterColors[action.key] === "#6aaa64") {
            return {
              ...state,
              letterNums: {
                ...state.letterNums,
                [key]: count,
              },
            };
          } else if (state.letterColors[action.key] === "#c9b458" && 
          action.color === "#787c7e") {
            return {
              ...state,
              letterNums: {
                ...state.letterNums,
                [key]: count,
              },
            };
          } else {
            return {
              ...state,
              letterColors: {
                ...state.letterColors,
                [key]: action.color,
              },
              letterNums: {
                ...state.letterNums,
                [key]: count,
              },
            };
          }
          
        case "SET_QUEST_MODAL": 
          console.log("in SET_QUEST_MODAL ...........");
          return {
            ...state,
            showHowToPlay: !state.showHowToPlay,
          };
        case "CLEAR_ALERT":
          console.log("in CLEAR_ALERT ...........");
          return {
            ...state,
            alert: false,
          };
        case "REFRESH":
          console.log("in REFRESH ...........");
          const newIndex = state.wordIndex + 1;
          return {
            ...initialState,
            todaysWords : state.todaysWords,
            wordIndex : newIndex,
            tryAgain: !state.tryAgain,
          };
        default:
            return state;
    };
}
export default clueReducer;
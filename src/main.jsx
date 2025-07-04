import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import reducer from './reducer.js';
import Board from './board.jsx';
import Instructions from './instructions.jsx';
import sleep from './sleep.js';

const newGame = () => {
  const emptySquare = () => {return {occupant:null, highlighted:false}};
  let board = new Array(5).fill(null);
  board = board.map((x)=> new Array(5).fill(null).map(x=>emptySquare()));

  const placePieces = (row,color) => {
    const randomPieces='Q R B N P'.split(' ');
    for (let col=0; col<5; ++col) {
      let piece = randomPieces.splice(Math.floor(Math.random()*randomPieces.length),1);
      board[row+col%2][col].occupant = color+piece;
    }
  }

  placePieces(0,'B');
  placePieces(3,'W');

  return {
    board:         board,
    selected:      null,
    highlighted:   [],
    whiteTurn:     true,
    winner:        null,
    blackPieces:   [],
    blackMoves:    [], // all possible moves
    blackCaptures: [],
    blackMove: [], // the selected move
  }
}

function App () {

  const [state, dispatch] = React.useReducer(reducer, newGame());

  // declare these here so we can toggle between help and game
  const [showHelp, toggleHelp] = React.useState(false);

  const Winner = () => {
    return (
	<div id='winnerDiv'>
	<p>{ (state.winner==='Draw') ? 'Draw' : state.winner+' wins.' } </p>
	<button id="playAgain" onClick={()=>{ setShowWinner(false); dispatch({type:'init' }) }}>Play Again?</button>
	</div>
    )
  }

  const [showWinner, setShowWinner] = React.useState(false);

  const setShowWinnerDelay = async () => {
    await sleep(1000); 
    setShowWinner(true);
  }

  React.useEffect( () => {
    if (state.winner != null) setShowWinnerDelay();
  }, [state.winner] );

  
  if (showHelp) {

    return <Instructions toggleHelp={toggleHelp} />
    
  } else {
    return (
      <div id='game'>

	<Board state={state} dispatch={dispatch} />

	<div className='toggleHelp' onClick={()=>toggleHelp(true)}>?</div>

        {showWinner ? <Winner /> : ''}

      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode> <App/> </React.StrictMode>);

export {newGame};

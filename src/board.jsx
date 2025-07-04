import React from 'react';
import pieces from './pieces.jsx';
import sleep from './sleep.js';

const Board = ({state, dispatch}) => {

  React.useEffect(()=> {
    // if state.blackMoves updates and black's turn
    // highlight moves
    const toggleMove = async() => {
      if (!state.whiteTurn &&
	  state.blackPieces.length>0 &&
	  state.blackMoves.length===0) {
        
        for (let x=0; x<state.blackPieces.length; ++x) {
	  // for each state.blackPieces[x]
	  // get list of moves and highlight them
	  await sleep(1000);
	  let [row,col] = state.blackPieces[x];
	  let [color,piece] = state.board[row][col].occupant.split('');
	  dispatch({type:'highlightBlackMoves', color, piece, row, col });
        }
        
        await sleep(1000);
        dispatch({type:'selectBlackMove'});
        if (!state.winner) {
	  dispatch({type:'highlightBlackMove'});
	  await sleep(150);
	  dispatch({type:'unhighlight'});
	  await sleep(150);
	  dispatch({type:'highlightBlackMove'});
	  await sleep(150);
	  dispatch({type:'unhighlight'});
	  await sleep(150);
	  dispatch({type:'highlightBlackMove'});
	  await sleep(200);
	  dispatch({type:'makeBlackMove'});
        }
      }
    };
    toggleMove();
  }, [state.blackPieces])

  
  
  const handleClick = async (row,col) => {
    if (state.whiteTurn) {
      // if own piece, select that and highlight attackable squares
      let occupant = state.board[row][col].occupant;
      if (occupant && occupant.startsWith('W')) {
	let [color,piece] = occupant.split('');
	if (color==='W') 
	  dispatch({type:'select', color, piece, row, col });

      } else if ( (state.selected != null) &&
		  state.board[row][col].highlighted) {
	await dispatch({type:'move', row:row, col:col });
	// black's turn
	if (state.winner===null) {
	  await sleep(500);
	  //await dispatch({type:'blackMove'});
	  // get list of pieces
	  dispatch({type:'getBlackPieces'});
	}
      }
    }
  }

  const Square = ({row,col}) => {
    let {occupant,highlighted} = state.board[row][col];
    let squareFill = ((row+col)%2===0) ? '#ccc' : '#888';
    let [color,piece] = [null,null];
    if (occupant) {
      [color,piece] = occupant.split('');
      color = (color==='W') ? 'white' : 'black';
    }
    if (highlighted) 
      squareFill = (color==='black') ? '#8f8' : '#cfc';

    return (
      <g transform={`translate( ${col*300}, ${row*300})`}
	 onClick={()=>handleClick(row,col)} >
	<rect className='square' height='300' width='300' fill={squareFill} />
	{(occupant !== null) ? <g fill={color} className={color}>{pieces[piece].svg}</g> : null}
      </g>
    )
  }

  return (
    <svg viewBox="0 0 1500 1500">
      {state.board.map( (x,row) => 
	x.map( (y,col) =>
	    <Square key={row.toString()+col.toString()}
	            row={row} col={col} />
	))}
    
    </svg>
  )
  
}

export default Board;

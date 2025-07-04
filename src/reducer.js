import pieces from './pieces.jsx';
import {newGame} from './main.jsx';

function reducer(state2, action) {

  //let state2 = JSON.parse(JSON.stringify(state));
  let state = structuredClone(state2);
  let {row,col,color,piece} = action;
  let [from,to]=[0,0]; //placeholders
  
  const highlight = (row,col) => {
    state.board[row][col].highlighted=true;
    state.highlighted.push([row,col]);
  }
  
  const unhighlightAll = () => {
    state.highlighted.forEach( xy => {
      let [row,col] = xy;
      state.board[row][col].highlighted=false;
    })
  }

  const anyWhiteMoves = () => {
    for (let row=0; row<5; ++row) {
      for (let col=0; col<5; ++col) {
	let occupant = state.board[row][col].occupant;
	if (occupant && occupant.startsWith('W')) {
	  let [color,piece] = occupant.split('');
	  let {moves,captures} = pieces[piece].moves(state.board,row,col,'B');
	  if (moves.length+captures.length>0) return true;
	}
      }
    }
    return false;
  }

  const justBishopsLeft = () => {
    // check to see if only 2 bishops left 
    for (let row=0; row<5; ++row) {
      for (let col=0; col<5; ++col) {
	let occupant = state.board[row][col].occupant;
	if (occupant) {
	  let [color,piece] = occupant.split('');
	  if (piece !== 'B') return false;
	  
	}
      }
    }
    return true;
  }
  
  switch (action.type) {

  case 'init':
    return newGame();

  case 'select':
    // this gets called when player clicks on white piece
    unhighlightAll();
    state.selected=[row,col];
    highlight(row,col);
    // highlight moves for piece
    // get list of moves
    let {moves,captures} = pieces[piece].moves(state.board,row,col,'B');
    moves.forEach(xy=>highlight(xy[0],xy[1]));
    captures.forEach(xy=>highlight(xy[0],xy[1]));
    break;

    
  case 'move':
    let[oldRow,oldCol] = state.selected;
    let newSquare = state.board[row][col];
    newSquare.occupant=state.board[oldRow][oldCol].occupant;
    state.board[oldRow][oldCol].occupant=null;
    unhighlightAll();
    state.selected=null;
    state.whiteTurn=false;
    // promote pawn
    if ((newSquare.occupant==='WP') && (row===0)) newSquare.occupant='WQ';
    if (justBishopsLeft()) state.winner='Draw';
    break;

    
  case 'getBlackPieces':
    if (justBishopsLeft()) {
      state.winner='Draw';
      break;
    }
    for (let row=0; row<5; ++row) {
      for (let col=0; col<5; ++col) {
	let occupant = state.board[row][col].occupant;
	if (occupant && occupant.startsWith('B'))
	  state.blackPieces.push([row,col]);
      }
    }
    if (state.blackPieces.length===0) state.winner='White';
    break;

    
  case 'highlightBlackMoves':
    unhighlightAll();
    let B = pieces[piece].moves(state.board,row,col,'W');
    highlight(row,col);

    B.moves.forEach(xy=>highlight(xy[0],xy[1]));
    B.captures.forEach(xy=>highlight(xy[0],xy[1]));

    if (B.moves.length>0) 
      state.blackMoves.push(B.moves.map(xy=>[[row,col],xy]));

    if (B.captures.length>0) 
      state.blackCaptures.push(B.captures.map(xy=>[[row,col],xy]));

    state.blackPieces=[];
    break;

    
  case 'selectBlackMove':
    if (state.blackCaptures.length>0) state.blackMoves=state.blackCaptures;
    
    if (state.blackMoves.length===0) {
      state.winner='White';

    } else if (justBishopsLeft()) {
      state.winner='Draw';

    } else {
      unhighlightAll();
      // select a random piece
      let randomPiece = state.blackMoves[~~(Math.random() * state.blackMoves.length)];
      // then select a random move
      state.blackMove = randomPiece[~~(Math.random() * randomPiece.length)];
    }
    break;

  case 'whiteWon':
    state.winner='White';
    break;
    
  case 'highlightBlackMove':
    if (state.blackMove.length>0) {
      [from,to] = state.blackMove;
      highlight(...from);
      highlight(...to);
    }
    break;
    

  case 'unhighlight':
    unhighlightAll();
    break;
    

  case 'makeBlackMove':
    unhighlightAll();
    if (state.blackMove.length===0) break;
    [from,to] = state.blackMove;
    let targetSquare = state.board[to[0]][to[1]];
    targetSquare.occupant = state.board[from[0]][from[1]].occupant;
    state.board[from[0]][from[1]].occupant=null;
    // promote pawn
    if ((targetSquare.occupant==='BP') && (to[0]===4)) targetSquare.occupant='BQ';

    state.blackPieces=[];
    state.blackMoves=[];
    state.blackMove=[];
    state.blackCaptures=[];
      
    // if no more whitemoves, then game over
    if (justBishopsLeft()) {
      state.winner='Draw';

    } else if (anyWhiteMoves()) {
      state.whiteTurn=true;
      
    } else {
      state.winner='Black';
    }
    break;
    
  } // switch
  return state; 
}

export default reducer;

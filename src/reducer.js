import pieces from './pieces.jsx';
import {newGame} from './main.jsx';

function reducer(state, action) {

  let state2 = JSON.parse(JSON.stringify(state));
  let {row,col,color,piece} = action;
  let [from,to]=[0,0]; //placeholders
  
  const highlight = (row,col) => {
    state2.board[row][col].highlighted=true;
    state2.highlighted.push([row,col]);
  }
  
  const unhighlightAll = () => {
    state2.highlighted.forEach( xy => {
      let [row,col] = xy;
      state2.board[row][col].highlighted=false;
    })
  }

  const anyWhiteMoves = () => {
    for (let row=0; row<5; ++row) {
      for (let col=0; col<5; ++col) {
	let occupant = state2.board[row][col].occupant;
	if (occupant && occupant.startsWith('W')) {
	  let [color,piece] = occupant.split('');
	  let {moves,captures} = pieces[piece].moves(state2.board,row,col,'B');
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
	let occupant = state2.board[row][col].occupant;
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
    state2.selected=[row,col];
    highlight(row,col);
    // highlight moves for piece
    // get list of moves
    let {moves,captures} = pieces[piece].moves(state2.board,row,col,'B');
    moves.forEach(xy=>highlight(xy[0],xy[1]));
    captures.forEach(xy=>highlight(xy[0],xy[1]));
    break;

    
  case 'move':
    let[oldRow,oldCol] = state2.selected;
    let newSquare = state2.board[row][col];
    newSquare.occupant=state2.board[oldRow][oldCol].occupant;
    state2.board[oldRow][oldCol].occupant=null;
    unhighlightAll();
    state2.selected=null;
    state2.whiteTurn=false;
    // promote pawn
    if ((newSquare.occupant==='WP') && (row===0)) newSquare.occupant='WQ';
    if (justBishopsLeft()) state2.winner='Draw';
    break;

    
  case 'getBlackPieces':
    if (justBishopsLeft()) {
      state2.winner='Draw';
      break;
    }
    for (let row=0; row<5; ++row) {
      for (let col=0; col<5; ++col) {
	let occupant = state2.board[row][col].occupant;
	if (occupant && occupant.startsWith('B'))
	  state2.blackPieces.push([row,col]);
      }
    }
    if (state2.blackPieces.length===0) state2.winner='White';
    break;

    
  case 'highlightBlackMoves':
    unhighlightAll();
    //highlight(row,col);
    // can't do following for some reason
    // let {moves,captures} = pieces[piece].moves(state2.board,row,col,'W'); 
    let B = pieces[piece].moves(state2.board,row,col,'W');
    highlight(row,col);

    B.moves.forEach(xy=>highlight(xy[0],xy[1]));
    B.captures.forEach(xy=>highlight(xy[0],xy[1]));

    if (B.moves.length>0) 
      state2.blackMoves.push(B.moves.map(xy=>[[row,col],xy]));

    if (B.captures.length>0) 
      state2.blackCaptures.push(B.captures.map(xy=>[[row,col],xy]));

    state2.blackPieces=[];
    break;

    
  case 'selectBlackMove':
    if (state2.blackCaptures.length>0) state2.blackMoves=state2.blackCaptures;
    
    if (state2.blackMoves.length===0) {
      state2.winner='White';

    } else if (justBishopsLeft()) {
      state2.winner='Draw';

    } else {
      unhighlightAll();
      // select a random piece
      let randomPiece = state2.blackMoves[~~(Math.random() * state2.blackMoves.length)];
      // then select a random move
      state2.blackMove = randomPiece[~~(Math.random() * randomPiece.length)];
    }
    break;

  case 'whiteWon':
    state2.winner='White';
    break;
    
  case 'highlightBlackMove':
    if (state2.blackMove.length>0) {
      [from,to] = state2.blackMove;
      highlight(...from);
      highlight(...to);
    }
    break;
    

  case 'unhighlight':
    unhighlightAll();
    break;
    

  case 'makeBlackMove':
    unhighlightAll();
    if (state2.blackMove.length===0) break;
    [from,to] = state2.blackMove;
    let targetSquare = state2.board[to[0]][to[1]];
    targetSquare.occupant = state2.board[from[0]][from[1]].occupant;
    state2.board[from[0]][from[1]].occupant=null;
    // promote pawn
    if ((targetSquare.occupant==='BP') && (to[0]===4)) targetSquare.occupant='BQ';

    state2.blackPieces=[];
    state2.blackMoves=[];
    state2.blackMove=[];
    state2.blackCaptures=[];
      
    // if no more whitemoves, then game over
    if (justBishopsLeft()) {
      state2.winner='Draw';

    } else if (anyWhiteMoves()) {
      state2.whiteTurn=true;
      
    } else {
      state2.winner='Black';
    }
    break;
    
  } // switch
  return state2; 
}

export default reducer;

function checkSquare(board,x,y,enemyColor,moves,captures) {
  if (x<0 || x>4 || y<0 || y>4) return false;
  let square=board[x][y];
  if (square.occupant===null) {
    moves.push([x,y]);
    return true;
  } else {
    if (square.occupant.startsWith(enemyColor))
      captures.push([x,y]);
    return false;
  }
}

function bishopMoves(board,row,col,enemyColor) {
  let moves=[];
  let captures=[];
  let [x,y,empty]=[row,col,true];
  
  //upperleft
  while(x>0 && y>0 && empty) {
    --x; --y;
    empty = checkSquare(board,x,y,enemyColor,moves,captures);
  }
  
  //upperright
  [x,y,empty]=[row,col,true];
  while(x>0 && y<4 && empty) {
    --x; ++y;
    empty = checkSquare(board,x,y,enemyColor,moves,captures);
  }

  //lowerleft
  [x,y,empty]=[row,col,true];
  while(x<4 && y>0 && empty) {
    ++x; --y;
    empty = checkSquare(board,x,y,enemyColor,moves,captures);
  }

  //lowerright
  [x,y,empty]=[row,col,true];
  while(x<4 && y<4 && empty) {
    ++x; ++y;
    empty = checkSquare(board,x,y,enemyColor,moves,captures);
  }

  return {moves,captures};
}


function rookMoves(board,row,col,enemyColor) {
  let moves=[];
  let captures=[];
  let [x,y,empty]=[row,col,true];
  
  //up
  while(x>0 && empty) {
    --x;
    empty = checkSquare(board,x,y,enemyColor,moves,captures);
  }
  
  //down
  [x,y,empty]=[row,col,true];
  while(x<4 && empty) {
    ++x;
    empty = checkSquare(board,x,y,enemyColor,moves,captures);
  }
  
  //left
  [x,y,empty]=[row,col,true];
  while(y>0 && empty) {
    --y;
    empty = checkSquare(board,x,y,enemyColor,moves,captures);
  }

  //right
  [x,y,empty]=[row,col,true];
  while(y<4 && empty) {
    ++y;
    empty = checkSquare(board,x,y,enemyColor,moves,captures);
  }


  return {moves,captures};
}


const pieces = {

  K: {svg:
       <g className="piece">
       <ellipse cx="100" cy="160" rx="80" ry="110" transform="rotate(-15,100,160)" />
       <ellipse cx="200" cy="160" rx="80" ry="110" transform="rotate(15,200,160)" />
       <ellipse cx="150" cy="60" rx="20" ry="30" fill="#ff0" />
       <rect x="30" y="240" width="240" height="50" />
       </g>
      },

  Q: {svg:
      <g className="piece">
      <path d="M110,280    L75,43 L120,80 L150,20 L180,80 L225,40 L190,280 " />
      <rect x="30" y="240" width="240" height="50" />
      <circle cx='75' cy='43' r='10'  />
      <circle cx='150' cy='20' r='10'  />
      <circle cx='225' cy='40' r='10'  />
      </g>,
      moves: (board,row,col,enemyColor) => {
	let rMoves = rookMoves(board,row,col,enemyColor);
	let bMoves = bishopMoves(board,row,col,enemyColor);
	return {moves:   [...rMoves.moves, ...bMoves.moves],
		captures:[...rMoves.captures, ...bMoves.captures]}
      },
     },
  
  R: {svg:
      <g className="piece">
      <rect x="80" y="100" width="140" height="120" />
      <rect x="20" y="250" width="260" height="40" />
      <rect x="40" y="210" width="220" height="40" />

      <rect x="50" y="60" width="200" height="40" />
      <rect x="50" y="20" width="40" height="40" />
      <rect x="130" y="20" width="40" height="40" />
      <rect x="210" y="20" width="40" height="40" />
      </g>,

      moves: (board,row,col,enemyColor)=> 
      rookMoves(board,row,col,enemyColor),
      
     },
  
  B: {svg:
      <g className="piece">
      <path d="M120,280 C -67,-60 368,-60 180,280" />
      <rect x="30" y="240" width="240" height="50" />
      <g id="cross" stroke="#888">
      <line x1="130" x2="170" y1="110" y2="110" />
      <line x1="150" x2="150" y1="90" y2="130" />
      </g>
      </g>,

      moves: (board,row,col,enemyColor)=> 
      bishopMoves(board,row,col,enemyColor),
      
     },
  
  N: {svg:
      <g className="piece">
      <path d="M240,120  L160,20  C60,60 10,150 75,240  L225,240  C60,140 120,80 160,100  L220,145 Z" />
      <rect x="30" y="240" width="240" height="50" />
      </g>,
      
      moves: (board,row,col,enemyColor)=> {
	let moves=[];
	let captures=[];
	checkSquare(board,row+1,col+2,enemyColor,moves,captures);	
	checkSquare(board,row+2,col+1,enemyColor,moves,captures);	
	checkSquare(board,row-1,col-2,enemyColor,moves,captures);	
	checkSquare(board,row-2,col-1,enemyColor,moves,captures);	
	checkSquare(board,row+1,col-2,enemyColor,moves,captures);	
	checkSquare(board,row-2,col+1,enemyColor,moves,captures);	
	checkSquare(board,row-1,col+2,enemyColor,moves,captures);	
	checkSquare(board,row+2,col-1,enemyColor,moves,captures);
	return {moves,captures}
      },
      
     },

  P: {svg:
      <g className="piece">
      <ellipse cx="150" cy="190" rx="40" ry="70" />
      <circle cx="150" cy="100" r="30" />
      <path d="M50,290 C 100,210 200,210 250,290 z" />
      </g>,

      moves: (board,row,col,enemyColor)=> {
	let moves=[];
	let captures=[];
	let nextRow = (enemyColor==='W') ? row+1 : row-1;
	
	if ((nextRow>=0) && (nextRow<5)) {
	  // empty square ahead?
	  if (board[nextRow][col].occupant===null) moves.push([nextRow,col]);

	  // enemy square ahead and left
	  if ( (col>0) && 
	       (board[nextRow][col-1].occupant !== null) &&
	       (board[nextRow][col-1].occupant.startsWith(enemyColor)) )
	    captures.push([nextRow,col-1]);

	  // enemy square ahead and right
	  if ( (col<4) && 
	       (board[nextRow][col+1].occupant !== null) &&
	       (board[nextRow][col+1].occupant.startsWith(enemyColor)) )
	    captures.push([nextRow,col+1]);
	}
	
	return {moves,captures};
      }
     }
  
}

export default pieces;

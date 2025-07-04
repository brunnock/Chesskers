//import React from 'react';
import pieces from './pieces.jsx';

function Instructions({toggleHelp}) {
  return (
      <div id='instructionsDIV'>
      <div className='toggleHelp' onClick={()=>toggleHelp(false)}>X</div>
      
      <p>The object of the game is to capture all of your opponent's pieces.
      You can also win if you block your opponent's lone pawn).</p>

    <p>Each player starts with 5 different chess pieces
  (all of the standard chess pieces minus the king)
  placed randomly on either side of the board.
    You can move your pieces and capture your opponent's
  pieces according to the standard rules of chess.</p>

    <fieldset>
    <legend>Rooks</legend>
    <svg id="rookmoves" viewBox="0 0 1500 1500"> 

    <rect fill="url(#checkerPattern)" x="0" y="0" width="1500" height="1500" />

    <g fill='#000' transform="translate(600,0)">{pieces.P.svg}</g>
    
    <g strokeWidth="10" stroke="#0f0">
    <line x1="150" y1="750" x2="1350" y2="750" />
    <line x1="750" y1="200" x2="750" y2="1050" />
    </g>
    
    <g fill="#0f0" strokeWidth="0">
    <circle cx="150" cy="750" r="30" />
    <circle cx="450" cy="750" r="30" />
    <circle cx="1050" cy="750" r="30" />
    <circle cx="1350" cy="750" r="30" />
    
    <circle cx="750" cy="450" r="30" />
    <circle cx="750" cy="1050" r="30" />
    </g>

    <g strokeWidth="20" stroke="#f00">
    <line x1="700" y1="150" x2="800" y2="250" />
    <line x1="700" y1="250" x2="800" y2="150" />
    </g>
    

    <g fill='#fff' transform="translate(600,600)">{pieces.R.svg}</g>
    <g fill='#fff' transform="translate(600,1200)">{pieces.P.svg}</g>
    </svg>
    <p>Rooks can move any number of empty squares vertically or horizontally.
    They can land on enemy pieces and capture them.</p>
  </fieldset>

  
    <fieldset>
    <legend>Bishops</legend>
    <svg viewBox="0 0 1500 1500"> 

    <rect fill="url(#checkerPattern)" x="0" y="0" width="1500" height="1500" />

    <g fill='#000' transform="translate(0,0)">{pieces.P.svg}</g>
    
    <g strokeWidth="10" stroke="#0f0">
    <line x1="150" y1="150" x2="1050" y2="1050" />
    <line x1="150" y1="1350" x2="1350" y2="150" />
    </g>
    
    <g fill="#0f0" strokeWidth="0">
    <circle cx="150" cy="1350" r="30" />
    <circle cx="450" cy="1050" r="30" />
    <circle cx="1050" cy="450" r="30" />
    <circle cx="1350" cy="150" r="30" />
    
    <circle cx="450" cy="450" r="30" />
    <circle cx="1050" cy="1050" r="30" />
    </g>

    <g strokeWidth="20" stroke="#f00">
    <line x1="100" y1="100" x2="200" y2="200" />
    <line x1="100" y1="200" x2="200" y2="100" />
    </g>
    
    <g fill='#fff' transform="translate(600,600)">{pieces.B.svg}</g>
    <g fill='#fff' transform="translate(1200,1200)">{pieces.P.svg}</g>
    </svg>
    <p>Bishops can move any number of empty squares diagonally.
    They can land on enemy pieces and capture them.</p>
  </fieldset>


    <fieldset>
    <legend>Queens</legend>
    <svg viewBox="0 0 1500 1500"> 

    <rect fill="url(#checkerPattern)" x="0" y="0" width="1500" height="1500" />

    <g fill='#000' transform="translate(0,0)">{pieces.P.svg}</g>
    <g fill='#000' transform="translate(600,0)">{pieces.P.svg}</g>
    
    <g strokeWidth="10" stroke="#0f0">
    <line x1="150" y1="150" x2="1050" y2="1050" />
    <line x1="150" y1="1350" x2="1350" y2="150" />
    <line x1="150" y1="750" x2="1350" y2="750" />
    <line x1="750" y1="150" x2="750" y2="1050" />
    </g>
    
    <g fill="#0f0" strokeWidth="0">
    <circle cx="150" cy="1350" r="30" />
    <circle cx="450" cy="1050" r="30" />
    <circle cx="1050" cy="450" r="30" />
    <circle cx="1350" cy="150" r="30" />
    
    <circle cx="450" cy="450" r="30" />
    <circle cx="1050" cy="1050" r="30" />

    <circle cx="150" cy="750" r="30" />
    <circle cx="450" cy="750" r="30" />
    <circle cx="1050" cy="750" r="30" />
    <circle cx="1350" cy="750" r="30" />
    
    <circle cx="750" cy="450" r="30" />
    <circle cx="750" cy="1050" r="30" />
    </g>

    <g strokeWidth="20" stroke="#f00">
    <line x1="100" y1="100" x2="200" y2="200" />
    <line x1="100" y1="200" x2="200" y2="100" />
    <line x1="700" y1="100" x2="800" y2="200" />
    <line x1="700" y1="200" x2="800" y2="100" />
   </g>
    

    <g fill='#fff' transform="translate(600,600)">{pieces.Q.svg}</g>
    <g fill='#fff' transform="translate(1200,1200)">{pieces.P.svg}</g>
    <g fill='#fff' transform="translate(600,1200)">{pieces.P.svg}</g>

    </svg>
    <p>Queens can move any number of empty squares vertically, horizontally, or diagonally.
    They can land on enemy pieces and capture them.</p>
  </fieldset>


    <fieldset>
    <legend>Knights</legend>
    <svg viewBox="0 0 1500 1500"> 

    <rect fill="url(#checkerPattern)" x="0" y="0" width="1500" height="1500" />

    <g fill='#000' transform="translate(300,0)">{pieces.P.svg}</g>
    <g fill='#000' transform="translate(600,300)">{pieces.P.svg}</g>

    <g strokeWidth="10" stroke="#0f0">
    <line x1="150"  y1="750"  x2="1350" y2="750"  />
    <line x1="750"  y1="150"  x2="750"  y2="1350" />
    
    <line x1="150"  x2="150"  y1="450"  y2="1050" />
    <line x1="1350" x2="1350" y1="450"  y2="1050" />
    <line y1="150"  y2="150"  x1="450"  x2="1050" />
    <line y1="1350" y2="1350" x1="450"  x2="1050" />
    </g>
    
    <g fill="#0f0" strokeWidth="0">
    <circle cx="150" cy="450" r="30" />
    <circle cx="150" cy="1050" r="30" />
    <circle cx="1350" cy="450" r="30" />
    <circle cx="1350" cy="1050" r="30" />

    <circle cy="150" cx="1050" r="30" />
    <circle cy="1350" cx="450" r="30" />
    <circle cy="1350" cx="1050" r="30" />
    </g>

    <g strokeWidth="20" stroke="#f00">
    <line x1="400" y1="100" x2="500" y2="200" />
    <line x1="400" y1="200" x2="500" y2="100" />
    </g>

    <g fill='#fff' transform="translate(600,600)">{pieces.N.svg}</g>
    <g fill='#fff' transform="translate(600,1200)">{pieces.P.svg}</g>

    
  </svg>
    <p>Knights can move 2 squares vertically and 1 square horizontally.
    Or they can move 2 squares horizontally and 1 square vertically.
    They can pass over other pieces. They can land on and capture enemy pieces, but not friendly ones.
    </p>

    </fieldset>


  
  <fieldset>
    <legend>Pawns</legend>
    <svg viewBox="0 0 1500 1500"> 

    <rect fill="url(#checkerPattern)" x="0" y="0" width="1500" height="1500" />

    <g fill='#000' transform="translate(900,300)">{pieces.P.svg}</g>

    <g strokeWidth="10" stroke="#0f0">
    <line x1="750" x2="750" y1="750" y2="450" />
    <line x1="750" x2="1050" y1="750" y2="450" />
    </g>
    
    <g fill="#0f0" strokeWidth="0">
    <circle cx="750" cy="450" r="30" />
    </g>

    <g strokeWidth="20" stroke="#f00">
    <line x1="1000" y1="400" x2="1100" y2="500" />
    <line x1="1000" y1="500" x2="1100" y2="400" />
    </g>

    <g fill='#fff' transform="translate(600,600)">{pieces.P.svg}</g>

    
  </svg>
    <p>Pawns can move ahead 1 empty square.
    Pawns can capture enemies that are 1 square forward and 1 square adjacent.
    If a pawn reaches the last row, then it gets promoted to a queen.  </p>

  </fieldset>


  
    <svg>
    <defs>
    <pattern id="checkerPattern" width="600" height="600" patternUnits="userSpaceOnUse">
    <rect className="square" fill="#ccc" x="0"   y="0" height="300" width="300" />
    <rect className="square" fill="#444" x="300" y="0" height="300" width="300" />
    <rect className="square" fill="#444" x="0"   y="300" height="300" width="300" />
    <rect className="square" fill="#ccc" x="300" y="300" height="300" width="300" />
    </pattern>
    </defs>
    </svg>


  </div>
  )
}

export default Instructions;

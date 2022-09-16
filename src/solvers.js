/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

//I - n (number representing number of arrays in board, length of array, the number of pieces to add)
//O -a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
//C - N/A (reconsider if optimizing)
//E -where n is less than 0; n === 0

// hasRowConflictAt: function(rowIndex)
// hasAnyRowConflicts: function()
// hasColConflictAt: function(colIndex)
// hasAnyColConflicts: function()
// hasAnyRooksConflicts
//        [ [0, 0, 0]
//          [0, 0, 0]
//          [0, 0, 0]
//        ]
//focus - tree traversal, recursion, note: use methods from Board.js

window.findNRooksSolution = function(n) {
  if (n === 1) {
    return [[1]];
  }
  let board = new Board({'n': n});
  let solutions = [];
  let found = false;
  let boardBuilder = function (r) {
    if (r === n) {
      solutions.push(board.rows());
      found = true;
      return;
    }
    for (let col = 0; col < n; col++) {
      //place a piece
      board.togglePiece(r, col);
      //check for conflict
      if (!board.hasAnyRooksConflicts()) {
        boardBuilder(r + 1);
      }
      if (found) {
        return;
      }
      board.togglePiece(r, col);
    }
  };
  boardBuilder(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return solutions[0];
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

window.countNRooksSolutions = function(n) {
  if (n === 1) {
    return 1;
  }
  let board = new Board({'n': n});
  let solutions = [];
  let boardBuilder = function (r) {
    if (r === n) {
      solutions.push(board.rows());
      return;
    }
    for (let col = 0; col < n; col++) {
      //place a piece
      board.togglePiece(r, col);
      //check for conflict
      if (!board.hasAnyRooksConflicts()) {
        boardBuilder(r + 1);
      }
      board.togglePiece(r, col);
    }
  };
  boardBuilder(0);


  console.log('Number of solutions for ' + n + ' rooks:', solutions.length);
  return solutions.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
//hasAnyQueenConflictsOn: function(rowIndex, colIndex)
// hasAnyQueensConflicts: function()
window.findNQueensSolution = function(n) {
  if (n === 1) {
    return [[1]];
  }
  let board = new Board({'n': n});
  if (n === 2 || n === 3) {
    return board.rows();
  }
  let solutions = [];
  let found = false;
  let boardBuilder = function (r) {
    if (r === n) {
      solutions.push(board.rows());
      found = true;
      return;
    }
    for (let col = 0; col < n; col++) {
      //place a piece
      board.togglePiece(r, col);
      //check for conflict
      if (!board.hasAnyQueensConflicts()) {
        boardBuilder(r + 1);
      }
      if (found) {
        return;
      }
      board.togglePiece(r, col);
    }
  };
  boardBuilder(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutions[0]));

  return solutions[0];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 1) {
    return 1;
  }
  let board = new Board({'n': n});
  if (n === 2 || n === 3) {
    return 0;
  }
  let solutions = [];
  //let found = false;
  let boardBuilder = function (r) {
    if (r === n) {
      solutions.push(board.rows());
      //found = true;
      return;
    }
    for (let col = 0; col < n; col++) {
      //place a piece
      board.togglePiece(r, col);
      //check for conflict
      if (!board.hasAnyQueensConflicts()) {
        boardBuilder(r + 1);
      }
      // if (found) {
      //   return;
      // }
      board.togglePiece(r, col);
    }
  };
  boardBuilder(0);

  console.log('Number of solutions for ' + n + ' queens:', solutions.length);
  return solutions.length;
};

// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
      // [0, 1, 2, 3]
      // [-1, 0, 1, 2]
      // [-2, -1, 0, 1]
      // [-3, -2, -1, 0]
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
      // [0, 1, 2, 3]
      // [1, 2, 3, 4]
      // [2, 3, 4, 5]
      // [3, 4, 5, 6]
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    //I- rowIndex
    //O - boolean
    //C - N/A
    //E - N/A
    //NTS: use the board constructor (let board = new Board(?);)
    hasRowConflictAt: function(rowIndex) {
      //define a count variable
      let count = 0;
      //get the specified row
      let currentRow = this.get(rowIndex);
      //iterate through the current row
      for (let i = 0; i < currentRow.length; i++) {
        //if there is another piece on that row
        if (currentRow[i] === 1) {
          //increment count by 1
          count++;
        }
      }
      //if the count > 1
      if (count > 1) {
        //return true
        return true;
      }
      //otherwise
      return false;
    },

    // test if any rows on this board contain conflicts
    //I- N/A
    //O- boolean
    //C- N/A
    //E - N/A
    hasAnyRowConflicts: function() {
      //create closure variable and set to false
      let hasConflict = false;
      //access the array of rows onboard
      let currentRow = this.rows();
      //iterate through array of row arrays
      for (let i = 0; i < currentRow.length; i++) {
        let check = this.hasRowConflictAt(i);
        //check for conflicts by calling hasRowConflictAt at current row
        if (check) {
          hasConflict = true;
        }
      }
      //otherwise - return false
      return hasConflict;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    //I - column index
    //O - boolean value
    //C - N/A
    //E - N/A
    hasColConflictAt: function(colIndex) {
      // this.attributes = {
      //0: [0, 0, 0];
      //1: [0, 0, 0];
      //2: [0, 0, 0];
      // n : 3; }
      //set counter variable = 0;
      let counter = 0;
      for (var i = 0; i < this.attributes[0].length; i++ ) {
        // if this.attributes[i][colIndex] === 1, counter ++
        if (this.attributes[i][colIndex] === 1) {
          counter++;
        }
      }
      //if counter > 1, return true;, else false;
      if (counter > 1) {
        return true;
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //define a closure variable
      let hasConflicts = false;
      //define a board variable
      let board = this.rows();
      //returns [ [0, 0, 0]
      //          [0, 0, 0]
      //          [0, 0, 0]
      //        ]
      for (let i = 0; i < board.length; i ++) {
        if (this.hasColConflictAt(i)) {
          hasConflicts = true;
        }
      }
      return hasConflicts;
    },


    // _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
    //   return colIndex - rowIndex;
    //   // [0, 1, 2, 3]
    //   // [-1, 0, 1, 2]
    //   // [-2, -1, 0, 1]
    //   // [-3, -2, -1, 0]
    // },

    // _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
    //   return colIndex + rowIndex;
    //   // [0, 1, 2, 3]
    //   // [1, 2, 3, 4]
    //   // [2, 3, 4, 5]
    //   // [3, 4, 5, 6]
    // },
    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //set a counter = 0;
      let counter = 0;

      let board = this.rows();
      //this._getRFCIFMajorD => index === parameter
      console.log('board:', board);
      for (let i = 0; i < board.length; i ++) {
        for (let j = 0; j < board.length; j++) {
          let index = this._getFirstRowColumnIndexForMajorDiagonalOn(i, j);
          if (index === majorDiagonalColumnIndexAtFirstRow && board[i][j] === 1) {
            //counter ++;
            counter ++;
          }
          console.log('i:', i, 'j', j, 'counter:', counter, 'board[i][j]:', board[i][j]);
        }
      }
      //if counter > 1 return true; else false;
      if (counter > 1) {
        return true;
      }
      return false;
    },

    // var matrix = [
    //   [0, 1, 0, 0],
    //   [0, 0, 1, 0],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0]
    // ];

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let hasConflict = false;
      let board = this.rows();
      //iterate through each row/column
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
          let index = this._getFirstRowColumnIndexForMajorDiagonalOn(i, j);
          let test = this.hasMajorDiagonalConflictAt(index);
          console.log('i:', i, 'j:', j, 'test:', test, 'index:', index);

          if (test) {
            hasConflict = true;
          }
        }
      }
      return hasConflict;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

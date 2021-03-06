export default class Brain {
  /**
   * Set class props.
   *
   * @param {Array.<Array.<"O"|"X"|null>>} boardStatus Actual board data
   * @param {number} boardSize Board size
   * @param {number} chainLength Length of the stones necessary to win the game
   */
  constructor(boardStatus, boardSize, chainLength) {
    this.boardStatus = boardStatus;
    this.boardSize = boardSize;
    this.chainLength = chainLength;
    this.patterns = this.getPatterns(); // matching templates
    this.scanOrigins = this.getScanOrigins(); // scan directions
    this.disturbance = 1.0; // Priority: disturbing the human chain VS building the COM chain
    this.winner = ""; // Symbol of the winner if confirmed
  }

  /**
   * Generate patterns to be used in the template matching later.
   * e.g.
   *    When a player needs 3 stone chains to win,
   *    there're 2*2*2 = 8 pattern varieties
   * Called from the constructor only.
   *
   * @return {}
   */
  getPatterns() {
    // Create empty container array
    let patterns = new Array(Math.pow(2, this.chainLength)).fill(null);

    for (let i = 0; i < patterns.length; i++) {
      let binaryArr = this.getBinaryArray(i, this.chainLength);
      let scoreArr = this.getScoreArray([...binaryArr]);

      patterns[i] = {
        binary: [...binaryArr], // e.g. [1, 1, 0, 1, 0]
        score: [...scoreArr], // e.g. [0, 0, 100, 0, 100]
      };
    }

    console.log("Template patterns:", patterns);

    /**
     * Sort patterns to avoid unnecessary matching. (for constructor)
     * e.g.
     *   When [11010] matches, furtherly matching [10000], [11000] is redundant,
     *   because they always matches in that case.
     *   Therefore, put [11010] prior to [10000], [11000],
     *   and when [11010] is matched, abort matching to latter patterns.
     */
    return this.sortPatterns(patterns);
  }

  /**
   * Sort patterns. Called from the constructor only.
   *
   * @param {Array.<{binary: Array.<number>, score: Array.<number>}>} patterns
   *    Generated patterns
   * @return {Array.<{binary: Array.<number>, score: Array.<number>}>}
   *    Patterns with more "1", which have higher scores, will be put first.
   *    Therefore 11111 will be the first, 00000 will be the last.
   */
  sortPatterns(patterns) {
    return patterns.sort((a, b) => {
      // Put the array with more "1" before others
      return (
        b.binary.reduce((sum, num) => {
          return sum + num;
        }) -
        a.binary.reduce((sum, num) => {
          return sum + num;
        })
      );
    });
  }

  /**
   * Convert position array into score array based on patterns.
   * Every empty square in the template shares the same score.
   * Called from the constructor only.
   *
   * @param {Array.<number>} array
   *  1: square with a stone. NOte that it's not char symbol "O" nor "X"
   *  0: Empty square
   * @return {Array.<number>}
   *
   * e.g.
   *  [1, 0, 0, 1, 0, 0] => [0, 100, 100, 0, 100, 100]
   *  Position with higher score is more recommended position to put stone in the next move
   */
  getScoreArray(array) {
    // Number of stones (that is, 1) in the template
    const stonesTotal = array.reduce((acc, cur) => acc + cur);

    return array.map((squareVal) => {
      // When the square is empty, assign the score to it
      if (squareVal === 0) return Math.pow(100, stonesTotal);
      else return 0;
    });
  }

  /**
   * Convert a decimal number into binary array.
   * Unused upper digit will be filled with 0.
   * Called from the constructor only.
   *
   * @param {number} decimal
   *    Decimal number to be converted to binary number
   * @param {number} arrayLength
   *    Length of the array to be returned
   * @return {Array.<number>}
   *    Array of the binary number with blank digits filled with 0
   */
  getBinaryArray(decimal, arrayLength) {
    // e.g. 5 => "101"
    var strBinary = decimal.toString(2);

    // Fill zero to the blank digit
    // e.g. "101" => "00101"
    while (strBinary.length < arrayLength) {
      strBinary = "0" + strBinary;
    }

    // Convert string of number to array of numbers splitted
    // e.g. "00101" => [0, 0, 1, 0, 1]
    return strBinary.split("").map((num) => Number(num));
  }

  /**
   * Return origins & directions of all the scans to be done later.
   * Called from the constructor only.
   *
   * @returns {Array.<{row: number, col: number, direction: string}>}
   *    e.g.
   *      {row: 3, col: 0, direction: "right"} means
   *      "Scan from (0, 3) square to the right"
   */
  getScanOrigins() {
    // Container for the start points of the scans
    let scanOrigins = [];

    // Origins: from index 0 to the edge
    for (let i = 0; i < this.boardSize; i++) {
      // From the leftmost column
      scanOrigins.push({
        row: i,
        col: 0,
        direction: "right",
      });
      scanOrigins.push({
        row: i,
        col: 0,
        direction: "lowerRight",
      });
      scanOrigins.push({
        row: i,
        col: 0,
        direction: "upperRight",
      });

      // From the top row
      scanOrigins.push({
        row: 0,
        col: i,
        direction: "down",
      });
    }

    // Origins: from index 1 to the edge,
    // because the origins for some diagonal scan lines
    // are already pushed by the code above
    for (let i = 1; i < this.boardSize; i++) {
      // From the top column to the lower right
      scanOrigins.push({
        row: 0,
        col: i,
        direction: "lowerRight",
      });

      // From the bottom column to the upper right
      scanOrigins.push({
        row: this.boardSize - 1,
        col: i,
        direction: "upperRight",
      });
    }

    return scanOrigins;
  }

  /**
   * Pick one empty square from the current board randomly (for debug)
   * @param {Array.<Array.<"O"|"X"|"">>} boardStatus
   *    Represents for current board
   * @return {{ rowIndex: number, colIndex: number}}
   *    Next COM move
   */
  getRandomMove(boardStatus) {
    // List of coords of all the empty squares
    let emptySquares = [];
    boardStatus.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col == "")
          // When the square is empty
          emptySquares.push({
            rowIndex: rowIndex,
            colIndex: colIndex,
          });
      });
    });

    // Pick an empty square from the empty squares
    const randomIndex = Math.floor(Math.random() * emptySquares.length);

    return emptySquares[randomIndex];
  }

  /**
   * Entry point for all the next move calculations
   * @param {Array.<Array.<"O"|"X"|"">>} boardStatus
   *    Represents for current board
   * @param {boolean} isOsTurn
   *    Tells if the next player is "O"
   * @return {{ rowIndex: number, colIndex: number}}
   *    Next COM move
   */
  getNextMove(boardStatus) {
    // When true, the COM will returns the random move
    const isDebug = false;

    // Evaluate scores for the current board for both players
    const scores = {
      O: this.getScoreMatrix(boardStatus, "O", this.scanOrigins),
      X: this.getScoreMatrix(boardStatus, "X", this.scanOrigins),
    };

    let nextMove = { row: null, col: null, compositeScore: 0 };

    // Sum the scores for O & X with weight
    scores.O.map((row, rowIndex) => {
      return row.map((col, colIndex) => {
        const compositeScore =
          col * this.disturbance + scores.X[rowIndex][colIndex];

        // Remember the square with the highest score
        if (compositeScore > nextMove.compositeScore) {
          nextMove.row = rowIndex;
          nextMove.col = colIndex;
          nextMove.compositeScore = compositeScore;
        }

        return compositeScore;
      });
    });

    if (this.winner) console.log("Winner:", this.winner);

    if (nextMove.row == null && nextMove.col == null) {
      this.winner = null;
      console.log("Draw game!");
    }

    /** for debugging: randomly choose the empty cell */
    if (isDebug) {
      const { rowIndex, colIndex } = this.getRandomMove(boardStatus);
      return { rowIndex, colIndex, winner: this.winner };
    }

    return {
      rowIndex: nextMove.row,
      colIndex: nextMove.col,
      winner: this.winner,
    };
  }

  /**
   * Return the score board for the specified player based on the current board.
   *
   * @param {Array.<Array.<"O"|"X"|"">>} boardMatrix
   *    Represents for the current board.
   * @param {string} playerSymbol
   *    "O" or "X".
   *    Declare for which player the score should be calculated.
   * @return {Array.<Array.<number>>}
   *    Score for all the squares for the player.
   */
  getScoreMatrix(boardMatrix, playerSymbol, scanOrigins) {
    // Each element in this array reprensents for
    // a score array for the single line scanned
    const squares = scanOrigins.reduce((lines, scanOrigin) => {
      // Extract a line
      const line = this.scanLine(
        boardMatrix,
        { row: scanOrigin.row, col: scanOrigin.col },
        scanOrigin.direction
      );

      return lines.concat(
        // Do template matching to the line,
        // then get the score array of squares in it
        this.matchPatterns(
          // Extract the line
          line,
          this.patterns,
          playerSymbol
        )
      );
    }, []);

    // The board with evaluated score for every square.
    // Initialize with zero-filling.
    let scoreMatrix = boardMatrix.map((row) => {
      return row.map(() => 0);
    });

    // Loop for all the scanned lines,
    // sum the scores for each square.
    squares.forEach((square) => {
      scoreMatrix[square.row][square.col] += square.score;
    });

    return scoreMatrix;
  }

  /**
   * Do multiple pattern matchings to the line,
   * return the array of accumulated scores for every square in the line
   *
   * @param {Array.<{row: number, col: number, value: string|null}>} lineSquares
   *    A line extracted. Every element represents for a square.
   *    Note that the length of this line varies; from 1 to board size.
   * @param {Array.<{binary: Array.<number>, score: Array.<number>}>} patterns
   *    pattern matching templates which were set by the class constructor
   * @param {string} playerSymbol
   *    "O" or "X".
   *    Player this function is going to calculate the score for.
   * @return {{ winner: <string|null>, squareScores: Array.<{ row: number, col: number, score: number }>}}
   *    Return the scores for squares; squre with 0 score will be eliminated.
   *    e.g.
   *      input: ["X", null, null, "O", null, "O", "O", null], symbol: "O"
   *      output: [0, 100, 1000, 2100, 0, 0, 1000]
   */
  matchPatterns(lineSquares, patterns, playerSymbol) {
    // Container of score for every square in the line
    let squareScores = [];

    // No pattern will match when input array is shorter than template
    if (lineSquares.length < this.chainLength) return squareScores;

    // Convert the symbol-based array into binary-ish array
    // e.g. ["X", "X", null, "O"] into [null, null, 0, 1] for "O"
    const lineBinary = lineSquares.map((square) => {
      switch (square.value) {
        case playerSymbol: // stone of this player
          return 1;
        case "": // empty square
          return 0;
        default:
          // stone of the opponent player
          return null;
      }
    });

    // Move the cursor position one by one
    // lineCursor is the cursor position inside the line inputted
    for (
      let lineCursor = 0;
      lineCursor < lineSquares.length - this.chainLength + 1;
      lineCursor++
    ) {
      // Try to match every pattern at this cursor position
      patterns.forEach((pattern) => {
        // Try to match every square in the pattern
        // patCursor is the cursor position inside the pattern
        for (
          let patCursor = 0;
          patCursor < pattern.binary.length;
          patCursor++
        ) {
          if (
            lineBinary[lineCursor + patCursor] !== pattern.binary[patCursor]
          ) {
            // Abort matching to this pattern when a discrepancy found
            break;
          } else {
            // When all the squares matched
            if (patCursor === this.chainLength - 1) {
              // Check if the winner is confirmed;
              if (
                // Human player wins simply when full-length stone chain is matched
                playerSymbol == "O" &&
                pattern.binary.every((binary) => binary == 1)
              ) {
                this.winner = "O";
              } else if (
                // The COM player will win when
                // there needs one more stone to win.
                playerSymbol == "X" &&
                pattern.binary.reduce((sum, binary) => sum + binary) ==
                  this.chainLength - 1
              ) {
                this.winner = "X";
              }

              // Assign the scores to the empty squares
              pattern.score.forEach((score, index) => {
                // Ignore non-empty squares
                if (score !== 0) {
                  squareScores.push({
                    row: lineSquares[lineCursor + index].row,
                    col: lineSquares[lineCursor + index].col,
                    score: score,
                  });
                }
              });
            }
          }
        }
      });
    }

    return squareScores;
  }

  /**
   * Scan a line in the board
   * from the designated point
   * toward the designated direction
   * until cursor reaches the edge of the board,
   * then return all the values in the line
   *
   * @param {Array.<Array.<string|null>>} boardMatrix
   *  2D matrix of the game board with symbols of "O", "X", or "null"
   * @param {{row: number, col: number}} origin
   *  Position of the starting square of the each scan.
   * @param {string} direction
   *  Direction of the scan.
   *  Either of "right", "down", "lowerRight", "upperRight"
   * @return {Array.<{row: number, col: number, value: <string|null>}>}
   *  Coordinates & values of the squares in the line
   */
  scanLine(boardMatrix, origin, direction) {
    var cursor = {
      row: origin.row,
      col: origin.col,
    };

    // Container of position & value of each square (O, X, null)
    var lineScanned = [];

    // Acquire the square content in the line one by one
    // until the cursor reaches the edge
    let hasReachedEdge = false;
    while (!hasReachedEdge) {
      // Acquire the square content
      lineScanned.push({
        row: cursor.row,
        col: cursor.col,
        value: boardMatrix[cursor.row][cursor.col],
      });

      switch (direction) {
        case "right":
          // When reached the right edge
          if (cursor.col === this.boardSize - 1) hasReachedEdge = true;
          else cursor.col++;
          break;

        case "down":
          // When reached the bottom edge
          if (cursor.row === this.boardSize - 1) hasReachedEdge = true;
          else cursor.row++;
          break;

        case "lowerRight":
          // When reached the bottom edge or right edge
          if (
            cursor.row === this.boardSize - 1 ||
            cursor.col === this.boardSize - 1
          )
            hasReachedEdge = true;
          else {
            cursor.row++;
            cursor.col++;
          }
          break;

        case "upperRight":
          // When reached the upper edge or right edge
          if (cursor.row === 0 || cursor.col === this.boardSize - 1)
            hasReachedEdge = true;
          else {
            cursor.row--;
            cursor.col++;
          }
          break;

        default:
          console.error("Error: unknown direction '", direction, "'");
          return null;
      }
    }

    return lineScanned;
  }
}

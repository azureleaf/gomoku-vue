export default class Brain {
  constructor(boardStatus, boardSize, chainLength) {
    this.boardStatus = boardStatus;
    this.boardSize = boardSize;
    this.chainLength = chainLength;
    this.patterns = this.setPatterns();
  }

  /**
   * Generate patterns to be used in the template matching later.
   * Called from the constructor only.
   * e.g.
   *    When a player needs 3 stone chains to win,
   *    there're 2*2*2 = 8 pattern varieties
   */
  setPatterns() {
    // Create empty container array
    let patterns = new Array(Math.pow(2, this.chainLength)).fill(null);

    for (let i = 0; i < patterns.length; i++) {
      let patternArr = this.getBinaryArray(i, this.chainLength);
      let scoreArr = this.getScoreArray([...patternArr]);

      patterns[i] = {
        pattern: [...patternArr],
        score: [...scoreArr],
      };
    }

    /**
     * Sort patterns to avoid unnecessary matching.
     * e.g.
     *   When [11010] matches, furtherly matching [10000], [11000] is redundant,
     *   because they always matches in that case.
     *   Therefore, put [11010] prior to [10000], [11000],
     *   and when [11010] is matched, abort matching to latter patterns.
     */
    return this.sortPatterns(patterns);
  }

  /**
   * Sort patterns
   * Patterns with more "1" will be put first
   * @param {Array.<Object>} patterns
   * @return {Array.<Object>}
   */
  sortPatterns(patterns) {
    return patterns.sort((a, b) => {
      // Put the array with more "1" before others
      return (
        b.pattern.reduce((sum, num) => {
          return sum + num;
        }) -
        a.pattern.reduce((sum, num) => {
          return sum + num;
        })
      );
    });
  }

  /**
   * Convert position array into score array based on patterns
   * Every blank cell shares the same score
   *
   * @param {Array.<number>} array
   *  1: Position of the stones
   *  0: Empty
   * @return {Array.<number>}
   *
   * e.g.
   *  [1, 0, 0, 1, 0, 0] => [0, 100, 100, 0, 100, 100]
   *  High score means recommended position to put stone in the next move
   */
  getScoreArray(array) {
    let stoneCounter = 0;

    // Sum the number of stones included in the pattern
    for (let i = 0; i < array.length; i++) stoneCounter += array[i];

    // Convert position pattern into evaluation pattern
    for (let i = 0; i < array.length; i++) {
      if (array[i] === 0) array[i] = Math.pow(10, stoneCounter);
      else if (array[i] === 1) array[i] = 0;
      else console.log("Error: unknown symbol in the pattern: ", array[i]);
    }
    return array;
  }

  /**
   * Convert a decimal number into binary array.
   *
   * @param {number} decimal
   *    Decimal number to be converted to binary number
   * @param {number} arrayLength
   *    Length of the array to be returned
   * @return {Array.<number>}
   *    Array of the binary number with blank digits filled with 0
   *
   * Unused upper digit will be filled with 0.
   *    e.g.
   *      5 => 101 => [0, 0, 1, 0, 1]
   */
  getBinaryArray(decimal, arrayLength) {
    var strBinary = decimal.toString(2);

    // Fill zero to the blank digit
    for (let i = 0; i < arrayLength - strBinary.length; i++) {
      strBinary = "0" + strBinary;
    }

    // Define temporary array to return
    var array = new Array(arrayLength).fill(0);
    for (let i = 0; i < arrayLength; i++) {
      array[i] = Number(strBinary[i]);
    }
    return array;
  }

  /**
   * Pick one empty square from the current board randomly (for debug)
   * @param {Array.<Array.<"O"|"X"|"">>} boardStatus Represents for current board
   * @return {{ rowIndex: number, colIndex: number}} Next COM move
   */
  getRandomMove(boardStatus) {
    // List of coords of all the empty squares
    let emptySquares = [];
    boardStatus.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col == "")
          emptySquares.push({
            rowIndex: rowIndex,
            colIndex: colIndex,
          });
      });
    });
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[randomIndex];
  }

  /**
   * Entry function for all the next move calculations
   * @param {Array.<Array.<"O"|"X"|"">>} boardStatus Represents for current board
   * @param {boolean} isOsTurn Tells if the next player is "O"
   * @return {{ rowIndex: number, colIndex: number}} Next COM move
   */
  getNextMove(boardMatrix, isOsTurn) {
    console.log("getNextMove() is called.:", boardMatrix, isOsTurn);
  }

  /**
   * Get the current board, return the score board for the specified player
   * @param {Array.<Array.<"O"|"X"|"">>} boardMatrix
   *    Represents for the current board
   * @param {boolean} isOsTurn
   *    Tells for which player the score should be calculated
   * @return {Array.<Array.<number>>}
   *    Score for the player specified as a param ???
   */
  getScoreMatrix(boardMatrix, isOsTurn) {
    // Origins & Directions of all the scans
    let scanOrigins = [];

    // Origins: from index 0
    for (let i = 0; i < this.boardSize; i++) {
      // From the leftmost column
      scanOrigins.push({
        row: i,
        col: 0,
        direction: "R",
      });
      scanOrigins.push({
        row: i,
        col: 0,
        direction: "DR",
      });
      scanOrigins.push({
        row: i,
        col: 0,
        direction: "UR",
      });

      // From the top row
      scanOrigins.push({
        row: 0,
        col: i,
        direction: "D",
      });
    }

    // Origins: from index 1,
    // because the origins for some diagonal lines are already included in the part above
    for (let i = 1; i < this.boardSize; i++) {
      // From the top column
      scanOrigins.push({
        row: 0,
        col: i,
        direction: "DR",
      });

      // From the bottom colum,n
      scanOrigins.push({
        row: this.boardSize - 1,
        col: i,
        direction: "UR",
      });
    }

    // Each element in this array reprensents for
    // a score array for the scanned single line
    const lines = scanOrigins.reduce((lines, scanOrigin) => {
      return lines.concat(
        // Template matching to the line,
        // then get the array of squares with score
        this.matchPattern(
          // Extract the line
          this.scanLine(
            boardMatrix,
            { row: scanOrigin.row, col: scanOrigin.col },
            scanOrigin.direction
          ),
          isOsTurn
        )
      );
    }, []);

    // The board which tells the score of every square
    // Iinitialize with zero-filling
    let scoreMatrix = boardMatrix.map((row) => {
      return row.map(() => 0);
    });

    // Add scanning results square by square
    for (let i = 0; i < lines.length; i++) {
      scoreMatrix[lines[i].row][lines[i].col] += lines[i].score;
    }

    return scoreMatrix;
  }

  /**
   * @param {Array.<{row: number, col: number, value: string|null}>} singleLine
   *    A line extracted. Every element represents for a square.
   *    Note that the length of this line varies;
   *    1 is the shortest, this.chainLength is the longest.
   * @param {Array.<Object>} patterns
   *    pattern matching templates set by the class constructor
   * @param {string} symbol
   *    "O" or "X". Player this function is going to calculate the score for.
   * @return {Array.<{ row: number, col: number, score: number}>}
   *    Return the scores for every square inputted.
   *    e.g.
   *      input: ["X", null, null, "O", null, "O", "O", null], symbol: "O"
   *      output: [0, 100, 1000, 2100, 0, 0, 1000]
   */
  matchPattern(singleLine, patterns, symbol) {

    let scoreObj = [];

    // When input array is shorter than template patterns,
    //   no pattern will be matched, therefore abort the process
    if (singleLine.length < this.chainLength) return scoreObj;

    // Convert array format to the one which is compatible with pattern array
    // e.g. Given that values in singleLine are like ["X", "X", null, "O"],
    //    When "symbol" is "X", this array turns into [   1,    1, 0, null]
    //    When "symbol" is "O", this array turns into [null, null, 0,    1]

    for (let i = 0; i < singleLine.length; i++) {
      // Convert format
      switch (singleLine[i].value) {
        case symbol:
          singleLine[i].value = 1;
          break;
        case null:
          singleLine[i].value = 0;
          break;
        default:
          singleLine[i].value = null;
          break;
      }

      // Make scoreObj
      scoreObj.push({
        row: singleLine[i].row,
        col: singleLine[i].col,
        score: 0,
      });
    }

    // Move the start position of matching one by one
    // "cursor" moves inside input array
    for (
      let cursorObj = 0;
      cursorObj < singleLine.length - this.chainLength + 1;
      cursorObj++
    ) {
      // Try to match every pattern to the array
      for (let patIndex = 0; patIndex < this.patterns.length; patIndex++) {
        // Try to match every position in a pattern
        for (let cursorPat = 0; cursorPat < this.chainLength; cursorPat++) {
          // If discrepancy is found, abort matching to the remainder, then go to next pattern
          if (
            singleLine[cursorObj + cursorPat].value !==
            this.patterns[patIndex].pattern[cursorPat]
          )
            break;

          // If reached the last cell of a pattern array
          if (cursorPat === this.chainLength - 1) {
            for (let i = 0; i < scoreObj.length; i++) {
              // If that cell is blank, set score
              if (this.patterns[patIndex].pattern[i] === 0)
                scoreObj[cursorObj + i].score += \
                  this.patterns[patIndex].score[i];
            }
          }
        }
      }
    }

    return scoreObj;
  }
}

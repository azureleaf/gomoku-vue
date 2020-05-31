export default class Brain {
  constructor(boardStatus, boardSize, chainLength) {
    this.boardStatus = boardStatus;
    this.boardSize = boardSize;
    this.chainLength = chainLength;
    this.patterns = this.setPatterns();
  }

  setPatterns() {
    // Set the number of patterns here.
    // e.g.
    //    When player needs 3 stone chains to win,
    //    there're 2*2*2 = 8 pattern varieties
    let patterns = new Array(Math.pow(2, this.chainLength)).fill(null);

    for (let i = 0; i < patterns.length; i++) {
      let patternArr = this.returnBinaryArray(i, this.chainLength);
      let scoreArr = this.returnScoreArray([...patternArr]);

      patterns[i] = {
        pattern: [...patternArr],
        score: [...scoreArr],
      };
    }

    // Sort patterns to avoid unnecessary matching
    // e.g.
    // When [11010] matches, furtherly matching [10000], [11000] is redundant,
    // because they always matches in that case.
    // Therefore, put [11010] prior to [10000], [11000],
    // and when [11010] is matched, abort matching to latter patterns.
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
   * @param {Array.<int>} array
   *  1: Position of the stones
   *  0: Empty
   * @return {Array.<int>}
   *
   * e.g.
   *  [1, 0, 0, 1, 0, 0] => [0, 100, 100, 0, 100, 100]
   *  High score means recommended position to put stone in the next move
   */
  returnScoreArray(array) {
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
   * @param {int} num
   *    Decimal number to be converted to binary number
   * @param {int} arrayLength
   *    Length of the array to be returned
   * @return {Array.<int>}
   *    Array of the binary number with blank digits filled with 0
   *
   * Unused upper digit will be filled with 0.
   *    e.g.
   *      5 => 101 => [0, 0, 1, 0, 1]
   */
  returnBinaryArray(num, arrayLength) {
    var strBinary = num.toString(2);
    const strBinaryLength = strBinary.length;

    // Fill zero to the blank digit
    for (let i = 0; i < arrayLength - strBinaryLength; i++) {
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
   * Pick one empty square from the current board
   */
  getRandomMove() {
    // List of coords of all the empty squares
    let emptySquares = [];
    this.boardStatus.forEach((row, rowIndex) => {
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
}

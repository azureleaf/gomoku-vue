# gomoku-vue

- Fight against computer player with Gomoku, or five-in-a-row, a traditional Japanese game.

## ToC

- [gomoku-vue](#gomoku-vue)
  - [ToC](#toc)
  - [Project setup](#project-setup)
    - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    - [Compiles and minifies for production](#compiles-and-minifies-for-production)
    - [Run your unit tests](#run-your-unit-tests)
    - [Lints and fixes files](#lints-and-fixes-files)
    - [Customize configuration](#customize-configuration)
  - [File Hierarchy Trees](#file-hierarchy-trees)
  - [Calling Relationships of `brain.js`](#calling-relationships-of-brainjs)


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## File Hierarchy Trees

- `App.vue`
  - `Board.vue`
    - `Square.vue`
      - `SymbolO.vue` : SVG animation.
      - `SymbolX.vue` : SVG animation.
      - `svgParams.json`: Params for SVG animations.
  - `Panel.vue` : Control panel of the game UI.
- `brain.js`
  - Logic engine of the COM player.
  - Called from the Vuex mutator.
  - Get the current board, return the next move calculated.
- `store/index.js`
  - Hold the current board status which should be shared with Vue components.
- `main.js`
  - Entry point of the whole app.
  - Register Vue files & plugins.

## Calling Relationships of `brain.js`

- `getPatterns()`: Generate matching template. Called by the constructor.
  - `getScoreArray()` 
  - `getBinaryArray()`
  - `sortPatterns()`
- `getNextMove()`
  - `getScoreMatrix()` : Generate evaluated score for every square for both players.
    - `getScanOrigins()` : Generate starting points & directions of the line scans.
    - `matchPattern()` : Pattern match and return the square scores for the single line.
      - `scanLine()` : Extract the lines from the board.
- `getRandomMove()` : for debugging. Randomly find the empty square in the board.
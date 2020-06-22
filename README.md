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
  - [File Hierarchy](#file-hierarchy)
  - [Function Relationships in `brain.js`](#function-relationships-in-brainjs)

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

## File Hierarchy

- `App.vue`
  - `Board.vue`
    - `Square.vue`
      - `SymbolO.vue` : SVG animation for "O" symbol.
      - `SymbolX.vue` : SVG animation for "X" symbol.
      - `svgParams.json`: Params for SVG animations.
  - `Panel.vue` : Control panel of the game UI.
- `brain.js`
  - Logic engine of the COM player.
  - Called from the Vuex mutator.
  - Get the current board, return the next move calculated.
- `store/index.js`
  - Hold the current board status which should be shared among Vue components.
  - Keep `Brain` instance as a state.
  - `putStone()` mutator puts new stone to the board.
  - `getNextComMove()` mutator asks `Brain` the next COM move. When the `Brain` says the game winner is confirmed, this mutator sets the winner as a state.
- `main.js`
  - Entry point of the whole app.
  - Register Vue files & plugins.

## Function Relationships in `brain.js`

- `getPatterns()`: Generate matching template. Called by the constructor.
  - `getBinaryArray()` : Return matching patterns with 0 and 1.
  - `getScoreArray()` : Return the calculated score array from the binary array.
  - `sortPatterns()` : Optimize the order of the templates.
  - `getScanOrigins()` : Return starting points & directions of the line scans.
- `getNextMove()` : Return the position of the next COM player move.
  - `getScoreMatrix()` : Return evaluated score for every square for both players.
    - `matchPatterns()` : Pattern match and return the square scores for the single line.
      - `scanLine()` : Extract the content of the single line from the board.
- `getRandomMove()` : for debugging. Randomly find the empty square in the board.

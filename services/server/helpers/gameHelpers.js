const { TETRIMINO_LIMIT_CREATION_COUNT, TETRIMINO_LIST_SHAPE } = require("../constants");

function generateRandomBlockList () {
    return Array.from({length: TETRIMINO_LIMIT_CREATION_COUNT},
        () => TETRIMINO_LIST_SHAPE.charAt(Math.floor(Math.random() * TETRIMINO_LIST_SHAPE.length)));
}

module.exports = generateRandomBlockList

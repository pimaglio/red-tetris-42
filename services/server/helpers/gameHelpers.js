const { TETRIMINO_LIMIT_CREATION_COUNT } = require("../constants");

function getRandomTetriminoList () {
    const tetriminoShapeList = 'IJLOSTZ'
    let listBlocks = []
    for (let i = 0; i < TETRIMINO_LIMIT_CREATION_COUNT; i++) {
        listBlocks.push(tetriminoShapeList.charAt(Math.floor(Math.random() * tetriminoShapeList.length)))
    }
    return listBlocks
}

module.exports = getRandomTetriminoList

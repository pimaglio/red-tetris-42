const { TETRIMINO_LIMIT_CREATION_COUNT, TETRIMINO_LIST_SHAPE, GRID_HEIGHT, GRID_WIDTH } = require("../constants");

function generateRandomBlockList () {
    return Array.from({length: TETRIMINO_LIMIT_CREATION_COUNT},
        () => TETRIMINO_LIST_SHAPE.charAt(Math.floor(Math.random() * TETRIMINO_LIST_SHAPE.length)));
}

function generateRandomBlockListTest (shape) {
    return Array.from({length: TETRIMINO_LIMIT_CREATION_COUNT},
        () => shape);
}

function buildGridSpectra(grid) {
    let spectra = new Array(GRID_WIDTH).fill(GRID_HEIGHT)
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            if (grid[y][x][0] && y < spectra[x]) spectra[x] = y
        }
    }
    return spectra
}


module.exports = {
    generateRandomBlockList,
    generateRandomBlockListTest,
    buildGridSpectra
}

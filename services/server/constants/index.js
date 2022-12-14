const BLOCK_LIST_LIMIT = 10
const BLOCK_LIST_LIMIT_THRESHOLD = 10
const TETRIMINO_LIMIT_CREATION_COUNT = 300
const TETRIMINO_LIST_SHAPE = 'OIJLSTZ'
const GRID_WIDTH = 10
const GRID_HEIGHT = 20

const TETRIMINO_LIST = {
    0: {
        shape: [[0]],
        color: '0, 0, 0, 0.3',
    },
    I: {
        shape: [
            [0, 0, 0, 0],
            ['I', 'I', 'I', 'I'],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        color: '0, 181, 212',
    },
    J: {
        shape: [
            [0, 0, 'J'],
            ['J', 'J', 'J'],
            [0, 0, 0],
        ],
        color: '33, 150, 243',
    },
    L: {
        shape: [
            ['L', 0, 0],
            ['L', 'L', 'L'],
            [0, 0, 0],
        ],
        color: '255, 152, 36',
    },
    O: {
        shape: [
            ['O', 'O'],
            ['O', 'O'],
            [0, 0],
        ],
        color: '255, 193, 7',
    },
    S: {
        shape: [
            [0, 'S', 'S'],
            ['S', 'S', 0],
            [0, 0, 0],
        ],
        color: '76, 175, 1',
    },
    T: {
        shape: [
            [0, 'T', 0],
            ['T', 'T', 'T'],
            [0, 0, 0],
        ],
        color: '156, 39, 176',
    },
    Z: {
        shape: [
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
            [0, 0, 0],
        ],
        color: '255, 87, 34',
    },
}
const verbose = process.env.NODE_ENV === 'development'
module.exports = {
    GRID_WIDTH, GRID_HEIGHT, verbose, TETRIMINO_LIST_SHAPE, BLOCK_LIST_LIMIT, TETRIMINO_LIMIT_CREATION_COUNT, TETRIMINO_LIST, BLOCK_LIST_LIMIT_THRESHOLD
}

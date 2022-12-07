export const DROP_TIME = 1000
export const BLOCK_LIST_ALERT_THRESHOLD = 2
export const GRID_WIDTH = 10
export const GRID_HEIGHT = 20

export const TETRIMINO_COLLECTION = {
    0: {
        shape: [[0]],
        color: 'bg-slate-100',
    },
    I: {
        shape: [
            [0, 0, 0, 0],
            ['I', 'I', 'I', 'I'],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        color: 'bg-sky-400',
    },
    J: {
        shape: [
            [0, 0, 'J'],
            ['J', 'J', 'J'],
            [0, 0, 0],
        ],
        color: 'bg-blue-400',
    },
    L: {
        shape: [
            ['L', 0, 0],
            ['L', 'L', 'L'],
            [0, 0, 0],
        ],
        color: 'bg-orange-400',
    },
    O: {
        shape: [
            ['O', 'O'],
            ['O', 'O'],
            [0, 0],
        ],
        color: 'bg-yellow-300',
    },
    S: {
        shape: [
            [0, 'S', 'S'],
            ['S', 'S', 0],
            [0, 0, 0],
        ],
        color: 'bg-emerald-400',
    },
    T: {
        shape: [
            [0, 'T', 0],
            ['T', 'T', 'T'],
            [0, 0, 0],
        ],
        color: 'bg-purple-400',
    },
    Z: {
        shape: [
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
            [0, 0, 0],
        ],
        color: 'bg-red-400',
    },
}

export const DROP_TIME = 1000
export const BLOCK_LIST_ALERT_THRESHOLD = 2
export const GRID_WIDTH = 10
export const GRID_HEIGHT = 20

export const TETRIMINO_COLLECTION = {
    0: {
        shape: [[0]],
        //color: 'bg-slate-100/[.03]',
        color: 'bg-background',
    },
    I: {
        shape: [
            [0, 0, 0, 0],
            ['I', 'I', 'I', 'I'],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        color: 'bg-sky-300',
    },
    J: {
        shape: [
            ['J', 0, 0],
            ['J', 'J', 'J'],
            [0, 0, 0],
        ],
        color: 'bg-blue-500',

    },
    L: {
        shape: [
            [0, 0, 'L'],
            ['L', 'L', 'L'],
            [0, 0, 0],
        ],
        color: 'bg-orange-400',
    },
    O: {
        shape: [
            [0, 'O', 'O', 0],
            [0, 'O', 'O', 0],
            [0, 0, 0 , 0],
        ],
        color: 'bg-yellow-400',
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
        color: 'bg-purple-300',
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

export const TEST_GRID_FULL = [[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["S","clear"],["S","clear"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["S","clear"],["S","clear"],["L","merged"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["L","merged"],["L","merged"],["L","merged"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["S","merged"],["S","merged"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["S","merged"],["S","merged"],[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["T","merged"],[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["T","merged"],["T","merged"],["T","merged"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],["I","merged"],["I","merged"],["I","merged"],["I","merged"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["L","merged"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["L","merged"],["L","merged"],["L","merged"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["L","merged"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["L","merged"],["L","merged"],["L","merged"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["Z","merged"],["Z","merged"],[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["Z","merged"],["Z","merged"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["L","merged"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["L","merged"],["L","merged"],["L","merged"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["O","merged"],["O","merged"],[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["O","merged"],["O","merged"],[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["S","merged"],["S","merged"],[0,"clear"],[0,"clear"],[0,"clear"]],[[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"],["S","merged"],["S","merged"],[0,"clear"],[0,"clear"],[0,"clear"],[0,"clear"]]]

export const GAME_RESULT_LIST = {
    '': {
        text: 'In progress',
        color: 'bg-slate-100/[.06]',
        textColor: 'text-slate-100'
    },
    'loser': {
        text: 'Lost',
        color: 'bg-red-500/[.1]',
        textColor: 'text-red-700'
    },
    'winner': {
        text: 'Winner',
        color: 'bg-green-400/[.06]',
        textColor: 'text-green-700'
    },
}

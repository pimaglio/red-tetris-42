// constants
import { GRID_HEIGHT, GRID_WIDTH, TETRIMINO_COLLECTION } from "../constants/gameConstants.js";

// ----------------------------------------------------------------------


export const buildBlock = ( blockShape) => {
    const block = TETRIMINO_COLLECTION[blockShape]
    return ({
        pos: { x: Math.round((GRID_WIDTH - block.shape[0].length) / 2), y: 0 },
        tetrimino: block.shape,
        shape: blockShape,
        collided: false,
    })
}
export const createGrid = () =>
    Array.from(Array(GRID_HEIGHT), () => Array(GRID_WIDTH).fill([0, 'clear']))

export const createGridTest = (gridType) => {
    switch (gridType) {
        case 'completeLine': {
            let grid = Array.from(Array(GRID_HEIGHT - 1), () => Array(GRID_WIDTH).fill([0, 'clear']))
            grid.push(new Array(GRID_WIDTH).fill(['O', 'merged']))
            return grid
        }
        default: return Array.from(Array(GRID_HEIGHT), () => Array(GRID_WIDTH).fill([0, 'clear']))
    }
}

const checkAndCleanCompleteLine = (newRow, callback) =>
    newRow.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
            callback('CLEAN LINE')
            ack.unshift(new Array(newRow[0].length).fill([0, 'clear']));
            return ack;
        }
        ack.push(row);
        return ack;
    }, []);

export const addGridPenaltyLine = (grid, currentBlock) => {
    let newGrid = JSON.parse(JSON.stringify(grid))
    let columnIndex = newGrid.length - 1
    if (currentBlock.collided) newGrid.shift()
    else while (columnIndex > -1 && !newGrid[columnIndex].every(cell => cell[0] === 0 && cell[1] === 'clear')) columnIndex--
    if (columnIndex > -1) {
        newGrid.slice(columnIndex, 1)
        newGrid.push(Array.from({length: GRID_WIDTH}, () => [0, 'penalty']))
        return newGrid
    }
    else return false
}

export const getHardDropPosition = (currentBlock, grid) => {
    let y = currentBlock.pos.y
    while (!checkCollision({...currentBlock, pos: {...currentBlock.pos, y}}, grid, { x: 0, y: 1 })) {
        y++
    }
    return y - currentBlock.pos.y
}

export const checkCollision = (block, grid, { x: moveX, y: moveY }) => {
    for (let y = 0; y < block.tetrimino.length; y += 1) {
        for (let x = 0; x < block.tetrimino[y].length; x += 1) {
            if (block.tetrimino[y][x] !== 0) {
                if (!grid[y + block.pos.y + moveY]) return 'end'
                else if (!grid[y + block.pos.y + moveY][x + block.pos.x + moveX]) return 'out'
                else if (grid[y + block.pos.y + moveY][x + block.pos.x + moveX][1] !== 'clear') return 'tetrimino'
            }
        }
    }
    return false
}

export const buildNewGrid = (grid, blockList, callback) => {
    // First flush the stage
    const newGrid = grid.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));

    // const getPrediction = () => {
    //   let newBlock = JSON.parse(JSON.stringify(block))
    //   if (newBlock.tetrimino[0][1]) {
    //     let pos = 0
    //     while (!checkCollision(newBlock, grid, { x: 0, y: 1 })) {
    //       newBlock.pos.y += 1
    //       pos++
    //     }
    //     return { x: 0, y: pos }
    //   } else return false
    // }
    //
    // const predict = getPrediction()

    let needCheckCompleteLine = false

    for (let block of blockList) {
        if (block.tetrimino) {
            for (let i = 0; i < block.tetrimino.length; i++) {
                for (let j = 0; j < block.tetrimino[i].length; j++) {
                    if (block.collided) needCheckCompleteLine = true
                    if (block.tetrimino[i][j] !== 0) {
                        newGrid[i + block.pos.y][j + block.pos.x] = [
                            block.tetrimino[i][j],
                            `${block.collided ? 'merged' : 'clear'}`
                        ];
                        // if (predict && !block.collided && predict.y > 1) {
                        //   newGrid[i + predict.y + block.pos.y][j + block.pos.x] = [
                        //     block.tetrimino[i][j],
                        //     'clear',
                        //   ]
                        // }
                    }
                }
            }
        }
    }



    if (needCheckCompleteLine) {
        return checkAndCleanCompleteLine(newGrid, callback)
    }

    return newGrid
};

function rotate(matrix, dir) {
    // Make the rows to become cols (transpose)
    const mtrx = matrix.map((_, index) => matrix.map(column => column[index]))
    // Reverse each row to get a rotaded matrix
    if (dir > 0) return mtrx.map(row => row.reverse())
    return mtrx.reverse()
}

export const rotateBlock = (grid, block) => {
    const dir = 1
    const newBlock = JSON.parse(JSON.stringify(block))
    newBlock.tetrimino = rotate(newBlock.tetrimino, dir)

    const pos = newBlock.pos.x
    let offset = 1
    while (checkCollision(newBlock, grid, { x: 0, y: 0 })) {
        newBlock.pos.x += offset
        offset = -(offset + (offset > 0 ? 1 : -1))
        if (offset > newBlock.tetrimino[0].length) {
            rotate(newBlock.tetrimino, -dir)
            newBlock.pos.x = pos
            return
        }
    }

    return newBlock
}

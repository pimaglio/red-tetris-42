// helpers
const { generateRandomBlockListTest, generateRandomBlockList } = require("../helpers/gameHelpers");
// constants
const { BLOCK_LIST_LIMIT } = require("../constants");

// ----------------------------------------------------------------------

class Piece {
    static createBlockList() {
        const gameBlockList = generateRandomBlockList()
        return ({ gameBlockList, playerBlockList: gameBlockList.slice(0, BLOCK_LIST_LIMIT) })
    }
}

module.exports = Piece

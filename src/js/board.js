export default class Board {
    /**
     * Initialize empty game board
     * @param {number} sizeX number of X-axis cells
     * @param {number} sizeY number of Y-axis cells
     */
    constructor(sizeX, sizeY) {
        this._board = [];
        for (let i = 0; i < sizeY; i++) {
            this._board.push(Array(sizeX).fill('*'));
        }
    }
}
import Ship from './ship';

const shipLengths = [4, 4, 5];
const totalShipPoints = shipLengths.reduce((total, shipLength) => total + shipLength);

/**
 * Checks if any of the coordinates is occupied by existing ship
 * @param {Array} positions sequence of ship's coordinates
 * @param {Array} ships existing ships on the board
 * @returns {boolean} is there a coordinates intersection
 */
function checkForCollision(positions, ships) {
    let result = ships.some(ship => positions.some(position => ship.positions.indexOf(position) > -1));

    return result;
}

/**
 * Generates sequence of coordinates where the ship should be positioned
 * @param {number} shipLength number of squares occupied by the ship
 * @returns {Array} sequence of coordinates marking the ship's position
 */
function generateShipPositions(shipLength) {
    let direction = Math.floor(Math.random() * 2);
    let shipPositions = [];
    let row, col;

    if (direction >= 1) {
        /* Horizontal positioning of the ship */
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * (10 - shipLength + 1));
    } else {
        /* Vertical positioning of the ship */
        row = Math.floor(Math.random() * (10 - shipLength + 1));
        col = Math.floor(Math.random() * 10);
    }

    for (let i = 0; i < shipLength; i++) {
        if (direction >= 1) {
            shipPositions.push(row + ";" + (col + i));
        } else {
            shipPositions.push((row + i) + ";" + col);
        }
    }
    console.log(`New Ship Locations: ${shipPositions}`);
    return shipPositions;
}

/**
 * Check if passed coordinates are valid
 * @param {Array} arrayCoordinates array of coordinates, e.g. [X , Y]
 * @returns {boolean}
 */
function validateCoordinates(arrayCoordinates) {
    if (arrayCoordinates.length !== 2) {
        return false;
    }
    if (!/\d+/.test(arrayCoordinates[0]) || !/\d+/.test(arrayCoordinates[1])) {
        return false;
    }
    if (parseInt(arrayCoordinates[0]) < 0 || parseInt(arrayCoordinates[0]) > 9) {
        return false;
    }
    if (parseInt(arrayCoordinates[1]) < 0 || parseInt(arrayCoordinates[1]) > 9) {
        return false;
    }

    return (parseInt(arrayCoordinates[1]) > -1 && parseInt(arrayCoordinates[1]) < 10);
}

export default class Board {
    /**
     * Initialize empty game board
     * @param {number} sizeX number of X-axis cells
     * @param {number} sizeY number of Y-axis cells
     */
    constructor() {
        this._board = [];
        this._shotsFired = 0;
        this._hitsCount = 0;
        for (let i = 0; i < 10; i++) {
            this._board.push(Array(10).fill('*'));
        }
        this._ships = [];
    }

    /**
     * Adds a new ship to the board
     */
    addShips() {
        let positions;
        shipLengths.forEach(shipLength => {
            do {
                positions = generateShipPositions(shipLength);
            } while (checkForCollision(positions, this._ships) || positions.length !== shipLength);
            this._ships.push(new Ship(shipLength, positions));
        });
    }

    /**
     * Simulates firing at position providing zero-based coordinates, semi-colon separated (X;Y).
     * If valid coordinates -> increments shots counter and if hit increments hit counter.
     * If all ships are sunk -> no more shots are registered
     * @param {string} strCoordinates semi-colon separated coordinates (e.g. 0;9)
     * @returns {boolean} returns true if ship is hit, otherwise false
     */
    fire(strCoordinates) {
        let result = false;
        let arrayCoordinates = strCoordinates.split(';');
        if (!validateCoordinates(arrayCoordinates) || this._hitsCount < totalShipPoints) {
            return result;
        }
        this._shotsFired++;
        result = this._ships.some(ship => ship.positions.indexOf(strCoordinates) > -1);
        if (result) {
            this._board[parseInt(arrayCoordinates[0])][parseInt(arrayCoordinates[1])] = 'X';
            this._hitsCount++;
        } else {
            this._board[parseInt(arrayCoordinates[0])][parseInt(arrayCoordinates[1])] = '-';
        }

        return result;
    }

    /**
     * Checks if all ships are sunk
     * @returns {boolean}
     */
    allShipsSunk() {
        return (this._hitsCount >= totalShipPoints);
    }

    get shotsFired() {
        return this._shotsFired;
    }

    get grid() {
        return this._board;
    }
}
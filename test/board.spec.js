import assert from 'assert';
import Board from '../src/js/board';
import Ship from '../src/js/ship';

let board;

describe('Board', function () {

    this.beforeEach(() => {
        board = new Board();
    })

    this.afterEach(() => {
        board = null;
    })

    it('test - board created', () => {
        assert(board._ships.length > 0);
        assert.equal(board._board.length, 10);
        assert.equal(board._board[0].length, 10);
    })

    it('test - fire at fake coordinates', () => {
        assert.equal(board.fire('A;A'), false);
    })

    it('test - all ships are sunk', () => {
        board._hitsCount = 14;
        assert.equal(board.allShipsSunk(), true);
    })

    it('test - simulate sinking all ships', () => {
        board._ships = [
            new Ship(4, ['0;0', '0;1', '0;2', '0;3']),
            new Ship(4, ['1;0', '1;1', '1;2', '1;3']),
            new Ship(4, ['2;0', '2;1', '2;2', '2;3', '2;4'])
        ];
        board.fire('0;0');
        board.fire('0;1');
        board.fire('0;2');
        board.fire('0;3');
        board.fire('1;0');
        board.fire('1;1');
        board.fire('1;2');
        board.fire('1;3');
        board.fire('2;0');
        board.fire('2;1');
        board.fire('2;2');
        board.fire('2;3');
        board.fire('2;4');
        assert.equal(board.allShipsSunk(), true);
    })

    it('test - is ship position check', () => {
        board._ships = [
            new Ship(4, ['0;0', '0;1', '0;2', '0;3'])
        ];
        assert.equal(board.isShipPosition('0;0'), true);
        assert.equal(board.isShipPosition('9;9'), false);
    })
})
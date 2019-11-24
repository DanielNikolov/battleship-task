import assert from 'assert';
import Ship from '../src/js/ship';

let ship;

describe('Ship', function () {
    this.beforeEach(() => {
        ship = new Ship(4, ['0;0', '0;1', '0;2', '0;3']);
    })

    this.afterEach(() => {
        ship = null;
    })

    it('test - check mark and hit', () => {
        assert.equal(ship.checkAndMarkHit('0;9'), false);
        assert.equal(ship.checkAndMarkHit('0;0'), true);
        assert.equal(ship.checkAndMarkHit('0;0'), false);
    })
})
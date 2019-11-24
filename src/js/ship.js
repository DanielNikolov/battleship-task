export default class Ship {
    constructor(shipSize, shipPositins) {
        this._shipSize = shipSize;
        this._positions = shipPositins;
        this._hits = [];
    }

    checkAndMarkHit(coordinates) {
        if (this._positions.indexOf(coordinates) < 0 || this._hits.indexOf(coordinates) > -1) {
            return false;
        }
        this._hits.push(coordinates);
        return true;
    }

    get positions() {
        return this._positions;
    }

    get shipSize() {
        return this._shipSize;
    }
}
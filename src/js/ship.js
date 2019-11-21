export default class Ship {
    constructor(shipSize, shipPositins) {
        this._shipSize = shipSize;
        this._positions = shipPositins;
    }

    get positions() {
        return this._positions;
    }

    get shipSize() {
        return this._shipSize;
    }
}
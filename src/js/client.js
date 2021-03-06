import Board from './board';

window.board = new Board();

const validateCoordinates = (coordinates) => {
    if (!coordinates || coordinates.length < 2) {
        return false;
    }
    if (coordinates.toUpperCase() === 'SHOW') {
        return true;
    }
    let regexResult = coordinates.substring(0, 1).match(/[a-jA-J]{1}/g);
    if (!regexResult || regexResult.length > 1) {
        return false;
    }
    const result = coordinates.substring(1).match(/[0-9]{1,2}/g);
    return (result && result.length > 0);
}

const convertCoordinates = (coordinates) => {
    const pointX = coordinates.substring(0, 1).toUpperCase().charCodeAt(0) - 65;
    const pointY = parseInt(coordinates.substring(1)) - 1;
    return `${pointX};${pointY}`;
}

function fireButtonHandler() {
    const selectorInputValue = document.getElementsByClassName('container__selector')[0].getElementsByTagName('input')[0].value;
    if (!validateCoordinates(selectorInputValue)) {
        return;
    }
    let cheatMode = (selectorInputValue.toUpperCase() === 'SHOW');
    if (!cheatMode) {
        let coordinates = convertCoordinates(selectorInputValue);
        let fireStatus = window.board.fire(coordinates);
        let fireStatusMsg = fireStatus ? '*** Hit ***' : '*** Miss ***';
        if (fireStatus && window.board.allShipsSunk()) {
            document.getElementsByClassName('container__selector')[0].remove();
            document.getElementsByClassName('container__endgame')[0].innerText = `Well done! You completed the game in ${window.board.shotsFired} shots`;
            fireStatusMsg = '*** Sunk ***'
        }
        document.getElementsByClassName('container__status')[0].innerText = fireStatusMsg;
    }
    printGameGrid(cheatMode);
}

function textInputHandler(e) {
    if (e.keyCode === 13) {
        fireButtonHandler();
    }
}

const resetGrid = () => {
    Array.from(document.getElementsByClassName('container__board__value')).forEach(element => element.remove());
    Array.from(document.getElementsByClassName('js-grid-row')).forEach(element => element.remove());
}

const printHeader = (container) => {
    Array.from(Array(11).keys()).forEach((headerValue) => {
        let headerValueDiv = document.createElement('div');
        headerValueDiv.classList.add('container__board__value', 'text-center');
        headerValueDiv.innerText = headerValue > 0 ? headerValue : ' ';
        container.appendChild(headerValueDiv);
    });
}
const printBoard = (container, cheatMode) => {
    window.board.grid.forEach((element, index) => {
        const rowElement = document.createElement('div');
        const rowIndex = index;
        rowElement.classList.add('row', 'col-12', 'js-grid-row');
        const columnElement = document.createElement('div');
        columnElement.classList.add('container__board__value', 'text-center');
        columnElement.innerText = String.fromCharCode(65 + index);
        rowElement.appendChild(columnElement);
        element.forEach((square, index) => {
            const boardElement = document.createElement('div');
            boardElement.classList.add('container__board__value', 'text-center');
            if (cheatMode) {
                boardElement.innerText = window.board.isShipPosition(`${rowIndex};${index}`) ? 'X' : '';
            } else {
                boardElement.innerText = square;
            }
            rowElement.appendChild(boardElement);
        })
        container.appendChild(rowElement);
    })
}

const printGameGrid = (cheatMode) => {
    resetGrid();
    printHeader(document.getElementsByClassName('container__board__header')[0]);
    printBoard(document.getElementsByClassName('container__board')[0], cheatMode);
}

let initEvents = () => {
    const selectorBtn = document.getElementsByClassName('container__selector')[0].getElementsByTagName('button')[0];
    selectorBtn.addEventListener('click', fireButtonHandler);
    const inputField = document.getElementsByClassName('container__selector')[0].getElementsByTagName('input')[0];
    inputField.addEventListener('keypress', textInputHandler);
}

window.onload = () => {
    printGameGrid(false);
    initEvents();
}
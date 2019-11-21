import Board from './board';

window.board = new Board();

let printBoard = (container) => {
    console.log(window.board.grid);
    window.board.grid.forEach((element, index) => {
        let span = document.createElement('span');
        span.classList.add('row', 'col-12');
        console.log(`Element: ${element}`);
        span.innerText = `${String.fromCharCode(65 + index)} ${element.join(' ')}`;
        container.appendChild(span);
    })
}

window.onload = () => {
    let spanHeader = document.getElementsByClassName('container__header')[0];
    spanHeader.innerText = ' ' + Array.from(Array(10).keys()).map(element => element + 1).join(' ');
    printBoard(document.getElementsByClassName('container__board')[0]);
}
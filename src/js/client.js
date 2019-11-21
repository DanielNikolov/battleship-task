import Board from './board';

window.board = new Board();

const header = " " + Array.from(Array(10).keys()).map(element => element + 1).join(" ");
window.onload = () => {
    let gameBoard = window.board.gameBoard;
}
const columns = 7;
const rows = 6;
const board = Array.from(Array(rows), () => Array(columns).fill(null));
let currentPlayer = 'red';

const createBoard = () => {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            gameBoard.appendChild(cell);
        }
    }
};

const checkWinner = () => {
    const checkDirection = (row, col, dr, dc) => {
        let count = 0;
        let r = row;
        let c = col;
        while (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === currentPlayer) {
            count++;
            r += dr;
            c += dc;
        }
        return count;
    };

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === currentPlayer) {
                if (checkDirection(r, c, 1, 0) + checkDirection(r, c, -1, 0) - 1 >= 4 ||
                    checkDirection(r, c, 0, 1) + checkDirection(r, c, 0, -1) - 1 >= 4 ||
                    checkDirection(r, c, 1, 1) + checkDirection(r, c, -1, -1) - 1 >= 4 ||
                    checkDirection(r, c, 1, -1) + checkDirection(r, c, -1, 1) - 1 >= 4) {
                    return currentPlayer;
                }
            }
        }
    }
    return null;
};

const handleClick = (event) => {
    if (!event.target.classList.contains('cell')) return;

    const col = parseInt(event.target.dataset.col);
    for (let row = rows - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            cell.classList.add(currentPlayer);
            const winner = checkWinner();
            if (winner) {
                alert(`${winner.toUpperCase()} Wins!`);
                return;
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            break;
        }
    }
};

const resetGame = () => {
    board.forEach(row => row.fill(null));
    currentPlayer = 'red';
    document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('red', 'yellow'));
};

createBoard();
document.getElementById('game-board').addEventListener('click', handleClick);
document.getElementById('reset-button').addEventListener('click', resetGame);

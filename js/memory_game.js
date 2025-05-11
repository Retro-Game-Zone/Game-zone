const board = document.getElementById('gameBoard');
const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');
const restartButton = document.getElementById('restartButton');
const fullscreenButton = document.getElementById('fullscreenButton');

const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardValues, ...cardValues];
cards = cards.sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let seconds = 0;
let timerInterval = null;

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    return card;
}

function initializeBoard() {
    cards.forEach(value => {
        const card = createCard(value);
        board.appendChild(card);
    });
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        timerDisplay.textContent = seconds;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add('flipped');
    this.textContent = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    movesDisplay.textContent = moves;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;
    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
    // Check if all cards are matched
    if (document.querySelectorAll('.card.matched').length === cards.length) {
        stopTimer();
        alert("Wohooo!! You won!");
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function restartGame() {
    board.innerHTML = '';
    cards = [...cardValues, ...cardValues];
    cards = cards.sort(() => Math.random() - 0.5);
    initializeBoard();
    moves = 0;
    seconds = 0;
    movesDisplay.textContent = moves;
    timerDisplay.textContent = seconds;
    stopTimer();
    startTimer();
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        board.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
        fullscreenButton.textContent = "Exit Fullscreen";
    } else {
        document.exitFullscreen();
        fullscreenButton.textContent = "Go Fullscreen";
    }
}

restartButton.addEventListener('click', restartGame);
fullscreenButton.addEvent
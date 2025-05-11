const tiles = document.querySelectorAll('.tile');
const startButton = document.getElementById('start-button');
let sequence = [];
let playerSequence = [];
let level = 0;

function playSound(color) {
  const sound = new Audio(
    `https://s3.amazonaws.com/freecodecamp/simonSound${
      ['red', 'blue', 'green', 'yellow'].indexOf(color) + 1
    }.mp3`
  );
  sound.play();
}

function flashTile(color) {
  const tile = document.querySelector(`.tile.${color}`);
  tile.style.opacity = '1';
  playSound(color);
  setTimeout(() => {
    tile.style.opacity = '0.8';
  }, 500);
}

function nextSequence() {
  const colors = ['red', 'blue', 'green', 'yellow'];
  const randomColor = colors[Math.floor(Math.random() * 4)];
  sequence.push(randomColor);
  playSequence();
}

function playSequence() {
  let delay = 0;
  sequence.forEach((color) => {
    setTimeout(() => {
      flashTile(color);
    }, delay);
    delay += 1000;
  });
}

function checkPlayerInput() {
  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== sequence[i]) {
      alert(`Game Over! You reached level ${level}.`);
      resetGame();
      return;
    }
  }
  if (playerSequence.length === sequence.length) {
    level++;
    playerSequence = [];
    setTimeout(nextSequence, 1000);
  }
}

function resetGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  startButton.disabled = false;
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  level = 1;
  sequence = [];
  playerSequence = [];
  nextSequence();
});

tiles.forEach((tile) => {
  tile.addEventListener('click', () => {
    if (startButton.disabled) {
      const color = tile.dataset.color;
      playSound(color);
      playerSequence.push(color);
      checkPlayerInput();
    }
  });
});

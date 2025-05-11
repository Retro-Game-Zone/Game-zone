// Get game elements
const gameArea = document.getElementById("gameArea");
const paddle = document.getElementById("paddle");
const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const timerInput = document.getElementById("timer");
const startGameBtn = document.getElementById("startGame");

let score = 0;
let timer = 60; // Default: 1 minute
let ballSpeed = 3;
let gameInterval, timerInterval;

// Ball position and direction
let ballX = Math.random() * (gameArea.offsetWidth - ball.offsetWidth);
let ballY = 0;
let ballDirectionY = 1; // 1 for down, -1 for up
let ballDirectionX = 1; // 1 for right, -1 for left

// Paddle position
let paddleX = (gameArea.offsetWidth - paddle.offsetWidth) / 2;
paddle.style.left = `${paddleX}px`;

// Paddle movement using keyboard
document.addEventListener("keydown", (e) => {
  const paddleSpeed = 10;
  if (e.key === "ArrowLeft") {
    paddleX = Math.max(0, paddleX - paddleSpeed); // Move left
  } else if (e.key === "ArrowRight") {
    paddleX = Math.min(
      gameArea.offsetWidth - paddle.offsetWidth,
      paddleX + paddleSpeed
    ); // Move right
  }
  paddle.style.left = `${paddleX}px`;
});

// Ball and paddle movement
function moveBall() {
  const gameWidth = gameArea.offsetWidth;
  const gameHeight = gameArea.offsetHeight;

  // Update ball position
  ballY += ballSpeed * ballDirectionY;
  ballX += ballSpeed * ballDirectionX;

  // Ball bounces off the walls
  if (ballX <= 0 || ballX >= gameWidth - ball.offsetWidth) {
    ballDirectionX *= -1; // Reverse horizontal direction
  }
  if (ballY <= 0) {
    ballDirectionY = 1; // Reverse vertical direction (downward)
  }

  // Check if the ball hits the paddle
  const paddleY = paddle.offsetTop;
  if (
    ballY + ball.offsetHeight >= paddleY && // Ball touches paddle vertically
    ballX + ball.offsetWidth >= paddleX && // Ball within paddle's width
    ballX <= paddleX + paddle.offsetWidth
  ) {
    ballDirectionY = -1; // Reverse vertical direction (upward)
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  }

  // Ball falls below paddle (missed)
  if (ballY > gameHeight - ball.offsetHeight) {
    resetBall();
  }

  // Update ball position
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
}

// Reset ball to the top
function resetBall() {
  ballX = Math.random() * (gameArea.offsetWidth - ball.offsetWidth);
  ballY = 0;
  ballDirectionY = 1; // Reset to downward movement
}

// Timer countdown
function startTimer(duration) {
  let remainingTime = duration;
  timerInterval = setInterval(() => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timeDisplay.textContent = `Time: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      clearInterval(gameInterval);
      endGame();
    }
    remainingTime--;
  }, 1000);
}

// Start the game
function startGame() {
  score = 0;
  ballSpeed = 3;
  scoreDisplay.textContent = `Score: ${score}`;
  timer = parseInt(timerInput.value); // Get selected value in seconds
  startTimer(timer);

  resetBall();
  gameInterval = setInterval(moveBall, 20);
}

// End game and show results
function endGame() {
  alert(`Time's up! Your score: ${score}`);
  saveScore(score);
}

// Save and compare scores
function saveScore(currentScore) {
  const previousScores = JSON.parse(localStorage.getItem("catchBallScores")) || [];
  previousScores.push(currentScore);
  localStorage.setItem("catchBallScores", JSON.stringify(previousScores));

  // Show all previous scores
  console.log("Previous Scores:", previousScores);
}

// Attach event listener to start game button
startGameBtn.addEventListener("click", startGame); 

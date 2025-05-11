// Selecting elements
const meru = document.getElementById("meru");
const meteor = document.getElementById("meteor");
const restartButton = document.getElementById("restartButton");
const scoreDisplay = document.getElementById("score");

// State variables
let isJumping = false;
let isGameOver = false;
let score = 0;

// Adding jump functionality
document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !isJumping && !isGameOver) {
        jump();
    }
});

function jump() {
    isJumping = true;
    let position = 0;

    const upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            const downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 5;
                    meru.style.bottom = position + "px";
                }
            }, 20);
        } else {
            position += 5;
            meru.style.bottom = position + "px";
        }
    }, 20);
}

// Moving the meteor and collision detection
function moveMeteor() {
    let meteorPosition = 1000;

    const meteorInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(meteorInterval);
            return;
        }

        if (meteorPosition < -100) {
            meteorPosition = 1000;
            score++;
            scoreDisplay.textContent = score;
        } else if (
            meteorPosition > 50 &&
            meteorPosition < 130 &&
            parseInt(meru.style.bottom) < 50
        ) {
            clearInterval(meteorInterval);
            isGameOver = true;
            alert("Game Over! Try again.");
        } else {
            meteorPosition -= 10;
            meteor.style.left = meteorPosition + "px";
        }
    }, 20);
}

// Start meteor movement
moveMeteor();

// Restart functionality
restartButton.addEventListener("click", () => {
    // Reset game state
    meru.style.bottom = "0px";
    isGameOver = false;
    score = 0;
    scoreDisplay.textContent = score;

    // Restart meteor movement
    moveMeteor();
});

const startButton = document.getElementById("start-btn");
const statusMessage = document.getElementById('status-message');

const playerName = new URLSearchParams(window.location.search).get('name');
const colors = ["red", "green", "blue", "yellow"];

let gameSequence = [];
let playerSequence = [];
let round = 0;
let isSimonTurn = false;

const gameButtons = document.querySelectorAll('.game-btn');

const scoreMessage = document.getElementById('score-message');
const highScoreMessage = document.getElementById('high-score');

let highScore = 0;

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    playSimonSequence();
});

gameButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        handleButtonClick(index);
    });
});

function handleButtonClick(colourIndex) {
    if (!isSimonTurn) {
        const colour = colors[colourIndex];
        playerSequence.push(colour);
        
        const button = document.getElementById(`btn${colourIndex + 1}`);
        button.style.opacity = '0.5';
        
        setTimeout(() => {
            button.style.opacity = '1';
            checkPlayerSequence();
        }, 300);
    }
}

function checkPlayerSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== gameSequence[i]) {
            gameOver();
            return;
        }
    }

    if (playerSequence.length === gameSequence.length) {
        setTimeout(() => {
            round++;
            statusMessage.textContent = "Correct!";
            setTimeout(() => {
                playSimonSequence();
            }, 1000);
        }, 500);
    }
}

function gameOver() {
    statusMessage.textContent = "Game Over!";
    scoreMessage.textContent = `Previous Score: ${round}`;
    
    if (round > highScore) {
        highScore = round;
        highScoreMessage.textContent = `High Score: ${highScore}`;
    }

    // Reset game state
    round = 0;
    gameSequence = [];
    startButton.disabled = false;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playSimonSequence() {
    isSimonTurn = true;   
    statusMessage.textContent = "Simon's Turn";
    const randomColor = colors[getRandomNumber(0, 3)];
    gameSequence.push(randomColor);
    console.log("Game Sequence:", gameSequence);
    animateSequence(0);

}

function animateSequence(index) {
    // Check if there are still colors in the gameSequence to display
    if (index < gameSequence.length) {
        setTimeout(() => {
            // Get the button corresponding to the current color in the sequence
            const button = document.getElementById(`btn${colors.indexOf(gameSequence[index]) + 1}`);
            
            // Dim the button to indicate it is part of the sequence
            button.style.opacity = '0.5';
            
            // Set the button opacity back to normal after 500ms
            setTimeout(() => {
                button.style.opacity = '1';
                // Move to the next color in the sequence
                animateSequence(index + 1);
            }, 500);
        }, 1000);
    } else {
        // After the full sequence is shown, it's the player's turn
        isSimonTurn = false;
        statusMessage.textContent = `${playerName}'s Turn`;
        playerSequence = []; // Reset the player's sequence for the new round
    }
}
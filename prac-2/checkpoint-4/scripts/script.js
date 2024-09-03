const startButton = document.getElementById("start-btn");
const statusMessage = document.getElementById('status-message');

const playerName = new URLSearchParams(window.location.search).get('name');
const colors = ["red", "green", "blue", "yellow"];
console.log(colors.length)

let gameSequence = [];
let playerSequence = [];
let round = 0;
let isSimonTurn = false;


startButton.addEventListener('click', () => {
    startButton.disabled = true;
    playSimonSequence();
});


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
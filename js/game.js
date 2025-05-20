let players = ['Player 1', 'Player 2', 'Player 3', 'Player 4']; // List of players
let scores = [0, 0, 0, 0]; // Players' scores
let currentRound = 1;
let currentVictimIndex = 0;
let targetNumber = 0;
let answers = [];

function startGame() {
    updatePlayerNames();
    showGameBoard();
}

function updatePlayerNames() {
    // Display player names in the scoreboard
    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = "";
    players.forEach((player, index) => {
        const li = document.createElement("li");
        li.textContent = `${player}: ${scores[index]} points`;
        scoreboard.appendChild(li);
    });
}

function showGameBoard() {
    const questionSection = document.getElementById("question");
    const victimName = document.getElementById("victim-name");

    victimName.textContent = players[currentVictimIndex];
    questionSection.value = ""; // Clear previous question
    answers = []; // Reset answers

    document.getElementById("round-number").textContent = currentRound;
    document.getElementById("answers").innerHTML = '';
    document.getElementById("submit-answers").disabled = false;
}

function submitQuestion() {
    const question = document.getElementById("question").value;
    if (question === "") {
        alert("Please enter a question!");
        return;
    }
    targetNumber = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    console.log(`Target Number (hidden): ${targetNumber}`);

    // Allow other players to answer
    let answersHtml = '';
    players.forEach((player, index) => {
        if (index !== currentVictimIndex) {
            answersHtml += `
                <div>
                    <label for="answer-${index}">${player} (1-10):</label>
                    <input type="number" id="answer-${index}" min="1" max="10">
                </div>
            `;
        }
    });
    document.getElementById("answers").innerHTML = answersHtml;
}

function submitAnswers() {
    answers = [];
    players.forEach((player, index) => {
        if (index !== currentVictimIndex) {
            const answer = document.getElementById(`answer-${index}`).value;
            answers.push(parseInt(answer, 10));
        }
    });

    // Calculate the victim's guess and score
    calculateScore();

    // Show results
    document.getElementById("victim-guess-result").textContent = `Victim's Guess: ${targetNumber}`;
    document.getElementById("score-update").style.display = "block";
    updatePlayerNames();
}

function calculateScore() {
    const victimGuess = prompt("Victim, what do you think the number was? (1-10):");
    if (Math.abs(victimGuess - targetNumber) === 0) {
        scores[currentVictimIndex] += 3;
    } else if (Math.abs(victimGuess - targetNumber) === 1) {
        scores[currentVictimIndex] += 1;
    }

    // Update next round
    if (currentVictimIndex < players.length - 1) {
        currentVictimIndex++;
    } else {
        currentVictimIndex = 0;
        currentRound++;
    }
}

function nextRound() {
    document.getElementById("score-update").style.display = "none";
    showGameBoard();
}

startGame();

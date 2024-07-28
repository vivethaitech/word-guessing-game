const words = [
    "Potato",
    "Tomato",
    "Onion",
    "Garlic",
    "Ginger",
    "Spinach",
    "Cauliflower",
    "Cabbage",
    "Carrot",
    "Peas",
    "Brinjal",
    "BitterGourd",
    "snakeGourd",
    "BottleGourd",
    "Pumpkin",
    "Chilli",
    "CorianderLeaves",
    "Drumstick",
    "Radish",
    "Beetroot",
    "Cucumber",
    "capsicum",
    "MintLeaves"
  ];
const word = words[Math.floor(Math.random() * words.length)].toLowerCase();
const wordDisplay = document.getElementById('word-display');
const message = document.getElementById('message');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const result = document.getElementById('result');

let sample = Array(word.length).fill('');
let remainingAttempts = word.length + 3;
let correctGuesses = 0;

function createBoxes() {
    wordDisplay.innerHTML = '';
    sample.forEach(() => {
        const box = document.createElement('div');
        box.className = 'letter-box';
        wordDisplay.appendChild(box);
    });
}

function updateDisplay() {
    const boxes = document.querySelectorAll('.letter-box');
    sample.forEach((letter, index) => {
        boxes[index].textContent = letter;
        if (letter !== '') {
            boxes[index].classList.add('correct');
        }
    });
}

function endGame(win) {
    guessInput.disabled = true;
    guessButton.disabled = true;
    if (win) {
        result.textContent = `You win! The word was "${word}".`;
    } else {
        result.textContent = `You lose! The word was "${word}".`;
    }
}

guessButton.addEventListener('click', () => {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = '';
    message.textContent = '';

    if (!/^[a-z]$/.test(guess)) {
        message.textContent = 'Enter only a single alphabet.';
        return;
    }

    if (sample.includes(guess)) {
        message.textContent = 'Already guessed.';
        return;
    }

    if (word.includes(guess)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === guess) {
                sample[i] = guess;
                correctGuesses++;
            }
        }
        updateDisplay();
        if (correctGuesses === word.length) {
            endGame(true);
        }
    } else {
        remainingAttempts--;
        if (remainingAttempts === 0) {
            endGame(false);
        } else {
            message.textContent = 'Wrong guess, try again.';
        }
    }
});

createBoxes();
updateDisplay();

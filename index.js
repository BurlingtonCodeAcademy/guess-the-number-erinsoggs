// requiring readling and declaring 'rl'
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

chooseGame();
async function chooseGame() {
  let gameChoice = await ask(
    "Hello there! I've got two super fun games for you to choose from! Enter 1 if you'd like me to guess your number, or 2 if you'd like to guess my number. "
  );
  if (parseInt(gameChoice) === 1) {
    start();
  } else if (parseInt(gameChoice) === 2) {
    reverseStart();
  }
}

// Initializing minNumber, computerGuess, and guess. Declaring maxNumber for later use.
// minNumber is the minimum number for the range that the user will choose a number from. This will be reassigned later.
let minNumber = 1;
// maxNumber will be established by the user and is the highest number in the range.
let maxNumber = 100;
// computerGuess is the computer's guess at the user's secret number
let computerGuess;
// guess increments throughout the program to determine how many tries it takes the computer to guess the user's number.
let guess = 0;

// Function that handles receiving user input
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// Function that allows the computer to generate a random number faster based on dividing the min and max by two
function smartGuess(min, max) {
  return Math.floor((min + max) / 2);
}

// Calling async function
async function start() {
  console.log(
    "Great game choice! You pick a number and I'll guess what it is! First, let's establish the range of numbers you can choose from."
  );
  // Initializing maxNumber. maxNumber will be determined by the user input.
  maxNumber = await ask(
    `The range will start at ${minNumber}. You choose where it ends. Pick the ending range number: `
  );
  // Prevents the user from entering anything other than a number by forcing them to restart the game
  if (isNaN(maxNumber) || maxNumber === "") {
    console.log("You didn't enter a number! Please restart the game!");
    process.exit();
  }
  // Makes sure the user input is converted from a string to an integer
  maxNumber = parseInt(maxNumber);
  // Asks the user to choose a number between the established range
  let secretNumber = await ask(
    `${maxNumber}, nice choice! Now, go ahead and pick your number between ${minNumber} and ${maxNumber} by typing it into the console.\n(I promise I won't look!): `
  );
  // Makes sure the secret number is converted from a string to a number
  secretNumber = parseInt(secretNumber);
  // Prevents the user from entering anything other than a number by forcing them to restart the game
  if (isNaN(secretNumber)) {
    console.log(
      "You either entered an invalid answer or are cheating (booooo!) Please restart the game!"
    );
    process.exit();
    // Prevents the user from making secretNumber a number that's out of range by forcing them to restart the game
  } else if (secretNumber < minNumber || secretNumber > maxNumber) {
    console.log(
      "Your number is out of range! So sorry to inconvenience you, but you'll have to restart the game!"
    );
    process.exit();
  } else {
    console.log("Your number is: " + secretNumber + ".");
    // The computer is going to try and guess the human's number using the randomNumber function.
    computerGuess = smartGuess(minNumber, maxNumber);
    // guess is incrementing to determine how many guesses it takes the computer to figure out the user's secret number.
    guess += 1;
    console.log(`I'm going to guess that your number is: ${computerGuess}`);
  }
  // The game automatically ends if the secret number equals the computer's guess on the first try. This prevents cheating.
  if (secretNumber === computerGuess) {
    console.log(
      `I win, because winners always guess your number in ${guess} try! I'm going to go eat a celebratory pint (or three) of Cherry Garcia now. See you next time!`
    );
    process.exit();
  }

  // The loop is entered if the secret number doesn't equal the computer guess.
  while (secretNumber !== computerGuess) {
    let highLow = await ask(
      "Is your number higher or lower? Type h (higher) or l (lower): "
    );
    // Prevents the user from entering anything other than "h" or "l", and also prevents them from saying the secret number is higher if it's actually lower, and lower if it's actually higher. Doing any of this makes them restart the game.
    if (
      (highLow.toLowerCase() !== "h" && highLow.toLowerCase() !== "l") ||
      (highLow.toLowerCase() === "l" && secretNumber > computerGuess) ||
      (highLow.toLowerCase() === "h" && secretNumber < computerGuess)
    ) {
      console.log(
        "You either entered an invalid answer or are cheating (booooo!) Please restart the game!"
      );
      process.exit();
      // If the conditions for "h" are met (user enters "h" and the secret number is higher than the computer guess), we end up here.
    } else if (highLow.toLowerCase() === "h" && secretNumber > computerGuess) {
      // The minNumber will be reassigned to the computerGuess + 1 as long as the minNumber + 1 is less than or equal to the maxNumber.
      if (minNumber + 1 <= maxNumber) {
        minNumber = computerGuess + 1;
      }
      // The computer guesses again.
      computerGuess = smartGuess(minNumber, maxNumber);
      // guess continues to increment.
      guess += 1;
      console.log(`My next guess is: ${computerGuess}`);
      // If the conditions for "l" are met (user enters "l" and the secret number is less than the computer guess), we end up here.
    } else if (highLow.toLowerCase() === "l" && secretNumber < computerGuess) {
      // The new maxNumber equals the computerGuess - 1.
      maxNumber = computerGuess - 1;
      // The computer guesses again.
      computerGuess = smartGuess(minNumber, maxNumber);
      // guess continues to increment.
      guess += 1;
      console.log(`My next guess is: ${computerGuess}`);
    }
    // The game automatically exits if the secret number equals the computer guess, and it's any guess after the first guess.
    if (secretNumber === computerGuess && guess !== 1) {
      console.log(
        `I win, because winners always guess your number in ${guess} tries! I'm going to go eat a celebratory pint (or three) of Cherry Garcia now. See you next time!`
      );
      process.exit();
    }
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * max + min);
}

async function reverseStart() {
  console.log(
    `Excellent game choice! I'm going to pick a number and you're going to guess it! The number I'm going to pick is between ${minNumber} and ${maxNumber}.`
  );
  let computerNumber = randomNumber(minNumber, maxNumber);
  computerNumber = parseInt(computerNumber);
  let humanGuess = await ask(
    "Ok, I've picked my number. What's your first guess? "
  );
  humanGuess = parseInt(humanGuess);
  if (isNaN(humanGuess)) {
    console.log(
      "You either entered an invalid number or are cheating! You must restart the game!"
    );
    process.exit();
  } else if (humanGuess === computerNumber) {
    console.log(
      "You guessed my number! Go eat some ice cream and celebrate! See ya next time."
    );
    process.exit();
  }
  while (humanGuess !== computerNumber) {
    console.log("You've guessed incorrectly!");
    if (humanGuess < computerNumber) {
      humanGuess = await ask("My number is higher! Guess again! ");
      humanGuess = parseInt(humanGuess);
    } else if (humanGuess > computerNumber) {
      humanGuess = await ask("My number is lower! Guess again! ");
      humanGuess = parseInt(humanGuess);
    }
  }
  if (humanGuess === computerNumber) {
    console.log("You win! Game over.");
    process.exit();
  }
}

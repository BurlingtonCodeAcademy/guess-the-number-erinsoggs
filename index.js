// requiring readling and declaring 'rl'
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

// initializing minNumber, computerGuess, and guess. Declaring maxNumber for later use.
// minNumber is the minimum number for the range that the user will choose a number from. This will be reassigned later.
let minNumber = 1;
// maxNumber will be established by the user and is the highest number in the range.
let maxNumber;
// computerGuess is the computer's guess at the user's secret number
let computerGuess;
// guess incremements throughout the program to determine how many tries it takes the computer to guess the user's number.
let guess = 0;

// Function that handles receiving user input
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// Function that allows the computer to generate a random number faster based on dividing the min and max by two
function randomNumber(min, max) {
  return Math.floor((min + max) / 2);
}

// Calling async function
start();

async function start() {
  console.log(
    "Let's play a game! You pick a number and I'll guess what it is! First, let's establish the range of numbers you can choose from."
  );
  // Initializing maxNumber. maxNumber will be determined by the user input.
  maxNumber = await ask(
    `The range will start at ${minNumber}. You choose where it ends. Pick the ending range number: `
  );
  // Lines 39-42 prevent the user from entering anything other than a number by forcing them to restart the game.
  if (isNaN(maxNumber)) {
    console.log("You didn't enter a number! Please restart the game!");
    process.exit();
  }
  // Lines 43 makes sure the user input is converted from a string to an integer.
  maxNumber = parseInt(maxNumber);
  // Lines 46-48 asks the user to choose a number between the established range.
  let secretNumber = await ask(
    `${maxNumber}, nice choice! Now, go ahead and pick your number between ${minNumber} and ${maxNumber} by typing it into the console.\n(I promise I won't look!): `
  );
  // Line 50 makes sure the secret number is converted from a string to a number.
  secretNumber = parseInt(secretNumber);
  // Lines 52-56 prevent the user from entering anything other than a number.
  if (isNaN(secretNumber)) {
    console.log(
      "You either entered an invalid answer or are cheating (booooo!) Please restart the game!"
    );
    process.exit();
    // Lines 58-61 prevent the user from making secretNumber a number that's out of range. If they do, they have to restart the game.
  } else if (secretNumber < minNumber || secretNumber > maxNumber) {
    console.log(
      "Your number is out of range! So sorry to inconvenience you, but you'll have to restart the game!"
    );
    process.exit();
  } else {
    console.log("Your number is: " + secretNumber + ".");
    // On line 65, the computer is going to try and guess the human's number using the randomNumber function.
    computerGuess = randomNumber(minNumber, maxNumber);
    // On line 67, guess is incrementing to determine how many guesses it takes the computer to figure out the user's secret number.
    guess += 1;
    console.log(`I'm going to guess that your number is: ${computerGuess}`);
  }
  // On lines 71-76, the game automatically ends if the secret number equals the computer's guess on the first try. This prevents cheating.
  if (secretNumber === computerGuess) {
    console.log(
      `I win, because winners always guess your number in ${guess} try! I'm going to go eat a celebratory pint (or three) of Cherry Garcia now. See you next time!`
    );
    process.exit();
  }

  // The loop is entered on line 79 if the secret number doesn't equal the computer guess.
  while (secretNumber !== computerGuess) {
    let highLow = await ask(
      "Is your number higher or lower? Type h (higher) or l (lower): "
    );
    // Lines 84-92 prevent the user from entering anything other than "h" or "l", and also prevents them from saying the number is higher if it's actually lower, and lower if it's actually higher. Doing any of this makes them restart the game.
    if (
      (highLow.toLowerCase() !== "h" && highLow.toLowerCase() !== "l") ||
      (highLow.toLowerCase() === "l" && secretNumber > computerGuess) ||
      (highLow.toLowerCase() === "h" && secretNumber < computerGuess)
    ) {
      console.log(
        "You either entered an invalid answer or are cheating (booooo!) Please restart the game!"
      );
      process.exit();
      // If the conditons for "h" are met (user enters "h" and the secret number is higher than the computer guess), we end up on line 94.
    } else if (highLow.toLowerCase() === "h" && secretNumber > computerGuess) {
      // The minNumber will be reassigned to the computerGuess + 1 as long as the minNumber + 1 is less than or equal to the maxNumber (lines 96-98).
      if (minNumber + 1 <= maxNumber) {
        minNumber = computerGuess + 1;
      }
      // The computer guesses again on line 100.
      computerGuess = randomNumber(minNumber, maxNumber);
      // guess continues to increment on line 102.
      guess += 1;
      console.log(`My next guess is: ${computerGuess}`);
      // If the conditons for "l" are met (user enters "l" and the secret number is less than the computer guess), we end up on line 105.
    } else if (highLow.toLowerCase() === "l" && secretNumber < computerGuess) {
      // The new maxNumber equals the computerGuess - 1 on line 107.
      maxNumber = computerGuess - 1;
      // The computer guesses again on line 108.
      computerGuess = randomNumber(minNumber, maxNumber);
      // guess continues to increment on line 110.
      guess += 1;
      console.log(`My next guess is: ${computerGuess}`);
    }
    // On lines 115-120, the game automatically exits if the secret number equals the computer guess, and it's any guess after the first guess.
    if (secretNumber === computerGuess && guess !== 1) {
      console.log(
        `I win, because winners always guess your number in ${guess} tries! I'm going to go eat a celebratory pint (or three) of Cherry Garcia now. See you next time!`
      );
      process.exit();
    }
  }
}

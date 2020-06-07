// requiring readling and declaring 'rl'
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

// initializing minNumber, computerGuess, and guess. Declaring maxNumber for later use.
let minNumber = 1;
let maxNumber;
let computerGuess;
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
  // Prevents the user from entering anything other than a number
  if (isNaN(maxNumber)) {
    console.log("You didn't enter a number! Please restart the game!");
    process.exit();
  }
  // Making sure the user input is converted from a string to an integer
  maxNumber = parseInt(maxNumber);
  // Asking the user to choose a number between the established range
  let secretNumber = await ask(
    `${maxNumber}, nice choice! Now, go ahead and pick your number between ${minNumber} and ${maxNumber} by typing it into the console.\n(I promise I won't look!): `
  );
  // Prevents the user from choosing anything other than a number
  secretNumber = parseInt(secretNumber);
  if (isNaN(secretNumber)) {
    console.log(
      "You either entered an invalid answer or are cheating (booooo!) Please restart the game!"
    );
    process.exit();
    // Prevents the user from making secretNumber a number that's out of range
  } else if (secretNumber < minNumber || secretNumber > maxNumber) {
    console.log(
      "Your number is out of range! So sorry to inconvenience you, but you'll have to restart the game!"
    );
  } else {
    console.log("Your number is: " + secretNumber + ".");
    // The computer is going to try and guess the human's number using the randomNumber function.
    computerGuess = randomNumber(minNumber, maxNumber);
    // guess is incrementing to determine how many guesses it takes the computer to figure out secretNumber
    guess += 1;
    console.log(`I'm going to guess that your number is: ${computerGuess}`);
  }
  // The game automatically ends if secretNumber equals computerGuess. This prevents cheating.
  if (secretNumber === computerGuess) {
    console.log(
      `I win, because winners always guess your number in ${guess} try! I'm going to go eat a celebratory pint (or three) of Cherry Garcia now. See you next time!`
    );
    process.exit();
  }

  // This will loop if the answer isn't initially "yes" or until the computer guesses correctly (c)
  while (secretNumber !== computerGuess) {
    let highLow = await ask(
      "Is your number higher or lower? Type h (higher) or l (lower): "
    );
    if (
      (highLow.toLowerCase() !== "h" && highLow.toLowerCase() !== "l") ||
      (highLow.toLowerCase() === "l" && secretNumber > computerGuess) ||
      (highLow.toLowerCase() === "h" && secretNumber < computerGuess)
    ) {
      console.log(
        "You either entered an invalid answer or are cheating (booooo!) Please restart the game!"
      );
      process.exit();
    } else if (highLow.toLowerCase() === "h" && secretNumber > computerGuess) {
      if (minNumber + 1 <= maxNumber) {
        minNumber = computerGuess + 1;
      }
      computerGuess = randomNumber(minNumber, maxNumber);
      guess += 1;
      console.log(`My next guess is: ${computerGuess}`);
    } else if (highLow.toLowerCase() === "l" && secretNumber < computerGuess) {
      maxNumber = computerGuess - 1;
      computerGuess = randomNumber(minNumber, maxNumber);
      guess += 1;
      console.log(`My next guess is: ${computerGuess}`);
    }
    if (secretNumber === computerGuess && guess !== 1) {
      console.log(
        `I win, because winners always guess your number in ${guess} tries! I'm going to go eat a celebratory pint (or three) of Cherry Garcia now. See you next time!`
      );
      process.exit();
    }
  }
}

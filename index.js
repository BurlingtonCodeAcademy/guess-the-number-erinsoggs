const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

let minNumber = 1;
let maxNumber;
let computerGuess;
let guess = 0;

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

function randomNumber(min, max) {
  // return Math.floor(Math.random() * (max - min + 1) + min)
  return Math.floor((min + max) / 2);
}

start();

async function start() {
  console.log(
    "Let's play a game! You pick a number and I'll guess what it is! First, let's establish the range of numbers you can choose from."
  );
  maxNumber = await ask(
    `The range will start at ${minNumber}. You choose where it ends. Pick the ending range number: `
  );
  maxNumber = parseInt(maxNumber);
  let secretNumber = await ask(
    `${maxNumber}, nice choice! Now, go ahead and pick you number between ${minNumber} and ${maxNumber} by typing it into the console.\n(I promise I won't look!): `
  );
  secretNumber = parseInt(secretNumber);
  if (isNaN(secretNumber)) {
    console.log(
      "You either entered an invalid answer or are cheating (booooo!) Please restart the game!"
    );
    process.exit();
  } else {
    console.log("Your number is: " + secretNumber + ".");
    // The computer is going to try and guess the human's number using the randomNumber function.
    computerGuess = randomNumber(minNumber, maxNumber);
    guess += 1;
    console.log(`I'm going to guess that your number is: ${computerGuess}`);
  }
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

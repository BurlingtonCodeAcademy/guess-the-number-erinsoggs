const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

let minNumber = 1;
let maxNumber = 10;
let computerGuess = randomNumber(minNumber, maxNumber);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

start();

async function start() {
  console.log(
    "Let's play a game! Pick a number between 1 and 10 and I'll try to guess it!"
  );
  let secretNumber = await ask(
    "Go ahead and pick a number by typing it into the console.\n(I promise I won't look!): "
  );
  secretNumber = parseInt(secretNumber);
  if (isNaN(secretNumber)) {
    console.log("You're not speaking my language! Please restart the game!");
    process.exit();
  } else {
    console.log("Your number is: " + secretNumber + ".");
    // The computer is going to try and guess the human's number using the randomNumber function.
    computerGuess = randomNumber(minNumber, maxNumber);
    console.log(`I'm going to guess that your number is: ${computerGuess}`);
  }

  let isGuessCorrect = await ask(
    "Did I guess correctly? Type yes or no, pleeeease!: "
  );
  if (isGuessCorrect.toLowerCase() !== "yes" && isGuessCorrect !== "no") {
    console.log("You're not speaking my language! Please restart the game!");
    process.exit();
  } else if (isGuessCorrect === "yes") {
    console.log("Game over! I win! See you next time.");
    process.exit();
  }

  // This will loop if the answer isn't initially "yes" or until the computer guesses correctly (c)
  while (isGuessCorrect === "no" && computerGuess <= maxNumber) {
    let highLow = await ask(
      "Is your number higher or lower? Type h (higher) or l (lower): "
    );
    while (highLow.toLowerCase() !== "c")
      if (highLow.toLowerCase() === "h") {
        if (minNumber + 1 < maxNumber) {
          minNumber = computerGuess + 1;
        }
        console.log(minNumber);
        computerGuess = randomNumber(minNumber, maxNumber);
        console.log(`My next guess is: ${computerGuess}`);
        highLow = await ask(
          "Is your number higher, lower, or did I guess correctly? Type h (higher), l (lower), or c (correct): "
        );
        if (highLow.toLowerCase() === "c") {
          console.log("Game over! I win! See you next time.");
          process.exit();
        }
      } else if (highLow.toLowerCase() === "l") {
        maxNumber = computerGuess - 1;
        console.log(maxNumber);
        computerGuess = randomNumber(minNumber, maxNumber);
        console.log(`My next guess is: ${computerGuess}`);
        let highLowCorrect2 = await ask(
          "Is your number higher, lower, or did I guess correctly? Type h (higher), l (lower), or c (correct): "
        );
        if (highLowCorrect2.toLowerCase() === "c") {
          console.log("Game over! I win! See you next time.");
          process.exit();
        }
      }
  }
}

// } else if (highLowCorrect.toLowerCase() === "l") {
//   maxNumber = computerGuess - 1;
//   computerGuess = randomNumber(minNumber, maxNumber);
//   console.log(`My next guess is: ${computerGuess}`);
// }

//   } else if (highLow.toLowerCase() === "l") {
//     maxNumber = computerGuess - 1;
//     computerGuess = randomNumber(minNumber, maxNumber);
//     console.log(`My next guess is: ${computerGuess}`);
//   } else if (highLow.toLowerCase() === "c") {
//     console.log("Game over! I win! See you next time.");
//     process.exit();
//

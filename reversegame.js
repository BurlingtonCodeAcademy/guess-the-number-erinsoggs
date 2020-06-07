const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

let minNumber = 1;
let maxNumber = 100;
let guess = 0;

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * max + min);
  // return Math.floor(Math.random() * (max - min + 1) + min)
  // return Math.floor((min + max) / 2);
}
reverseStart();

async function reverseStart() {
  console.log(
    `Let's play a game! I'm going to pick a number and you're going to guess it! The number I'm going to pick is between ${minNumber} and ${maxNumber}.`
  );
  let computerNumber = randomNumber(minNumber, maxNumber);
  computerNumber = parseInt(computerNumber);
  console.log(computerNumber + " COMP NUMBER");
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

  //**************/
  // }
  // maxNumber = parseInt(maxNumber);
  // let secretNumber = await ask(
  //   `${maxNumber}, nice choice! Now, go ahead and pick your number between ${minNumber} and ${maxNumber} by typing it into the console.\n(I promise I won't look!): `
  // );
  // secretNumber = parseInt(secretNumber);
  // if (isNaN(secretNumber)) {
  //   console.log(
  //     "You either entered an invalid answer or are cheating (booooo!) Please restart the game!"
  //   );
  //   process.exit();
  // } else if (secretNumber < minNumber || secretNumber > maxNumber) {
  //   console.log(
  //     "Your number is out of range! So sorry to inconvenience you, but you'll have to restart the game!"
  //   );
  //   process.exit();
  // } else {
  //   console.log("Your number is: " + secretNumber + ".");
  //   computerGuess = randomNumber(minNumber, maxNumber);
  //   guess += 1;
  //   console.log(`I'm going to guess that your number is: ${computerGuess}`);
  // }

  // if (secretNumber === computerGuess) {
  //   console.log(
  //     `I win, because winners always guess your number in ${guess} try! I'm going to go eat a celebratory pint (or three) of Cherry Garcia now. See you next time!`
  //   );
  //   process.exit();
  // }

  // while (secretNumber !== computerGuess) {
  //   let highLow = await ask(
  //     "Is your number higher or lower? Type h (higher) or l (lower): "
  //   );
  //   if (
  //     (highLow.toLowerCase() !== "h" && highLow.toLowerCase() !== "l") ||
  //     (highLow.toLowerCase() === "l" && secretNumber > computerGuess) ||
  //     (highLow.toLowerCase() === "h" && secretNumber < computerGuess)
  //   ) {
  //     console.log(
  //       "You either entered an invalid answer or are cheating (booooo!) Please restart the game!"
  //     );
  //     process.exit();

  //   } else if (highLow.toLowerCase() === "h" && secretNumber > computerGuess) {

  //     if (minNumber + 1 <= maxNumber) {
  //       minNumber = computerGuess + 1;
  //     }
  //     computerGuess = randomNumber(minNumber, maxNumber);
  //     guess += 1;
  //     console.log(`My next guess is: ${computerGuess}`);
  //   } else if (highLow.toLowerCase() === "l" && secretNumber < computerGuess) {
  //     maxNumber = computerGuess - 1;
  //     computerGuess = randomNumber(minNumber, maxNumber);
  //     guess += 1;
  //     console.log(`My next guess is: ${computerGuess}`);
  //   }
  //   if (secretNumber === computerGuess && guess !== 1) {
  //     console.log(
  //       `I win, because winners always guess your number in ${guess} tries! I'm going to go eat a celebratory pint (or three) of Cherry Garcia now. See you next time!`
  //     );
  //     process.exit();
  //   }
  // }
}

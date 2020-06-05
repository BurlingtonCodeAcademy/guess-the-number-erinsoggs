const readline = require("readline");
const rli = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rli.question(questionText, resolve);
  });
}
start();
async function start() {
  let myNum = await ask(
    "What is the answer to the ultimate question of life, the universe, and everything?"
  );

  while (myNum.trim() !== "42") {
    myNum = await ask("Hmmmm... that doesn't seem quite right. Guess again.");
  }
  console.log("Now if we only knew the question...");
  process.exit();
}

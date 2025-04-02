//readline to get input from the command line
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function spaceMessage(message) {
  const lefties = message.split("[");
  let returnMessage = lefties[0];
  for (let i = 1; i < lefties.length; i++) {
    const righty = lefties[i].split("]");
    let number = "";
    let word = "";
    for (let j = 0; j < righty[0].length; j++) {
      if (isNaN(righty[0][j])) {
        word += righty[0][j];
      } else {
        number += righty[0][j];
      }
    }
    number = parseInt(number);
    for (let k = 0; k < number; k++) {
      returnMessage += word;
    }
    returnMessage += righty[1];
  }
  return returnMessage;
}

console.log("Welcome to the Space Message Decoder!");
console.log(
  "This program will decode messages from space by expanding the letters in brackets."
);
console.log("Examples:");

console.log("ABCD =>");
console.log(spaceMessage("ABCD"));
// output = "ABCD"

console.log("AB[3CD] =>");
console.log(spaceMessage("AB[3CD]"));
// output = "ABCDCDCD"
// # "AB" = "AB"
// # "[3CD]" = "CDCDCD"
// # Combine both = "ABCDCDCD"

console.log("IF[2E]LG[5O]D =>");
console.log(spaceMessage("IF[2E]LG[5O]D"));
// output = "IFEELGOOOOOD"

console.log("==========================");
console.log("Now try it yourself!");
function askForMessage() {
  rl.question(
    "Enter a message of choice, with letters and numbers in brackets. REMEMBER: Numbers first, letters second. Example: [3CD] => CDCDCD: ",
    (result) => {
      console.log(`${result} =>`);
      console.log(spaceMessage(result));
      askForMessage();
    }
  );
}

askForMessage();

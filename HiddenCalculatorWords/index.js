//readline to get input from the command line
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//the letters corresponding to the numbers according to the challenge
const numberToLetterObject = {
  1: "I",
  2: "Z",
  3: "E",
  4: "H",
  5: "S",
  6: "G",
  7: "L",
  8: "B",
  9: "-",
  0: "O",
};

//hihi haha funny respones
const NANResponses = [
  "Please enter a number",
  "Please enter a valid number",
  "That is not a number",
  "YOU THINK YOU CAN FOOL ME? THIS IS OBVIOUSLY NO NUMBER!",
  "Why are you trying to enter something other than a number?",
  "I SAID NUMBER!",
];

//function to convert a number to letters according to the challenge
function turnCalc(number) {
  //check if it is a number
  if (number === undefined || number === null || number === "") {
    return "Please enter anything, anything at all! (Preferably numbers)";
  }
  if (isNaN(number)) {
    return NANResponses[Math.floor(Math.random() * NANResponses.length)];
  }
  //convert the number to an array of its digits, reverse it, and map each digit to its corresponding letter
  return number
    .split("")
    .reverse()
    .map((Number) => numberToLetterObject[Number])
    .join("");
}

//start the loop to ask for a number and print the result each time
function askForNumber() {
  rl.question("Enter a number: ", (number) => {
    console.log(turnCalc(number));
    askForNumber();
  });
}

askForNumber();

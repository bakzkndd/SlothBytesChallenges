const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function isShuffledWell(numbers) {
  let ascending = true;
  let consecutively = 1;
  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i] + 1 == numbers[i + 1]) {
      if (!ascending) consecutively = 1;
      ascending = true;
      consecutively++;
    } else if (numbers[i] - 1 == numbers[i + 1]) {
      if (ascending) consecutively = 1;
      ascending = false;
      consecutively++;
    } else {
      consecutively = 1;
    }

    if (consecutively >= 3) {
      return false;
    }
  }
  return true;
}

console.log("Welcome to the Shuffled Well Challenge!");
console.log("This program will check if a list of numbers is shuffled well.");

console.log("Examples:");
console.log("[1, 2, 3, 5, 8, 6, 9, 10, 7, 4] => false");
console.log(isShuffledWell([1, 2, 3, 5, 8, 6, 9, 10, 7, 4]));
// output = false
// # 1, 2, 3 appear consecutively

console.log("[3, 5, 1, 9, 8, 7, 6, 4, 2, 10] => false");
console.log(isShuffledWell([3, 5, 1, 9, 8, 7, 6, 4, 2, 10]));
// output = false
// # 9, 8, 7, 6 appear consecutively

console.log("[1, 5, 3, 8, 10, 2, 7, 6, 4, 9] => true");
console.log(isShuffledWell([1, 5, 3, 8, 10, 2, 7, 6, 4, 9]));
// output = true
// # No consecutive numbers appear

console.log("[1, 3, 5, 7, 9, 2, 4, 6, 8, 10] => true");
console.log(isShuffledWell([1, 3, 5, 7, 9, 2, 4, 6, 8, 10]));
// output = true
// # No consecutive numbers appear

console.log("============================");
console.log("Now try it yourself!");

function askForNumbers() {
  rl.question("Enter a list of numbers (space seperated): ", (input) => {
    const numbers = input.split(" ").map(Number);
    if (numbers.some(isNaN)) {
      console.log("Invalid input. Please enter a list of numbers.");
      askForNumbers();
    } else {
      const result = isShuffledWell(numbers);
      console.log(`Result: ${result}`);
      askForNumbers();
    }
  });
}

askForNumbers();

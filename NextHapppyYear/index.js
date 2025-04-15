const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function happyYear(year) {
  if (isNaN(year)) throw "Year is not a number";
  while (true) {
    year++;
    if (year > 9876543210) throw "There is no happy year after 9876543210";
    const yearStr = year.toString();
    const uniqueDigits = new Set(yearStr); //set is always unique! we can use this to check if the digits are unique. if they are not, the size of the set will be less than the length of the string.
    if (uniqueDigits.size === yearStr.length) {
      return year;
    }
  }
}

console.log("Welcome to the Happy Year Challenge!");
console.log("This program will find the next happy year for you.");

console.log("Examples:");

console.log("2017 => 2018");
console.log(happyYear(2017));
// output = 2018
// # 2018 is the next happy year with all numbers being different.

console.log("1990 => 2013");
console.log(happyYear(1990));
// output = 2013
// # 2013 is the next happy year with all numbers being different.

console.log("2021 => 2031");
console.log(happyYear(2021));
// output = 2031
// # 2031 is the next happy year with all numbers being different.

console.log("===========================");
console.log("Now try it yourself!");

function askForYear() {
  rl.question("Enter a year: ", (year) => {
    try {
      const nextHappyYear = happyYear(parseInt(year, 10));
      console.log(`The next happy year after ${year} is ${nextHappyYear}`);
    } catch (error) {
      console.error(error);
    }
    askForYear();
  });
}

askForYear();

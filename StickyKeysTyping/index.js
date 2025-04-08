//readline to get input from the command line
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function isLongPressed(original, typed) {
  let originalIndex = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] == original[originalIndex + 1]) {
      originalIndex++;
    }
    if (typed[i] != original[originalIndex]) {
      originalIndex++;
      if (typed[i] != original[originalIndex]) {
        return false;
      }
    }
  }
  return true;
}

console.log("Welcome to the Sticky Key Typing Challenge!");
console.log("This program will check if a string was typed with sticky keys.");
console.log("Examples:");

console.log("alex => aaleex");
console.log(isLongPressed("alex", "aaleex"));
//output = true

console.log("saeed => ssaaedd");
console.log(isLongPressed("saeed", "ssaaedd"));
//original contains 2 E's, but the typed only has 1. Not a sticky key issue.
//output = false

console.log("leelee => lleeelee");
console.log(isLongPressed("leelee", "lleeelee"));
//output = true

console.log("Tokyo => TTokkyoh");
console.log(isLongPressed("Tokyo", "TTokkyoh"));
//An h was typed, not a sticky key problem, just skill issues.
//output = false

console.log("laiden => laiden");
console.log(isLongPressed("laiden", "laiden"));
//output = true

console.log("==========================");
console.log("Now try it yourself!");
function askForStrings() {
  rl.question(
    "Enter the original string and the typed string, separated by a space: ",
    (result) => {
      const [original, typed] = result.split(" ");
      console.log(`${original} => ${typed}`);
      console.log(isLongPressed(original, typed));
      askForStrings();
    }
  );
}
askForStrings();

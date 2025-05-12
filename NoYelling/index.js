const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function noYelling(str) {
    if (str.length === 0) return str; // Return empty string if input is empty
    if (str.length === 1) return str; // Return the string itself if it has only one character

    if (str[str.length - 1] === "!" || str[str.length - 1] === "?") {
        let lastChar = str[str.length - 1];
        let count = 0;
        for (let i = str.length - 1; i >= 0; i--) {
            if (str[i] === lastChar) {
                count++;
            } else {
                break;
            }
        }
        if (count > 1) {
            return str.slice(0, str.length - count) + lastChar;
        }
    }
    return str;
}

console.log("Welcome to the No Yelling Challenge!");
console.log("This program will remove repeating punctuation at the end of a sentence.");

console.log("Examples:");
console.log('"What went wrong?????????" => "What went wrong?"');
console.log(noYelling("What went wrong?????????"))
// output = "What went wrong?"

console.log('"Oh my goodness!!!" => "Oh my goodness!"');
console.log(noYelling("Oh my goodness!!!"))
// output = "Oh my goodness!"

console.log('"I just!!! can!!! not!!! believe!!! it!!!" => "I just!!! can!!! not!!! believe!!! it!"');
console.log(noYelling("I just!!! can!!! not!!! believe!!! it!!!"))
// output = "I just!!! can!!! not!!! believe!!! it!"
// # Only change repeating punctuation at the end of the sentence.

console.log('"Oh my goodness!" => "Oh my goodness!"');
console.log(noYelling("Oh my goodness!"))
// output = "Oh my goodness!"
// # Do not change sentences where there exists only one or zero exclamation marks / question marks.

console.log("============================");
console.log("Now try it yourself!");


function askForInput() {
    rl.question("Enter a sentence: ", (input) => {
        const result = noYelling(input);
        console.log(`Result: "${result}"`);
        askForInput(); // Ask for input again
    });
}

askForInput(); // Start asking for input
rl.on("close", () => {
    console.log("Goodbye!");
    process.exit(0);
});
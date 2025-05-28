const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

function actualMemorySize(size) {
    if (size.includes(",")) {
        console.warn("Warning: Commas might cause unexpected behavior. Please use a dot for decimal values.");
        size = size.replace(/,/g, '.');
    }
    const sizeSplit = size.split(/([a-zA-Z]+)/);
    const value = parseFloat(sizeSplit[0]) * .93;
    let outputValue = Math.round(value * 100) / 100; // Round to two decimal places
    const unit = sizeSplit[1];

    if (!sizes.includes(unit)) {
        throw new Error("Invalid size unit. Please use B, KB, MB, GB, TB, PB, EB, ZB, or YB.");
    }

    let unitIndex = sizes.indexOf(unit);
    if (outputValue < 1) {
        unitIndex--;
        outputValue = outputValue * 1000;
    }

    if (unitIndex < 0 || unitIndex >= sizes.length) {
        throw new Error("Invalid size unit. Please use B, KB, MB, GB, TB, PB, EB, ZB, or YB.");
    }

    if (unitIndex < 3) {
        outputValue = Math.round(outputValue); // Round to the nearest whole number for B, KB, MB
    }

    return `${outputValue}${sizes[unitIndex]}`;
}

console.log("Welcome to the Actual Memory Size Calculator!");
console.log("This program will calculate the actual memory size after accounting for the 7% overhead.");
console.log("Examples:");

console.log('"32GB" => "29.76GB"');
console.log(actualMemorySize("32GB"))
// output = "29.76GB"

console.log('"2GB" => "1.86GB"');
console.log(actualMemorySize("2GB"))
// output = "1.86GB"

console.log('"512MB" => "476MB"');
console.log(actualMemorySize("512MB"))
// output = "476MB"


console.log("===========================");
console.log("Now try it yourself!");

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askForSize() {
    rl.question("Enter a size (e.g., 32GB, 2GB, 512MB): ", (input) => {
        try {
            const result = actualMemorySize(input);
            console.log(`Actual memory size: ${result}`);
        } catch (error) {
            console.error(error.message);
        }
        askForSize();
    });
}

askForSize();
rl.on("close", () => {
    console.log("Goodbye! Remember to keep your memory sizes accurate!");
    process.exit(0);
});
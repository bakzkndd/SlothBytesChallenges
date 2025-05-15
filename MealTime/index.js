const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function timeToEat(time) {
    if (typeof time !== 'string') {
        return 'Invalid input';
    }
    if (!time.match(/^\d{1,2}:\d{2} [apAP][.][mM][.]$/)) {
        return 'Invalid time format';
    }

    const [hour, minute] = time.split(':');
    const [minutePart, period] = minute.split(' ');
    const hourNum = parseInt(hour, 10);
    const minuteNum = parseInt(minutePart, 10);
    const isPM = period.toLowerCase() === 'p.m.';
    const isAM = period.toLowerCase() === 'a.m.';
    if (hourNum < 1 || hourNum > 12 || minuteNum < 0 || minuteNum > 59) {
        return 'Invalid time';
    }
    if ((isAM || isPM) && (hourNum < 7 || (hourNum == 7 && minuteNum == 0))) {
        let hoursLeft = 7 - hourNum;
        if (minuteNum > 0) {
            hoursLeft--;
        }
        return [hoursLeft, minuteNum > 0 ? 60 - minuteNum : 0];
    } else if (isAM && (hourNum > 7 || (hourNum == 7 && minuteNum > 0))) {
        let hoursLeft = 12 - hourNum;
        if (minuteNum > 0) {
            hoursLeft--;
        }
        return [hoursLeft, minuteNum > 0 ? 60 - minuteNum : 0];
    }

    return 'Somehow you evaded the regex, good job, but you still need to eat';
}

console.log("Welcome to the meal time calculator!")
console.log("This program will tell you how long until your next meal.")
console.log("Examples:")

console.log('"2:00 p.m." => [5, 0]')
console.log(timeToEat("2:00 p.m."))
// #5 hours until the next meal, dinner
// output = [5, 0]

console.log('"5:50 p.m." => [1, 10]')
console.log(timeToEat("5:50 a.m."))
// # 1 hour and 10 minutes until the next meal, breakfast
// output = [1, 10]

console.log("============================")
console.log("Now try it yourself!")

function askForInput() {
    rl.question("Enter a time (e.g., 2:00 p.m.): ", (input) => {
        const result = timeToEat(input);
        if (Array.isArray(result)) {
            console.log(`RawResult: ${JSON.stringify(result)}`);
            console.log(`Time until next meal: ${result[0]} hours and ${result[1]} minutes`);
        } else {
            console.log(result);
        }
        askForInput(); // Ask for input again
    });
}
askForInput(); // Start asking for input
rl.on("close", () => {
    console.log("Goodbye!");
    process.exit(0);
});
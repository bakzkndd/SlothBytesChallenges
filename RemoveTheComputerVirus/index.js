function removeVirus(files) {
    files = files.replace("PC Files: ", "");
    // Split the string into an array of files
    const fileArray = files.split(", ");

    // Filter out the files that contain "virus" or "malware"
    const filteredFiles = fileArray.filter(file => (!file.includes("virus") && !file.includes("malware") || file.includes("antivirus") || file.includes("notvirus")) && file.trim().length > 0);

    // Join the filtered array back into a string
    return `PC Files: ${filteredFiles.length > 0 ? filteredFiles.join(", ") : "Empty"}`;
}

console.log("Welcome to the computer virus remover!")
console.log("This program will remove any files that contain the words 'virus' or 'malware' from your computer.")
console.log("Examples:")

console.log('"PC Files: spotifysetup.exe, virus.exe, dog.jpg" => "PC Files: spotifysetup.exe, dog.jpg"')
console.log(removeVirus("PC Files: spotifysetup.exe, virus.exe, dog.jpg"))
// output = "PC Files: spotifysetup.exe, dog.jpg"

console.log('"PC Files: antivirus.exe, cat.pdf, lethalmalware.exe, dangerousvirus.exe" => "PC Files: antivirus.exe, cat.pdf"')
console.log(removeVirus("PC Files: antivirus.exe, cat.pdf, lethalmalware.exe, dangerousvirus.exe "))
// output = "PC Files: antivirus.exe, cat.pdf"

console.log('"PC Files: notvirus.exe, funnycat.gif" => "PC Files: notvirus.exe, funnycat.gif"')
console.log(removeVirus("PC Files: notvirus.exe, funnycat.gif"))
// output = "PC Files: notvirus.exe, funnycat.gif")

console.log('"PC Files: virus.exe, malware.exe" => "PC Files: Empty"')
console.log(removeVirus("PC Files: virus.exe, malware.exe"))


console.log("============================")
console.log("Now try it yourself!")

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function askForInput() {
    rl.question("Enter a list of files (e.g., spotifysetup.exe, virus.exe, dog.jpg): ", (input) => {
        const result = removeVirus(input);
        console.log(result);
        askForInput();
    });
}
askForInput();

rl.on("close", () => {
    console.log("Goodbye! Don't let the computer virus bite you!");
    process.exit(0);
});
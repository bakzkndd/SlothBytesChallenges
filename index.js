const fs = require("fs");
const path = require("path");
const { select, input, Separator } = require("@inquirer/prompts");

function getArgNames(func) {
  const funcString = func.toString()
    .replace(/\/\/.*$/mg, '') // remove line comments
    .replace(/\/\*[\s\S]*?\*\//g, ''); // remove block comments

  // Try to get arguments from the first parentheses
  const parenMatch = funcString.match(/\(([^)]*)\)/);
  if (parenMatch && parenMatch[1].trim().length > 0) {
    return parenMatch[1].split(',').map(a => a.trim()).filter(Boolean);
  }

  // Arrow function with single param without parentheses: x => ...
  const singleArgMatch = funcString.match(/^\s*([A-Za-z_$][\w$]*)\s*=>/);
  if (singleArgMatch) return [singleArgMatch[1]];

  return [];
}

const ignoreFolders = ["node_modules", "Controller", ".git"]

// get all challenges, which is all folders except this one in the parent folder
const challenges = fs.readdirSync(__dirname).filter((file) => {
  return fs.statSync(path.join(__dirname, file)).isDirectory() && !ignoreFolders.includes(file);
});

async function showChallenge(challenge) {
    console.clear();
    console.log("==================");
    console.log(`Challenge: ${challenge}`);
    console.log("==================");

    const challengePath = path.join(__dirname, challenge);
    const challengeFiles = fs.readdirSync(challengePath);

    const filesWithFunctions = [];
    for (const file of challengeFiles) {
        const filePath = path.join(challengePath, file);
        try {
            // Clear cache so changes are picked up
            delete require.cache[require.resolve(filePath)];
            const script = require(filePath);

            // Determine exported functions (handle module.exports = function)
            let functions = [];
            if (typeof script === 'object' && script !== null) {
                functions = Object.keys(script);
            } else if (typeof script === 'function') {
                functions = ['default'];
            }

            if (functions.length > 0) {
                filesWithFunctions.push(file);
            }
        } catch (err) {
            // ignore files that can't be required
        }
    }

    const file = await select({
        message: "Select a file:",
        choices: [
            ...filesWithFunctions.map(f => ({ name: f, value: f })),
            new Separator(),
            { name: "Return", value: "Return" },
        ],
    });

    if (file === "Return") {
        showChallenges();
        return;
    }

    console.clear();
    console.log("==================");
    console.log(`Challenge: ${challenge}`);
    console.log(`File: ${file}`);
    console.log("==================");

    try {
        const filePath = path.join(challengePath, file);
        delete require.cache[require.resolve(filePath)];
        const script = require(filePath);

        let functions = [];
        if (typeof script === 'object' && script !== null) {
            functions = Object.keys(script);
        } else if (typeof script === 'function') {
            functions = ['default'];
        }

        const functionName = await select({
            message: "Select a function:",
            choices: [
                ...functions.map(f => ({ name: f, value: f })),
                new Separator(),
                { name: "Return", value: "Return" }
            ],
        });

        if (functionName === "Return") {
            showChallenge(challenge);
            return;
        }

        const exportedItem = (functionName === 'default' && typeof script === 'function') ? script : script[functionName];

        const argNames = getArgNames(exportedItem);
        const argCount = argNames.length;

        console.clear();
        console.log("==================");
        console.log(`Challenge: ${challenge}`);
        console.log(`File: ${file}`);
        console.log(`Function: ${functionName}`);
        console.log(`Arguments: ${argCount}`);
        console.log("==================");

        if (argCount > 0) {
            const args = [];
            for (let i = 0; i < argCount; i++) {
                const raw = await input({
                    message: `Enter value for argument ${argNames[i]}:`,
                });
                // Try to parse as JSON so numbers, booleans, arrays, objects work
                let parsed;
                try {
                    parsed = JSON.parse(raw);
                } catch (e) {
                    parsed = raw;
                }
                args.push(parsed);

                console.clear();
                console.log("==================");
                console.log(`Challenge: ${challenge}`);
                console.log(`File: ${file}`);
                console.log(`Function: ${functionName}`);
                console.log(`Arguments: ${argCount}`);
                console.log("==================");
            }

            const result = await exportedItem(...args);
            console.log(`Result:`);
            console.log(result)
        } else {
            const result = await exportedItem();
            console.log(`Result:`);
            console.log(result)
        }
    } catch (error) {
        console.error(error);
    }

    console.log("==================");

    //enter to continue
    await input({
        message: "Press enter to continue...",
    });

    showChallenge(challenge);
}

async function showChallenges() {
    console.clear();
    console.log("==================");
    console.log("Challenges:");
    console.log("==================");

    try {
        const challenge = await select({
            message: "Select a challenge:",
            choices: [
                ...challenges.map(c => ({ name: c, value: c })),
                new Separator(),
                { name: "Exit", value: "Exit" },
            ],
        });

        if (challenge === "Exit") {
            console.clear();
            console.log("Exiting...");
            process.exit(0);
        } else if (challenges.includes(challenge)) {
            showChallenge(challenge);
        }
    } catch (error) {
        console.error(error);
    }
}

showChallenges();
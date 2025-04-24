const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function split_into_buckets(str, max_length) {
  str = str.trim(); // remove leading and trailing spaces
  if (str == undefined || str == "") {
    throw "No string to split";
  }

  if (isNaN(max_length)) {
    throw "Max length is not a number";
  }

  const words = str.split(" ");
  const buckets = [];
  let bucket = "";
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word.length > max_length) return []; // if a word is longer than max_length, return empty array

    if (bucket.length + word.length > max_length) {
      buckets.push(bucket.trim());
      bucket = "";
    }

    bucket += word + " ";
  }

  if (bucket != "") buckets.push(bucket.trim());

  return buckets;
}

console.log("Welcome to the Word Buckets Challenge!");
console.log("This program will split a string into buckets of words.");

console.log("Examples:");
console.log(
  'she sells sea shells by the sea (10) => ["she sells", "sea shells", "by the sea"]'
);
console.log(split_into_buckets("she sells sea shells by the sea", 10));
// output = ["she sells", "sea shells", "by the sea"];

console.log(
  'the mouse jumped over the cheese (7) => ["the", "mouse", "jumped", "over", "the", "cheese"]'
);
console.log(split_into_buckets("the mouse jumped over the cheese", 7));
// output = ["the", "mouse", "jumped", "over", "the", "cheese"];

console.log(
  'fairy dust coated the air (20) => ["fairy dust coated", "the air"]'
);
console.log(split_into_buckets("fairy dust coated the air", 20));
// output = ["fairy dust coated", "the air"];

console.log('a b c d e (2) => ["a", "b", "c", "d", "e"]');
console.log(split_into_buckets("a b c d e", 2));
// output = ["a", "b", "c", "d", "e"];

console.log("============================");
console.log("Now try it yourself!");

function askForString() {
  rl.question("Enter a string: ", (str) => {
    rl.question("Enter a max length: ", (max_length) => {
      try {
        const buckets = split_into_buckets(str, parseInt(max_length, 10));
        console.log("\x1b[32m", `The buckets are: ${JSON.stringify(buckets)}`);
        console.log("\x1b[0m"); // reset color, also happily makes space between the text and the next line.
        if (buckets.length == 0) {
          console.info(
            "\x1b[33m%s\x1b[0m", //whats these weird characters? it colorizes the text in the console.
            "Buckets looking kinda empty? If a word is longer than the max length, no buckets will be created."
          );
        }
      } catch (error) {
        console.error("\x1b[31m", error);
        console.log("\x1b[0m"); // reset color, also happily makes space between the text and the next line.
      }
      askForString();
    });
  });
}

askForString();

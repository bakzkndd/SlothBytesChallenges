//readline to get input from the command line
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//ez pz function that returns a new array with the elements of the two input arrays shuffled together.
function BridgeShuffle(arr1, arr2) {
  //find the longest array to make life better
  const longest = arr1.length > arr2.length ? arr1 : arr2;
  let result = [];
  for (let i = 0; i < longest.length; i++) {
    //if the element is not undefined, push it to the result array
    //array 1 first, then array 2
    if (arr1[i] !== undefined) {
      result.push(arr1[i]);
    }
    if (arr2[i] !== undefined) {
      result.push(arr2[i]);
    }
  }
  return result;
}

console.log("Bridge Shuffle");
console.log("==============");
console.log(
  "This program will shuffle two arrays together, alternating elements from each array."
);
console.log("Examples:");
console.log("[A, A, A], [B, B, B] =>");
console.log(BridgeShuffle(["A", "A", "A"], ["B", "B", "B"]));
console.log("");
console.log("[C, C, C, C], [D] =>");
console.log(BridgeShuffle(["C", "C", "C", "C"], ["D"]));
console.log("");
console.log("[1, 3, 5, 7], [2, 4, 6] =>");
console.log(BridgeShuffle([1, 3, 5, 7], [2, 4, 6]));

console.log("");
console.log("Now try it yourself!");
function askForArray() {
  rl.question("Enter an array, elements seperated with a comma: ", (result) => {
    const array1 = result.split(",");
    rl.question(
      "Enter another array, elements seperated with a comma: ",
      (result) => {
        const array2 = result.split(",");
        console.log(`[${array1}], [${array2}] =>`);
        console.log(BridgeShuffle(array1, array2));
        askForArray();
      }
    );
  });
}

askForArray();

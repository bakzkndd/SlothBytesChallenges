//readline to get input from the command line
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function lemonade(bills) {
  let fives = 0;
  let tens = 0;
  for (let i = 0; i < bills.length; i++) {
    const bill = bills[i];
    if (bill != 5 && bill != 10 && bill != 20) {
      console.error("Invalid bill value. Only 5, 10, and 20 are allowed.");
      console.error("Value: ", bill);
      console.error("Index: ", i);
      return false;
    }
    if (bill == 5) {
      fives++;
    } else if (bill == 10) {
      if (fives == 0) {
        return false;
      }
      fives--;
      tens++;
    } else if (bill == 20) {
      if (tens == 0) {
        if (fives < 3) {
          return false;
        }
        fives -= 3;
      } else {
        if (fives == 0) {
          return false;
        }
        fives--;
        tens--;
      }
    }
  }

  return true;
}

console.log("Welcome to the Lemonade Stand!");
console.log(
  "This program will determine if you can give change to all customers."
);
console.log("Examples:");

console.log("[5, 5, 5, 10, 20] =>");
console.log(lemonade([5, 5, 5, 10, 20]));
// """ First three customers pay with $5: Now you have three $5 bills
// Fourth customer pays $10: You give $5 change, now have two $5 bills and one $10 bill
// Fifth customer pays $20: You can give $15 change (one $10 + one $5)
// """
// output = True;

console.log("[5, 5, 10, 10, 20] =>");
console.log(lemonade([5, 5, 10, 10, 20]));
// """ First two customers pay with $5: Now you have two $5 bills
// Third customer pays $10: You give $5 change, now have one $5 bill and one $10 bill
// Fourth customer pays $10: You give $5 change, now have zero $5 bills and two $10 bills
// Fifth customer pays $20: You need to give $15 change but you can't because you only have $10 bills!
// """
// output = False;

console.log("[10, 10] =>");
console.log(lemonade([10, 10]));
// output = False;

console.log("[5, 5, 10] =>");
console.log(lemonade([5, 5, 10]));
// output = True;

console.log("==========================");
console.log("Now try it yourself!");
function askForArray() {
  rl.question(
    "Enter an array of 5s 10s and 20s, elements seperated with a comma: ",
    (result) => {
      const array1 = result.split(",");
      console.log(`[${array1}] =>`);
      console.log(lemonade(array1));
      askForArray();
    }
  );
}

askForArray();

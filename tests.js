const requirements = require("./currencyRequirements");
const dayjs = require("dayjs");

const expiry = dayjs("2023-04-30");
const lastAttended = dayjs("2023-03-02");
const seniority = "Junior";
const getNextExpiry =
  requirements.nextExpiries["Dinghy Drill & Ejection Seat Trainer"];
const newExpiry = getNextExpiry(expiry, lastAttended, seniority);

// console.log(`Current expiry: ${expiry}
// Attempted: ${lastAttended}
// New expiry: ${newExpiry}`);

const testArray = [1, 2, 3, 4, 5];

const insert6 = (array) => {
  array.push(6);
};

insert6(testArray);

console.log(testArray);

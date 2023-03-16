const requirements = require("./currencyRequirements");
const dayjs = require("dayjs");

// console.log(`Current expiry: ${expiry}
// Attempted: ${lastAttended}
// New expiry: ${newExpiry}`);

const testArray = [1, 2, 3, 4, 5];

const insert6 = (array) => {
  array.push(6);
};

insert6(testArray);

const expiry = dayjs("2023-04-30");
const lastAttended = dayjs("2023-03-02");
const seniority = "Junior";
const getNextExpiry =
  requirements.nextExpiries["Dinghy Drill & Ejection Seat Trainer"];
const newExpiry = getNextExpiry(expiry, lastAttended, seniority);

const sampleCurrencies = [
  {
    type: "ACE",
    expiry: dayjs("2023-08-05T00:00:00.000Z"),
  },
  {
    type: "APT",
    expiry: dayjs("2024-03-31T00:00:00.000Z"),
  },
  {
    type: "NVG Refresher",
    expiry: dayjs("2024-03-31T00:00:00.000Z"),
  },
  {
    type: "DFS Refresher",
    expiry: dayjs("2024-04-30T00:00:00.000Z"),
  },
  {
    type: "DFS YOGA",
    expiry: dayjs("2024-03-04T00:00:00.000Z"),
  },
  {
    type: "Survival Refresher Videos",
    expiry: dayjs("2023-05-31T00:00:00.000Z"),
  },
  {
    type: "Dinghy Drill & Ejection Seat Trainer",
    expiry: dayjs("2023-04-20T00:00:00.000Z"),
  },
];

const sampleTraining = {
  type: "DFS Refresher",
  end: dayjs("2024-03-01"),
};

requirements.updateExpiries(sampleCurrencies, sampleTraining, "Junior");

console.log(sampleCurrencies[3]);
console.log(sampleCurrencies[4]);

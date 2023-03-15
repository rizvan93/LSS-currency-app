const requirements = require("./currencyRequirements");
const dayjs = require("dayjs");

const expiry = dayjs("2023-04-22");
const lastAttended = dayjs("2023-03-22");
const seniority = "Senior";
const getNextExpiry = requirements.nextExpiries["DFS Refresher"];

console.log(`new expiry: ${getNextExpiry(expiry, lastAttended, seniority)}`);

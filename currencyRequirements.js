const dayjs = require("dayjs");

const findNextDue = {
  req1: (lastAttended) => {
    dayjs(lastAttended).dayjs.add(1, "year");
  },
  req2: (lastAttended) => {
    dayjs(lastAttended).dayjs.add(6, "month");
  },
  req3: (lastAttended) => {
    dayjs(lastAttended).dayjs.add(2, "year");
  },
};

module.exports = findNextDue;

const dayjs = require("dayjs");

const findNextDue = {
  ACE: (lastAttended, dateOfBirth) => {
    return dayjs(dateOfBirth).endOf("month");
  },
  APT: (lastAttended) => {
    return dayjs(lastAttended).add(3, "year").endOf("month");
  },
  "NVG Refresher": (lastAttended) => {
    return dayjs(lastAttended).add(3, "year").endOf("month");
  },
  YOGA: (lastAttended) => {
    return dayjs(lastAttended).add(1, "year").endOf("month");
  },
  "Survival Refresher Videos": (lastAttended) => {
    return dayjs(lastAttended).add(1, "year").endOf("month");
  },
  "Dinghy Drill & Ejection Seat Trainer": (lastAttended) => {
    return dayjs(lastAttended).add(2, "year").endOf("month");
  },
};

const names = Object.keys(findNextDue);

const overallStatus = (expiries) => {
  names.forEach((name) => {
    if (dayjs(expiries[name]).isAfter(dayjs(), "day")) {
      return "EXPIRED";
    }
    if (
      dayjs(expiries[name])
        .add(3, "month")
        .isAfter((dayjs(), "day"))
    ) {
      return "Recurrency due soon";
    }
  });
  return "Current";
};

module.exports = { findNextDue, names, overallStatus };

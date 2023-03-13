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
  for (const name in expiries) {
    const expired = dayjs(expiries[name]).isBefore(dayjs(), "day");

    if (expired) {
      return "EXPIRED";
    }
  }

  for (const name in expiries) {
    const dueSoon = dayjs(expiries[name])
      .subtract(3, "month")
      .isBefore(dayjs(), "day");

    if (dueSoon) {
      return "EXPIRED";
    }
  }

  return "Current";
};

module.exports = { findNextDue, names, overallStatus };

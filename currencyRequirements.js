const dayjs = require("dayjs");

const findNextDue = {
  ACE: (lastAttended, dOB) => {
    const thisYear = dayjs().year();
    const thisBirthday = dayjs(dOB).year(thisYear);
    const lastBirthday = thisBirthday.subtract(1, "year");

    if (dayjs(lastAttended).add(2, "month").isBefore(thisBirthday)) {
      return thisBirthday.add(1, "month");
    } else {
      return lastBirthday.add(1, "month");
    }
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
    const expired = dayjs().isAfter(dayjs(expiries[name]), "day");
    // console.log(`${name} expires on ${expiries[name]}. expired: ${expired}`);

    if (expired) {
      return { message: "EXPIRED", class: "warnHigh" };
    }
  }

  for (const name in expiries) {
    const dueSoon = dayjs().add(3, "month").isAfter(dayjs(expiries[name]));
    // console.log(`due soon: ${dueSoon}`);

    if (dueSoon) {
      return { message: "Recurrency due soon", class: "warnLow" };
    }
  }

  return { message: "Current", class: "warnNone" };
};

module.exports = { findNextDue, names, overallStatus };

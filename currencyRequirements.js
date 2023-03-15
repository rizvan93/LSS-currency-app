const dayjs = require("dayjs");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);

const nextExpiries = {
  ACE: (expiry, lastAttended) => {
    const reattemptPeriod = 3; //months
    const validityExtension = 1; //years
    return getNextExpiry(
      expiry,
      lastAttended,
      reattemptPeriod,
      validityExtension
    );
  },
  APT: (expiry, lastAttended) => {
    const reattemptPeriod = 0; //months
    const validityExtension = 3; //years
    return getNextExpiry(
      expiry,
      lastAttended,
      reattemptPeriod,
      validityExtension
    );
  },
  "NVG Refresher": (expiry, lastAttended) => {
    const reattemptPeriod = 0; //months
    const validityExtension = 3; //years
    return getNextExpiry(
      expiry,
      lastAttended,
      reattemptPeriod,
      validityExtension
    );
  },
  "DFS YOGA": (expiry, lastAttended) => {
    const reattemptPeriod = 0; //months
    const validityExtension = 1; //years
    return getNextExpiry(
      expiry,
      lastAttended,
      reattemptPeriod,
      validityExtension
    );
  },
  "DFS Refresher": (expiry, lastAttended) => {
    const reattemptPeriod = 0; //months
    const validityExtension = 3; //years
    return getNextExpiry(
      expiry,
      lastAttended,
      reattemptPeriod,
      validityExtension
    );
  },
  "Survival Refresher Videos": (expiry, lastAttended) => {
    const reattemptPeriod = 0; //months
    const validityExtension = 1; //years
    return getNextExpiry(
      expiry,
      lastAttended,
      reattemptPeriod,
      validityExtension
    );
  },
  "Dinghy Drill & Ejection Seat Trainer": (expiry, lastAttended) => {
    const reattemptPeriod = 0; //months
    const validityExtension = 2; //years
    return getNextExpiry(
      expiry,
      lastAttended,
      reattemptPeriod,
      validityExtension
    );
  },
};

const names = Object.keys(nextExpiries);

const status = (expiry) => {
  const expired = dayjs().isAfter(dayjs(expiry), "day");
  const dueSoon = dayjs().add(3, "month").isAfter(dayjs(expiry));

  if (expired) {
    return "warnHigh";
  } else if (dueSoon) {
    return "warnLow";
  } else {
    return "warnNone";
  }
};

const getOverallStatus = (trainee) => {
  const expiries = trainee.currencies.map((currency) => currency.expiry);

  for (const expiry in expiries) {
    const expired = dayjs().isAfter(dayjs(expiry), "day");

    if (expired) {
      return { message: "EXPIRED", class: "warnHigh" };
    }
  }

  for (const expiry in expiries) {
    const dueSoon = dayjs().add(3, "month").isAfter(dayjs(expiry));

    if (dueSoon) {
      return { message: "Recurrency due soon", class: "warnLow" };
    }
  }

  return { message: "Current", class: "warnNone" };
};

const getNextExpiry = (
  expiry,
  lastAttended,
  reattemptPeriod,
  validityExtension
) => {
  const attemptedBeforeExpiry =
    dayjs(lastAttended).isSameOrBefore(dayjs(expiry), "day") &&
    dayjs(expiry)
      .subtract(reattemptPeriod, "months")
      .isSameOrBefore(dayjs(lastAttended), "day");
  if (attemptedBeforeExpiry) {
    return dayjs(expiry).add(validityExtension, "year").endOf("month");
  } else {
    return lastAttended;
  }
};

module.exports = { nextExpiries, names, status, getOverallStatus };

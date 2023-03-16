const dayjs = require("dayjs");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);

const currencyDetails = {
  ACE: {
    reattemptWindow: 4, //months
    extension: 1, //years
  },
  APT: {
    reattemptWindow: 0, //months
    extension: 3, //years
  },
  "NVG Refresher": {
    reattemptWindow: 0, //months
    extension: 3, //years
  },
  "DFS Refresher": {
    reattemptWindow: 3, //months
    extension: 3, //years
    extensionSenior: 5, //years
  },
  "DFS YOGA": {
    reattemptWindow: 0, //months
    extension: 1, //years
  },
  "Survival Refresher Videos": {
    reattemptWindow: 0, //months
    extension: 1, //years
  },
  "Dinghy Drill & Ejection Seat Trainer": {
    reattemptWindow: 0, //months
    extension: 2, //years
  },
};

const nextExpiries = {
  ACE: (expiry, lastAttended) => {
    const reattemptPeriod = 4; //months
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
  "DFS Refresher": (expiry, lastAttended, seniority) => {
    const reattemptPeriod = 3; //months
    let validityExtension = 3; //years
    if (seniority === "Senior") {
      validityExtension = 5; //years
    }

    return getNextExpiry(
      expiry,
      lastAttended,
      reattemptPeriod,
      validityExtension
    );
  },
  "DFS YOGA": (expiry, lastAttended, seniority) => {
    const reattemptPeriod = 0; //months
    const validityExtension = 1; //years
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

const updateExpiries = (currencies, training, seniority) => {
  const index = currencies.findIndex(
    (currency) => currency.type === training.type
  );
  if (index >= 0) {
    const updatedCurrency = currencies[index];
    let { reattemptWindow, extension } = currencyDetails[training.type];
    if (training.type === "DFS Refresher" && seniority === "Senior") {
      extension = currencyDetails[training.type].extensionSenior;
    }
    updatedCurrency.expiry = getNextExpiry(
      updatedCurrency.expiry,
      training.end,
      reattemptWindow,
      extension
    );

    if (training.type === "DFS Refresher") {
      const yogaTraining = {
        type: "DFS YOGA",
        end: training.end,
      };
      updateExpiries(currencies, yogaTraining, seniority);
    }

    currencies.splice(index, 1, updatedCurrency);
  }
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

  for (const expiry of expiries) {
    const expired = dayjs().isAfter(dayjs(expiry), "day");

    if (expired) {
      return { message: "EXPIRED", class: "warnHigh" };
    }
  }

  for (const expiry of expiries) {
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
  const isBeforeExpiry = dayjs(lastAttended).isSameOrBefore(
    dayjs(expiry),
    "day"
  );
  const windowStart = dayjs(expiry).subtract(reattemptPeriod, "months");
  const isAfterWindowStarts = windowStart.isSameOrBefore(
    dayjs(lastAttended),
    "day"
  );
  const isDuringWindow = isBeforeExpiry && isAfterWindowStarts;

  if (isDuringWindow) {
    return dayjs(expiry).add(validityExtension, "year").endOf("month");
  } else {
    return dayjs(lastAttended).add(validityExtension, "year").endOf("month");
  }
};

module.exports = {
  nextExpiries,
  names,
  status,
  getOverallStatus,
  updateExpiries,
};

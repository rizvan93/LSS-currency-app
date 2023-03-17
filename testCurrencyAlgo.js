var express = require("express");
var router = express.Router();
const requirements = require("./currencyRequirements");
const dayjs = require("dayjs");

const testPage = (req, res) => {
  const currencies = [];
  for (const name of requirements.names) {
    const currency = {
      type: name,
    };
    currencies.push(currency);
  }
  res.render("testCurrency", { currencies, training: {}, dayjs });
};

const test = (req, res) => {
  const currencies = [];
  const training = {
    type: req.body.trainingType,
    end: req.body.trainingDate,
  };
  for (const name of requirements.names) {
    const currency = {};
    currency.type = name;
    currency.expiry = req.body[name];
    currency.oldExpiry = req.body[name];
    currencies.push(currency);
  }
  console.log("before");
  console.log(currencies);
  requirements.updateExpiries(currencies, training, req.body.seniority);
  console.log("after");
  console.log(currencies);
  res.render("testCurrency", { currencies, training, dayjs });
};

router.get("/", testPage);
router.post("/", test);

module.exports = router;

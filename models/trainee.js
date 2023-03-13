const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const requirements = require("../currencyRequirements");

const requirementNames = requirements.keys;

const currencySchema = new Schema(
  {
    type: { type: String, required: true, enum: requirementNames },
    lastAttended: { type: Date },
  },
  { timestamps: true }
);

const traineeSchema = new Schema(
  {
    name: { type: String, required: true },
    currencies: [currencySchema],
    contact: { type: String, match: /\d{8}/, required: true },
    vehNum: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trainee", traineeSchema);

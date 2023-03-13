const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const requirements = require("../currencyRequirements");

const currencySchema = new Schema(
  {
    type: { type: String, required: true, enum: requirements.names },
    lastAttended: { type: Date },
  },
  { timestamps: true }
);

const traineeSchema = new Schema(
  {
    name: { type: String, required: true },
    dOB: { type: Date, required: true },
    contact: { type: String, match: /\d{8}/, required: true },
    vehNum: { type: String },
    currencies: [currencySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trainee", traineeSchema);

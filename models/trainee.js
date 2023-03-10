const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const requirements = require("../config/requirements");

const requirementNames = requirements.keys;

const currencySchema = new Schema(
  {
    type: { type: String, required: true, enum: requirementNames },
    lastAttended: { type: Date },
    nextBooked: { type: mongoose.SchemaTypes.ObjectId, ref: "Training" },
  },
  { timestamps: true }
);

const traineeSchema = new Schema(
  {
    name: { type: String, required: true },
    currencies: [currencySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trainee", traineeSchema);

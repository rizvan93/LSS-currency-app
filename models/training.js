const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const requirements = require("../config/requirements");

const requirementNames = Object.keys(requirements);

const trainingSchema = new Schema(
  {
    type: { type: String, required: true, enum: requirementNames },
    capacity: { type: Number, required: true, min: 1 },
    date: { type: Date },
    startTime: { type: String, match: /\d{2}:\d{2}/ },
    endTime: { type: String, match: /\d{2}:\d{2}/ },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Training", trainingSchema);

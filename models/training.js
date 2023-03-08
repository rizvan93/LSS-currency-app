const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const requirements = require("XXXXX")

const types = [];
// requirements.forEach((requirement) => {
//   types.push(requirment.name);
// });

const trainingSchema = new Schema(
  {
    type: { type: String, required: true, enum: [types] },
    capacity: { type: Number, required: true, min: 1 },
    date: { type: Date },
    startTime: { type: String, match: /\d{4}/ },
    endTime: { type: String, match: /\d{4}/ },
  },
  { timestamps: true }
);

module.exports = mongoose.Model("Training", trainingSchema);

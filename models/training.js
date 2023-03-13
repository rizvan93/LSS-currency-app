const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const requirements = require("../currencyRequirements");

const requirementNames = Object.keys(requirements);

const trainingSchema = new Schema(
  {
    type: { type: String, required: true, enum: requirementNames },
    capacity: { type: Number, required: true, min: 1 },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    remarks: { type: String },
    trainees: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Trainee" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Training", trainingSchema);

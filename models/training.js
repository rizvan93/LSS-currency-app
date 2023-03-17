const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const requirements = require("../currencyRequirements");

const trainingSchema = new Schema(
  {
    type: { type: String, required: true, enum: requirements.names },
    capacity: { type: Number, required: true, min: 1 },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    remarks: { type: String },
    complete: { type: Boolean, default: false },
    trainees: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Trainee" }],
    waitlist: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Trainee" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Training", trainingSchema);

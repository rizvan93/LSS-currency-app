const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const requiremnets = require("XXXXXXXXX");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    unit: { type: String, required: true },
  },
  { timestamps: true }
);

//requirements.forEach((requirement)=>{
const nestedSchema = {
  lastAttended: { type: mongoose.ObjectId, required: true },
  nextBooked: { type: mongoose.ObjectId },
};

userSchema[requirement.name] = nestedSchema;
//})

module.exports = mongoose.Model("User", userSchema);

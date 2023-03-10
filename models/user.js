const mongoose = require("mongoose");
const Schema = mongoose.Schema;

accounts = ["admin", "trainee", "trainer"];

const userSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    account: { type: String, required: true, enum: accounts },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

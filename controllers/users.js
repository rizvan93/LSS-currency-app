const User = require("../models/user");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const homes = {
  admin: "/users",
  traineeAdmin: "/trainees",
  trainee: "/trainees/",
  trainer: "/trainings",
};

const login = (req, res) => {
  res.render("users/login", { message: "" });
};

const authenticate = async (req, res) => {
  const { userId, password } = req.body;

  const user = await User.findOne({ userId });

  if (user === null) {
    res.render("users/login", { message: "User not found" });
    return;
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (!result) {
      res.render("users/login", { message: "Incorrect password" });
    } else {
      req.session.account = user.account;
      if (user.account === "trainee") {
        req.session.traineeId = user.traineeId;
        homes.trainee = homes.trainee + user.traineeId.toString();
      }

      res.redirect(homes[req.session.account]);
    }
  });
};

const index = async (req, res) => {
  const users = await User.find({});
  // res.render("homepage for admins, " + JSON.stringify(users));
  res.render("users/index", { users });
};

const seedAdmin = (req, res) => {
  const newUser = {};
  newUser.userId = "trainer";
  newUser.account = "trainer";
  const password = "password";
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    newUser.password = await hash;
    await User.create(newUser);
    res.send("user created: " + JSON.stringify(newUser));
  });
};

const seedTrainee = (req, res) => {
  const { traineeId } = req.params;
  const newUser = {};
  newUser.userId = "trainee2";
  newUser.account = "trainee";
  newUser.traineeId = traineeId;

  const password = "password";
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    newUser.password = await hash;
    await User.create(newUser);
    res.send("user created: " + JSON.stringify(newUser));
  });
};

module.exports = {
  index,
  login,
  authenticate,
  seedAdmin,
  seedTrainee,
};

const User = require("../models/user");
const bcrypt = require("bcrypt");

const saltRounds = 10;

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
      req.session.home = homes[req.session.account];

      res.redirect(req.session.home);
    }
  });
};

const logout = (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
  res.redirect("/");
};

const index = async (req, res) => {
  const users = await User.find({});
  res.render("users/index", { users });
};

const newUser = (req, res) => {
  res.render("users/new", { message: "" });
};

const create = async (req, res) => {
  const { userId, password, confirmPassword } = req.body;
  console.log("waiting to find users");
  const users = await User.find({}, "userId");
  console.log(`found ${users.length} users`);
  const userIds = users.map((user) => user.userId);

  if (userIds.includes(userId)) {
    res.render("users/new", {
      message: "Username already taken",
    });
    return;
  }
  if (password !== confirmPassword) {
    res.render("users/new", {
      message: "Passwords do not match",
    });
    return;
  }

  console.log("waiting to create user");
  req.body.password = await bcrypt.hash(password, saltRounds);
  await User.create(req.body);

  res.redirect("/users");
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);

  res.redirect("/users");
};

module.exports = {
  login,
  authenticate,
  logout,
  index,
  new: newUser,
  create,
  delete: deleteUser,
  seedAdmin,
  seedTrainee,
};

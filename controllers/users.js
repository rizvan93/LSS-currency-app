const User = require("../models/user");
const Trainee = require("../models/trainee");
const bcrypt = require("bcrypt");
const getNavFields = require("../views/navBar");

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
        homes.trainee = "/trainees/" + user.traineeId.toString();
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
  const users = await User.find({}).sort({ createdAt: 1 });
  const accountNames = {
    admin: "Administrator",
    trainee: "Aircrew",
    traineeAdmin: "Aircrew Administrator",
    trainer: "Vendor",
  };
  users.map((user) => (user.account = accountNames[user.account]));
  const navFields = getNavFields(req.session.account);
  res.render("users/index", { users, navFields });
};

const newUser = (req, res) => {
  const navFields = getNavFields(req.session.account);
  res.render("users/new", { message: "", navFields });
};

const create = async (req, res) => {
  const { userId, password, confirmPassword } = req.body;
  console.log("waiting to find users");
  const users = await User.find({}, "userId");
  console.log(`found ${users.length} users`);
  const userIds = users.map((user) => user.userId);

  const navFields = getNavFields(req.session.account);
  if (userIds.includes(userId)) {
    res.render("users/new", {
      message: "Username already taken",
      navFields,
    });
    return;
  }
  if (password !== confirmPassword) {
    res.render("users/new", {
      message: "Passwords do not match",
      navFields,
    });
    return;
  }

  req.body.password = await bcrypt.hash(password, saltRounds);
  await User.create(req.body);

  res.redirect("/users");
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (deletedUser.account === "trainee") {
    await Trainee.findByIdAndDelete(deletedUser.traineeId);
  }

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
};

const Trainee = require("../models/trainee");
const Training = require("../models/training");
const User = require("../models/user");
const dayjs = require("dayjs");

const requirements = require("../currencyRequirements");

const index = async (req, res) => {
  const trainees = await Trainee.find({});
  res.render("trainees/index", {
    trainees,
    getOverallStatus: requirements.getOverallStatus,
    dayjs,
  });
};

const show = async (req, res) => {
  const { traineeId } = req.params;
  const trainee = await Trainee.findById(traineeId);
  const nextBooked = {};
  const statuses = {};
  for (const currency of trainee.currencies) {
    const booking = await Training.findOne(
      {
        type: currency.type,
        trainees: traineeId,
      },
      "end"
    );
    if (booking) {
      nextBooked[currency.type] = booking;
    }
    statuses[currency.type] = requirements.status(currency.expiry);
  }
  const overallStatus = requirements.getOverallStatus(trainee);

  res.render("trainees/show", {
    trainee,
    nextBooked,
    statuses,
    overallStatus,
    dayjs,
  });
};

const newTrainee = (req, res) => {
  const requirementNames = requirements.names;
  res.render("trainees/new", { requirementNames, message: "" });
};

const create = async (req, res) => {
  const users = await User.find({}, "userId");
  const userIds = users.map((user) => user.userId);
  const { userId, password, confirmPassword } = req.body;
  if (userIds.includes(userId)) {
    res.render("/trainees/new", {
      requirementNames,
      message: "Username already taken",
    });
  } else {
    if (password !== confirmPassword) {
      res.render("/trainees/new", {
        requirementNames,
        message: "Passwords must match",
      });
    } else {
      const newUser = {
        userId: req.body.userId,
        password: req.body.password,
        account: "trainee",
      };

      const newTrainee = {};
      const trainee = await Trainee.create(
        fillTraineeFromBody(newTrainee, req.body)
      );

      newUser.traineeId = trainee._id;
      await User.create(newUser);
      res.redirect("/trainees");
    }
  }
};

const deleteTrainee = async (req, res) => {
  const { traineeId } = req.params;
  await Trainee.findByIdAndDelete(traineeId);
  res.redirect("/trainees");
};

const edit = async (req, res) => {
  const { traineeId } = req.params;
  const trainee = await Trainee.findById(traineeId);
  //   res.send(JSON.stringify(trainee));
  const requirementNames = requirements.names;
  res.render("trainees/edit", {
    trainee,
    message: "",
    requirementNames,
    dayjs,
  });
};

const update = async (req, res) => {
  const { traineeId } = req.params;

  const trainee = await Trainee.findById(traineeId);
  await fillTraineeFromBody(trainee, req.body).save();

  res.redirect(/trainees/ + trainee._id);
};

const fillTraineeFromBody = (newTrainee, body) => {
  newTrainee.name = body.name.trim();
  newTrainee.dOB = body.dOB;
  newTrainee.seniority = body.seniority;
  newTrainee.contact = body.contact;
  newTrainee.vehNum = body.vehNum;
  newTrainee.currencies = [];
  requirements.names.forEach((name) => {
    const currency = {
      type: name,
      expiry: body[name],
    };
    newTrainee.currencies.push(currency);
  });
  return newTrainee;
};

module.exports = {
  index,
  show,
  new: newTrainee,
  create,
  delete: deleteTrainee,
  edit,
  update,
};

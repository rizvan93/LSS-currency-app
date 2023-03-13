const Trainee = require("../models/trainee");
const Training = require("../models/training");
const mongoose = require("mongoose");
const dayjs = require("dayjs");

const requirements = require("../currencyRequirements");
const requirementNames = Object.keys(requirements);

const seed = async (req, res) => {
  const trainings = await Training.find({});
  const trainingId = trainings[0]._id;
  const newTrainee = {
    name: "trainee3",
    currencies: [
      {
        type: "req1",
        lastAttended: Date(2023, 10, 25),
      },
      { type: "req2", lastAttended: Date(2023, 01, 12) },
      {
        type: "req3",
        lastAttended: Date(2022, 2, 15),
      },
    ],
  };
  try {
    await Trainee.create(newTrainee);
    res.send(JSON.stringify(newTrainee) + " created");
  } catch (error) {
    res.send("Unable to create trainee" + error);
  }
};

const index = async (req, res) => {
  const trainees = await Trainee.find({});
  res.render("trainees/index", { trainees });
};

const show = async (req, res) => {
  const { id } = req.params;
  const trainee = await Trainee.findById(id);
  const nextBooked = {};
  for (currency of trainee.currencies) {
    const booking = await Training.findOne(
      {
        type: currency.type,
        trainees: id,
      },
      "end"
    );
    if (booking) {
      nextBooked[currency.type] = booking;
    }
  }
  console.log(nextBooked);
  res.render("trainees/show", { trainee, nextBooked, dayjs });
  //   res.send("show trainee currency 2: " + "\n" + trainee.currencies[2]);
};

const newTrainee = (req, res) => {
  res.render("trainees/new", { requirementNames, message: "" });
};

const create = async (req, res) => {
  const newTrainee = {};
  newTrainee.name = req.body.name.trim();
  newTrainee.currencies = [];
  requirementNames.forEach((requirementName) => {
    const currency = {
      type: requirementName,
      lastAttended: req.body[requirementName],
    };
    newTrainee.currencies.push(currency);
  });

  await Trainee.create(newTrainee);
  res.redirect("/trainees");
};

const deleteTrainee = async (req, res) => {
  const { id } = req.params;
  await Trainee.findByIdAndDelete(id);
  res.redirect("/trainees");
};

const edit = async (req, res) => {
  const { id } = req.params;
  const trainee = await Trainee.findById(id);
  //   res.send(JSON.stringify(trainee));
  res.render("trainees/edit", {
    trainee,
    message: "",
    requirementNames,
    dayjs,
  });
};

const update = async (req, res) => {};

module.exports = {
  seed,
  index,
  show,
  new: newTrainee,
  create,
  delete: deleteTrainee,
  edit,
  update,
};

const Training = require("../models/training");
const Trainees = require("../models/trainee");
const dayjs = require("dayjs");
const requirements = require("../config/requirements");

const requirementNames = Object.keys(requirements);

const seed = async (req, res) => {
  const newTraining = {
    type: "req3",
    capacity: 10,
    date: Date(2023, 6, 8),
    startTime: "1300",
    endTime: "1500",
  };
  try {
    await Training.create(newTraining);
    res.send(JSON.stringify(newTraining) + " created");
  } catch (error) {
    res.send("unable to create. " + error);
  }
};

const index = async (req, res) => {
  const trainings = await Training.find({});
  res.render("trainings/index", { trainings, dayjs });
};

const show = async (req, res) => {
  const { id } = req.params;
  const training = await Training.findById(id);
  const trainees = await Trainees.find({
    "currencies.nextBooked": id,
  });

  res.render("trainings/show", { training, trainees, dayjs });
  // res.send("show users: " + users);
};

const newTraining = (req, res) => {
  // res.send("new training");
  res.render("trainings/new", { requirementNames });
};

const create = async (req, res) => {
  const newTraining = req.body;
  await Training.create(newTraining);
  res.redirect("/trainings");
};

const edit = async (req, res) => {
  const { id } = req.params;
  res.send("edit this document: " + id);
};

const update = async (req, res) => {
  res.send("update document");
};

const deleteTraining = async (req, res) => {
  const { id } = req.params;
  await Training.findByIdAndDelete(id);
  res.redirect("/trainings");
};

module.exports = {
  index,
  seed,
  show,
  new: newTraining,
  create,
  edit,
  update,
  delete: deleteTraining,
};

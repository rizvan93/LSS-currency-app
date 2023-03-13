const Training = require("../models/training");
const Trainees = require("../models/trainee");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
const requirements = require("../currencyRequirements");

const requirementNames = Object.keys(requirements);

const seed = async (req, res) => {
  const newTraining = {
    type: "req3",
    capacity: 15,
    start: dayjs("15-07-2023, 09:00", "DD-MM-YYYY, HH:mm"),
    end: dayjs("15-07-2023, 12:00", "DD-MM-YYYY, HH:mm"),
    remarks: "",
    trainees: ["640a8ccb261aa20ab037447d"],
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
  const training = await Training.findById(id).populate("trainees");

  console.log(training.trainees);
  res.render("trainings/show", { training, dayjs });
  // res.send("show users: " + users);
};

const newTraining = (req, res) => {
  // res.send("new training");
  res.render("trainings/new", { requirementNames });
};

const create = async (req, res) => {
  const newTraining = req.body;
  newTraining.start = dayjs(
    newTraining.startDate + " " + newTraining.startTime,
    "YYYY-MM-DD HH:mm"
  );
  newTraining.end = dayjs(
    newTraining.endDate + " " + newTraining.endTime,
    "YYYY-MM-DD HH:mm"
  );
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

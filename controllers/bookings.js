const Training = require("../models/training");
const dayjs = require("dayjs");
const getNavFields = require("../views/navBar");

const newBooking = async (req, res) => {
  const { traineeId, type } = req.params;
  const trainings = await Training.find({ type: type, complete: false });

  const navFields = {
    Back: "/trainees/" + traineeId,
    ...getNavFields(req.session.account),
  };
  res.render("bookings/new", { trainings, traineeId, type, dayjs, navFields });
};

const create = async (req, res) => {
  //   res.send("confirm this booking");
  const { traineeId, trainingId } = req.body;
  const update = { $push: { trainees: traineeId } };
  await Training.findByIdAndUpdate(trainingId, update);
  res.redirect("/trainees/" + traineeId);
};

const edit = async (req, res) => {
  const { trainingId, traineeId } = req.params;
  const { type } = await Training.findById(trainingId);
  const trainings = await Training.find({ type: type, complete: false });

  const navFields = {
    Back: "/trainees/" + traineeId,
    ...getNavFields(req.session.account),
  };
  res.render("bookings/edit", {
    trainings,
    traineeId,
    type,
    trainingId,
    dayjs,
    navFields,
  });
};

const update = async (req, res) => {
  const { trainingId } = req.params;
  const { traineeId, previousBooking } = req.body;

  const training = await Training.findById(previousBooking);
  const index = training.trainees.indexOf(traineeId.toString());
  training.trainees.splice(index, 1);
  await training.save();

  const newTraining = await Training.findById(trainingId);
  newTraining.trainees.push(traineeId);
  await newTraining.save();

  res.redirect("/trainees/" + traineeId);
};

const deleteBooking = async (req, res) => {
  const { trainingId } = req.params;
  const { traineeId } = req.body;

  const training = await Training.findById(trainingId);
  const index = training.trainees.indexOf(traineeId.toString());
  training.trainees.splice(index, 1);
  await training.save();

  res.redirect("/trainees/" + traineeId);
};

module.exports = {
  new: newBooking,
  create,
  edit,
  update,
  delete: deleteBooking,
};

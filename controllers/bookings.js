const Training = require("../models/training");
const dayjs = require("dayjs");

const newBooking = async (req, res) => {
  const { traineeId, type } = req.params;
  const trainings = await Training.find({ type: type });

  res.render("bookings/new", { trainings, traineeId, type, dayjs });
};

const create = async (req, res) => {
  //   res.send("confirm this booking");
  const { traineeId, trainingId } = req.body;
  const update = { $push: { trainees: traineeId } };
  const updatedTraining = await Training.findByIdAndUpdate(trainingId, update);
  res.redirect("/trainees/" + traineeId);
};

const edit = async (req, res) => {
  const { id, traineeId } = req.params;
  const { type } = await Training.findById(id, "type");
  const trainings = await Training.find({ type: type });

  res.render("bookings/edit", { trainings, traineeId, type, id, dayjs });
};

const update = (req, res) => {
  const { id } = req.params;
  const { traineeId, previousBooking } = req.body;
  res.send(`Change ${previousBooking} to ${id} for ${traineeId}`);
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  const { traineeId } = req.body;
  const training = await Training.findById(id);

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

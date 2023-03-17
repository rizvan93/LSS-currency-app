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

  await book(traineeId, trainingId);
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

  await unbook(traineeId, previousBooking);
  await book(traineeId, trainingId);
  await updateWaitlist(previousBooking);

  res.redirect("/trainees/" + traineeId);
};

const deleteBooking = async (req, res) => {
  const { trainingId } = req.params;
  const { traineeId } = req.body;

  await unbook(traineeId, trainingId);
  await updateWaitlist(trainingId);

  res.redirect("/trainees/" + traineeId);
};

const updateWaitlist = async (trainingId) => {
  const training = await Training.findById(trainingId);
  if (training.trainees.length < training.capacity) {
    if (training.waitlist.length) {
      const trainee = training.waitlist.shift();
      training.trainees.push(trainee);
    }
    await training.save();
  }
};

const book = async (traineeId, trainingId) => {
  const training = await Training.findById(trainingId);
  if (training.trainees.length < training.capacity) {
    training.trainees.push(traineeId);
  } else {
    training.waitlist.push(traineeId);
  }
  await training.save();
};

const unbook = async (traineeId, trainingId) => {
  console.log("within unbook function");
  const training = await Training.findById(trainingId);
  const index = training.trainees.indexOf(traineeId.toString());
  if (index >= 0) {
    console.log("delete trainee");
    training.trainees.splice(index, 1);
  } else {
    console.log("index:" + index);
    const waitlistIndex = training.waitlist.indexOf(traineeId.toString());
    training.waitlist.splice(waitlistIndex, 1);
  }
  console.log(training);
  await training.save();
};

module.exports = {
  new: newBooking,
  create,
  edit,
  update,
  delete: deleteBooking,
};

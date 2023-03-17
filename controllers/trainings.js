const Training = require("../models/training");
const Trainee = require("../models/trainee");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
const requirements = require("../currencyRequirements");
const getNavFields = require("../views/navBar");

const index = async (req, res) => {
  const trainings = await Training.find({}).sort({ start: 1 });
  const navFields = getNavFields(req.session.account);
  res.render("trainings/index", { trainings, dayjs, navFields });
};

const show = async (req, res) => {
  const { trainingId } = req.params;
  const training = await Training.findById(trainingId).populate("trainees");

  let navFields = getNavFields(req.session.account);
  if (req.session.account === "trainee") {
    navFields = {
      Back: "/trainees/" + req.session.traineeId,
      ...navFields,
    };
  }
  res.render("trainings/show", { training, dayjs, navFields });
};

const newTraining = (req, res) => {
  const navFields = getNavFields(req.session.account);
  res.render("trainings/new", {
    requirementNames: requirements.names,
    navFields,
  });
};

const create = async (req, res) => {
  await Training.create(fillTrainingFromBody(req.body));
  res.redirect("/trainings");
};

const edit = async (req, res) => {
  const { trainingId } = req.params;
  const training = await Training.findById(trainingId);

  const navFields = getNavFields(req.session.account);
  res.render("trainings/edit", {
    training,
    dayjs,
    requirementNames: requirements.names,
    navFields,
  });
};

const update = async (req, res) => {
  const { trainingId } = req.params;
  await Training.findByIdAndUpdate(trainingId, fillTrainingFromBody(req.body));

  res.redirect("/trainings");
};

const deleteTraining = async (req, res) => {
  const { trainingId } = req.params;
  await Training.findByIdAndDelete(trainingId);
  res.redirect("/trainings");
};

const fillTrainingFromBody = (body) => {
  const newTraining = body;
  newTraining.start = dayjs(
    newTraining.startDate + " " + newTraining.startTime,
    "YYYY-MM-DD HH:mm"
  );
  newTraining.end = dayjs(
    newTraining.endDate + " " + newTraining.endTime,
    "YYYY-MM-DD HH:mm"
  );
  return newTraining;
};

const updateTrainees = async (req, res) => {
  const attendees = Object.keys(req.body);
  const { trainingId } = req.params;

  const training = await Training.findById(trainingId);

  for (const attendee of attendees) {
    const trainee = await Trainee.findById(attendee);
    const index = trainee.currencies.findIndex(
      (currency) => currency.type === training.type
    );

    requirements.updateExpiries(
      trainee.currencies,
      training,
      trainee.seniority
    );

    await trainee.save();
  }

  await Training.findByIdAndUpdate(trainingId, {
    trainees: attendees,
    complete: true,
  });

  res.redirect("/trainings/" + trainingId);
};

module.exports = {
  index,
  show,
  new: newTraining,
  create,
  edit,
  update,
  delete: deleteTraining,
  updateTrainees,
};

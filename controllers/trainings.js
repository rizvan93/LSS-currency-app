const Training = require("../models/training");
const Trainee = require("../models/trainee");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
const requirements = require("../currencyRequirements");

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
  const { trainingId } = req.params;
  const training = await Training.findById(trainingId).populate("trainees");

  res.render("trainings/show", { training, dayjs });
};

const newTraining = (req, res) => {
  res.render("trainings/new", { requirementNames: requirements.names });
};

const create = async (req, res) => {
  await Training.create(fillTrainingFromBody(req.body));
  res.redirect("/trainings");
};

const edit = async (req, res) => {
  const { trainingId } = req.params;
  const training = await Training.findById(trainingId);
  res.render("trainings/edit", {
    training,
    dayjs,
    requirementNames: requirements.names,
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
  const getNextExpiry = requirements.nextExpiries[training.type];

  for (const attendee of attendees) {
    const trainee = await Trainee.findById(attendee);
    const index = trainee.currencies.findIndex(
      (currency) => currency.type === training.type
    );
    const expiry = trainee.currencies[index].expiry;

    trainee.currencies[index].expiry = getNextExpiry(
      expiry,
      training.end,
      trainee.seniority
    );
    // if (training.type === "DFS Refresher") {
    //   const indexYOGA = trainee.currencies.findIndex(
    //     (currency) => currency.type === "DFS YOGA"
    //   );
    //   trainee.currencies[indexYOGA].expiry = trainee.currencies[index].expiry;
    // }
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
  seed,
  show,
  new: newTraining,
  create,
  edit,
  update,
  delete: deleteTraining,
  updateTrainees,
};

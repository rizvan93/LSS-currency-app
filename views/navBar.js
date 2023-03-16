const admin = {
  Users: "/users",
  Aircrew: "/trainees",
  Trainings: "/trainings",
};

const traineeAdmin = {
  Aircrew: "/trainees",
  Trainings: "/trainings",
};

const trainees = traineeAdmin;

const trainer = {
  Trainings: "/trainings",
};

const fields = {
  admin,
  traineeAdmin,
  trainees,
  trainer,
};

module.exports = (account) => fields[account];

var express = require("express");
var router = express.Router();
const traineeCtrl = require("../controllers/trainees");
const { isAuth, isTrainee } = require("../controllers/isAuth");

router.get("/", isAuth(["admin", "traineeAdmin"]), traineeCtrl.index);

router.get("/new", isAuth(["admin", "traineeAdmin"]), traineeCtrl.new);

router.get(
  "/:traineeId",
  isAuth(["admin", "traineeAdmin", "trainee"]),
  isTrainee,
  traineeCtrl.show
);

router.post("/", isAuth(["admin", "traineeAdmin"]), traineeCtrl.create);

router.delete(
  "/:traineeId",
  isAuth(["admin", "traineeAdmin"]),
  traineeCtrl.delete
);

router.get(
  "/:traineeId/edit",
  isAuth(["admin", "traineeAdmin"]),
  isTrainee,
  traineeCtrl.edit
);

router.put(
  "/:traineeId",
  isAuth(["admin", "traineeAdmin"]),
  isTrainee,
  traineeCtrl.update
);

module.exports = router;

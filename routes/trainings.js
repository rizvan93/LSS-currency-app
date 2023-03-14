const express = require("express");
const router = express.Router();
const trainingsCtrl = require("../controllers/trainings");
const { isAuth } = require("../controllers/isAuth");

router.get("/seed", trainingsCtrl.seed);

router.get(
  "/",
  isAuth(["admin", "traineeAdmin", "trainer"]),
  trainingsCtrl.index
);
router.get(
  "/new",
  isAuth(["admin", "traineeAdmin", "trainer"]),
  trainingsCtrl.new
);
router.get(
  "/:trainingId",
  isAuth(["admin", "traineeAdmin", "trainer"]),
  trainingsCtrl.show
);
router.get(
  "/:trainingId/edit",
  isAuth(["admin", "traineeAdmin", "trainer"]),
  trainingsCtrl.edit
);
router.post(
  "/",
  isAuth(["admin", "traineeAdmin", "trainer"]),
  trainingsCtrl.create
);
router.put(
  "/:trainingId",
  isAuth(["admin", "traineeAdmin", "trainer"]),
  trainingsCtrl.update
);
router.delete(
  "/:trainingId",
  isAuth(["admin", "traineeAdmin", "trainer"]),
  trainingsCtrl.delete
);

module.exports = router;

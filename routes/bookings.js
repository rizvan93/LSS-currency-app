var express = require("express");
var router = express.Router();
const bookingCtrl = require("../controllers/bookings");
const { isAuth, isTrainee } = require("../controllers/isAuth");

router.get(
  "/new/:traineeId/:type/",
  isAuth(["trainee", "trainer"]),
  isTrainee,
  bookingCtrl.new
);
router.post("/", isAuth(["trainee", "trainer"]), bookingCtrl.create);
router.get(
  "/edit/:trainingId/:traineeId/",
  isAuth(["trainee", "trainer"]),
  isTrainee,
  bookingCtrl.edit
);
router.put(
  "/:trainingId",
  isAuth(["trainee", "trainer"]),
  isTrainee,
  bookingCtrl.update
);
router.delete(
  "/:trainingId",
  isAuth(["trainee", "trainer"]),
  isTrainee,
  bookingCtrl.delete
);

module.exports = router;

var express = require("express");
var router = express.Router();
const bookingCtrl = require("../controllers/bookings");
const { isAuth, isTrainee } = require("../controllers/isAuth");

router.get(
  "/new/:traineeId/:type/",
  isAuth(["trainee"]),
  isTrainee,
  bookingCtrl.new
);
router.post("/", isAuth(["trainee"]), bookingCtrl.create);
router.get(
  "/edit/:trainingId/:traineeId/",
  isAuth(["trainee"]),
  isTrainee,
  bookingCtrl.edit
);
router.put("/:trainingId", isAuth(["trainee"]), isTrainee, bookingCtrl.update);
router.delete(
  "/:trainingId",
  isAuth(["trainee"]),
  isTrainee,
  bookingCtrl.delete
);

module.exports = router;

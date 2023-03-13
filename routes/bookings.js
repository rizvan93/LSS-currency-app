var express = require("express");
var router = express.Router();
const bookingCtrl = require("../controllers/bookings");

router.get("/new/:traineeId/:type/", bookingCtrl.new);
router.post("/", bookingCtrl.create);
router.get("/edit/:id/:traineeId/", bookingCtrl.edit);

module.exports = router;

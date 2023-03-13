var express = require("express");
var router = express.Router();
const bookingCtrl = require("../controllers/bookings");

router.get("/new/:traineeId/:type/", bookingCtrl.new);
router.post("/", bookingCtrl.create);
router.get("/edit/:id/:traineeId/", bookingCtrl.edit);
router.put("/:id", bookingCtrl.update);
router.delete("/:id", bookingCtrl.delete);

module.exports = router;

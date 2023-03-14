var express = require("express");
var router = express.Router();
const userCtrl = require("../controllers/users");
const { isAuth } = require("../controllers/isAuth");

router.get("/seedAdmin", userCtrl.seedAdmin);
router.get("/seed/:traineeId", userCtrl.seedTrainee);

router.get("/", userCtrl.login);
router.post("/", userCtrl.authenticate);

router.get("/users", isAuth(["admin"]), userCtrl.index);

module.exports = router;

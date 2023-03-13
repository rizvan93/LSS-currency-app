var express = require("express");
var router = express.Router();
const traineeCtrl = require("../controllers/trainees");

router.get("/seed", traineeCtrl.seed);

router.get("/", traineeCtrl.index);
router.get("/new", traineeCtrl.new);
router.get("/:id", traineeCtrl.show);
router.post("/", traineeCtrl.create);
router.delete("/:id", traineeCtrl.delete);
router.get("/:id/edit", traineeCtrl.edit);
router.put("/id", traineeCtrl.update);

module.exports = router;

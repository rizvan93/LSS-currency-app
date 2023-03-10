const express = require("express");
const router = express.Router();
const trainingsCtrl = require("../controllers/trainings");

router.get("/seed", trainingsCtrl.seed);

router.get("/", trainingsCtrl.index);
router.get("/new", trainingsCtrl.new);
router.get("/:id", trainingsCtrl.show);
router.get("/:id/edit", trainingsCtrl.edit);
router.post("/", trainingsCtrl.create);
router.put("/:id", trainingsCtrl.update);
router.delete("/:id", trainingsCtrl.delete);

module.exports = router;

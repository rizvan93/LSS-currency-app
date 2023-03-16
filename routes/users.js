var express = require("express");
var router = express.Router();
const userCtrl = require("../controllers/users");
const { isAuth } = require("../controllers/isAuth");

router.get("/", userCtrl.login);
router.post("/", userCtrl.authenticate);
router.get("/logout", userCtrl.logout);

router.get("/users", isAuth(["admin"]), userCtrl.index);
router.get("/users/new", isAuth(["admin"]), userCtrl.new);
router.post("/users", isAuth(["admin"]), userCtrl.create);
router.delete("/users/:id", isAuth(["admin"]), userCtrl.delete);

module.exports = router;

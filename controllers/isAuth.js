const auth = true;

const isAuth = (accounts) => {
  return (req, res, next) => {
    if (auth) {
      if (accounts.includes(req.session.account)) {
        next();
      } else {
        console.log("isAuth failed");
        console.log(`searching for ${req.session.account} within`);
        console.log(accounts);
        res.redirect(403, req.session.home || "/");
      }
    } else {
      next();
    }
  };
};

const isTrainee = (req, res, next) => {
  if (auth) {
    if (req.session.account === "trainee") {
      const { id } = req.params;
      if (req.sessions.traineeId === id) {
        next();
      } else {
        console.log("isTrainee failed");
        res.redirect(403, req.session.home || "/");
      }
    } else {
      next();
    }
  } else {
    next();
  }
};

module.exports = {
  isAuth,
  isTrainee,
};

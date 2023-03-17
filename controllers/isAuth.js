const auth = true;

const isAuth = (accounts) => {
  return (req, res, next) => {
    if (auth) {
      if (accounts.includes(req.session.account)) {
        next();
      } else {
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
      const { traineeId } = req.params;
      if (req.session.traineeId === traineeId) {
        next();
      } else {
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

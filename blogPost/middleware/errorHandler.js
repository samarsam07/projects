const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    title: "Error",
    message: err.message,
    user: req.user,
  });
};

module.exports = errorHandler;

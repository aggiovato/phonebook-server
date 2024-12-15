const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).json({ error: "Malformatted ID" });
  }

  next(err); // pass the error to the Express error handler
};

module.exports = errorHandler;

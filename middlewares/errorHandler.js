const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).json({ error: "Malformatted ID" });
  } else if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({ error: messages.join(", ") });
  }

  next(err); // pass the error to the Express error handler
};

module.exports = errorHandler;

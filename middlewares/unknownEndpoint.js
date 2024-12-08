// This middleware handles unknown endpoints

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
};

module.exports = unknownEndpoint;

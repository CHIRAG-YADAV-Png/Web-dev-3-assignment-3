// Runs when a route does not exist
const notFound = (req, res) => {
  res.status(404).json({ message: "Route not found" });
};

// One place to handle all errors
const errorHandler = (err, req, res, next) => {
  // Schema validation failed (e.g. missing name, negative price)
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: "Validation failed", errors });
  }

  // Duplicate SKU
  if (err.code === 11000) {
    return res.status(409).json({ message: "SKU already exists" });
  }

  console.log(err);
  res.status(500).json({ message: "Server error" });
};

module.exports = { notFound, errorHandler };

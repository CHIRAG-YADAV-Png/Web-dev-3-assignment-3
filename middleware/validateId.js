const mongoose = require("mongoose");

// Stops the request if the id in the URL is not a valid MongoDB id
const validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  next();
};

module.exports = validateId;

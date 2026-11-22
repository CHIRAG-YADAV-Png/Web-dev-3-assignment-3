const express = require("express");
const router = express.Router();

const validateId = require("../middleware/validateId");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  adjustStock,
  deleteProduct,
  getLowStock,
  getSummary,
} = require("../controllers/productController");

router.post("/", createProduct);
router.get("/", getProducts);

// These two must come BEFORE "/:id", otherwise "low-stock" is treated as an id
router.get("/low-stock", getLowStock);
router.get("/summary", getSummary);

router.get("/:id", validateId, getProductById);
router.put("/:id", validateId, updateProduct);
router.patch("/:id/stock", validateId, adjustStock);
router.delete("/:id", validateId, deleteProduct);

module.exports = router;

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    sku: { type: String, required: [true, "SKU is required"], unique: true, uppercase: true, trim: true },
    category: { type: String, required: [true, "Category is required"], trim: true },
    price: { type: Number, required: [true, "Price is required"], min: [0, "Price cannot be negative"] },
    quantity: { type: Number, required: [true, "Quantity is required"], min: [0, "Quantity cannot be negative"] },
    reorderLevel: { type: Number, default: 10, min: [0, "Reorder level cannot be negative"] },
    supplier: { type: String, trim: true },
  },
  {
    timestamps: true,            // adds createdAt and updatedAt
    toJSON: { virtuals: true },  // shows stockValue and id in the output
  }
);

// stockValue = price x quantity (calculated automatically)
productSchema.virtual("stockValue").get(function () {
  return this.price * this.quantity;
});

module.exports = mongoose.model("Product", productSchema);

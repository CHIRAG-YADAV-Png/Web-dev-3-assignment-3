require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(express.json());              // read JSON request bodies
app.use("/api/products", productRoutes);
app.use(notFound);                    // unknown routes
app.use(errorHandler);                // all errors

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
  });
});

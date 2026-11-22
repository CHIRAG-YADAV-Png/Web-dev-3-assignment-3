require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  { name: "Study Table", sku: "FURN-TB-812", category: "Furniture", price: 3999, quantity: 2, reorderLevel: 4, supplier: "IKEA India" },
  { name: "Office Chair", sku: "FURN-CH-101", category: "Furniture", price: 5499, quantity: 15, reorderLevel: 5, supplier: "Godrej Interio" },
  { name: "Laptop 15 inch", sku: "ELEC-LP-201", category: "Electronics", price: 55000, quantity: 5, reorderLevel: 5, supplier: "Dell India" },
  { name: "Wireless Mouse", sku: "ELEC-MS-202", category: "Electronics", price: 799, quantity: 40, reorderLevel: 10, supplier: "Logitech" },
  { name: "Bluetooth Speaker", sku: "ELEC-SP-203", category: "Electronics", price: 2499, quantity: 30, reorderLevel: 8, supplier: "boAt" },
  { name: "Smartphone", sku: "ELEC-PH-204", category: "Electronics", price: 18999, quantity: 21, reorderLevel: 6, supplier: "Samsung" },
  { name: "Cotton T-Shirt", sku: "APRL-TS-301", category: "Apparel", price: 499, quantity: 50, reorderLevel: 15, supplier: "Allen Solly" },
  { name: "Denim Jacket", sku: "APRL-JK-302", category: "Apparel", price: 2299, quantity: 3, reorderLevel: 8, supplier: "Levis" },
  { name: "Gel Pen Pack of 10", sku: "STNY-PN-401", category: "Stationery", price: 100, quantity: 80, reorderLevel: 20, supplier: "Cello Pens" },
  { name: "A4 Notebook", sku: "STNY-NB-402", category: "Stationery", price: 60, quantity: 12, reorderLevel: 25, supplier: "Classmate" },
  { name: "Basmati Rice 5kg", sku: "GROC-RC-501", category: "Grocery", price: 650, quantity: 45, reorderLevel: 15, supplier: "India Gate" },
  { name: "Olive Oil 1L", sku: "GROC-OL-502", category: "Grocery", price: 799, quantity: 4, reorderLevel: 10, supplier: "Figaro" },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Seeded " + products.length + " products");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

seedData();

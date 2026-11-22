const Product = require("../models/Product");

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const { category, search, minPrice, maxPrice, sort } = req.query;

    
    const filter = {};
    if (category) {
      filter.category = new RegExp("^" + category + "$", "i"); 
    }
    if (search) {
      filter.name = new RegExp(search, "i");
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortBy = "-createdAt";
    if (sort) {
      sortBy = sort.split(",").join(" ");
    }

    
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter).sort(sortBy).skip(skip).limit(limit);

    res.json({
      total: total,
      page: page,
      totalPages: Math.ceil(total / limit),
      count: products.length,
      products: products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};


const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,          
      runValidators: true, 
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};


const adjustStock = async (req, res, next) => {
  try {
    const change = req.body.change;

    if (typeof change !== "number" || change === 0) {
      return res.status(400).json({ message: "'change' must be a non-zero number" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.quantity + change < 0) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    product.quantity = product.quantity + change;
    await product.save();

    res.json({ message: "Stock updated", product: product });
  } catch (error) {
    next(error);
  }
};


const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted", id: product._id });
  } catch (error) {
    next(error);
  }
};


const getLowStock = async (req, res, next) => {
  try {
    const lowStockItems = await Product.find({
      $expr: { $lte: ["$quantity", "$reorderLevel"] },
    });
    res.json({ count: lowStockItems.length, lowStockItems: lowStockItems });
  } catch (error) {
    next(error);
  }
};


const getSummary = async (req, res, next) => {
  try {
    const summary = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          totalItems: { $sum: 1 },
          totalQuantity: { $sum: "$quantity" },
          totalStockValue: { $sum: { $multiply: ["$price", "$quantity"] } },
          avgPrice: { $avg: "$price" },
        },
      },
      { $sort: { totalStockValue: -1 } },
    ]);
    res.json({ categories: summary.length, summary: summary });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  adjustStock,
  deleteProduct,
  getLowStock,
  getSummary,
};

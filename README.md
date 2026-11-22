# Inventory and Data Management System

Node.js + Express + MongoDB (Mongoose) + dotenv

## How to run
1. `npm install`
2. Start MongoDB (or put your Atlas link in `.env`)
3. `npm run seed`   (optional - adds 12 sample products)
4. `npm start`      -> http://localhost:5000

## Folder structure
- `server.js` - starts the app
- `config/db.js` - MongoDB connection
- `models/Product.js` - schema and validation
- `routes/productRoutes.js` - URL list
- `controllers/productController.js` - logic for each URL
- `middleware/validateId.js` - checks the id in the URL
- `middleware/errorHandler.js` - handles all errors
- `seed.js` - sample data

## API
| Method | URL | Purpose |
|---|---|---|
| POST | /api/products | Create |
| GET | /api/products | List (category, search, minPrice, maxPrice, sort, page, limit) |
| GET | /api/products/:id | Get one |
| PUT | /api/products/:id | Update details |
| PATCH | /api/products/:id/stock | `{"change": 10}` restock, `{"change": -5}` sale |
| DELETE | /api/products/:id | Delete |
| GET | /api/products/low-stock | quantity <= reorderLevel |
| GET | /api/products/summary | Category-wise summary |

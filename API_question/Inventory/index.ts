import express from 'express';
import mongoose from 'mongoose';
import { Product, ProductDocument } from './Product';

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/inventory');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Create a product
app.post('/inventory/products', async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const product = new Product({ name, price, quantity });
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all products
app.get('/inventory/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a product by ID
app.get('/inventory/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a product's quantity
app.put('/inventory/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const product = await Product.findByIdAndUpdate(id, { quantity }, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Import products from a CSV file
app.post('/inventory/import', async (req, res) => {
  try {
    const { filename } = req.body;
    // Read the CSV file
    // ...
    // Parse the CSV data
    // ...
    // Insert the products into the database
    // ...
    res.json({ message: 'Import successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
const port = 3002;
app.listen(port, () => {
  console.log(`Inventory server listening at http://localhost:${port}`);
});

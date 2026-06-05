import Product from '../models/productModel.js';

// Get all products
const getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.status(200).json(products);
};

// Get single product
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(product);
};

// Create product
const createProduct = async (req, res) => {
  const { name, category, brand, price, stock, description, imageUrl } = req.body;

  if (!name || !category || !brand || !price || !stock || !description) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  const product = await Product.create({
    name,
    category,
    brand,
    price,
    stock,
    description,
    imageUrl,
  });

  res.status(201).json(product);
};

// Update product
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedProduct);
};

// Delete product
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  await product.deleteOne();

  res.status(200).json({ message: 'Product deleted successfully' });
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
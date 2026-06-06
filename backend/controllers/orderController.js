import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// Get all orders
const getOrders = async (req, res) => {
  const orders = await Order.find()
    .populate('product', 'name brand category price stock')
    .sort({ createdAt: -1 });

  res.status(200).json(orders);
};

// Create customer order
const createOrder = async (req, res) => {
  const { customerName, productId, quantity, shippingCost } = req.body;

  if (!customerName || !productId || !quantity || shippingCost === undefined) {
    return res.status(400).json({
      message: 'Please fill all required fields',
    });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({
      message: 'Product not found',
    });
  }

  if (product.stock < quantity) {
  return res.status(400).json({
    message: 'Nuk ka stok të mjaftueshëm për këtë produkt',
  });
}

  const unitPrice = product.price;
  const totalPrice = quantity * unitPrice + Number(shippingCost);

  const order = await Order.create({
    customerName,
    product: productId,
    quantity,
    unitPrice,
    shippingCost,
    totalPrice,
    status: 'Completed',
  });

  product.stock = product.stock - quantity;
  await product.save();

  res.status(201).json(order);
};

// Delete order
const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      message: 'Order not found',
    });
  }

  await order.deleteOne();

  res.status(200).json({
    message: 'Order deleted successfully',
  });
};

export { getOrders, createOrder, deleteOrder };
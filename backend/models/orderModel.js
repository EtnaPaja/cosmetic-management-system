import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Please add customer name'],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      required: [true, 'Please add quantity'],
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      required: [true, 'Please add shipping cost'],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Completed',
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
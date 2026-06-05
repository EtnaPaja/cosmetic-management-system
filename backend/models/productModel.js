import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    brand: {
      type: String,
      required: [true, 'Please add a brand'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    stock: {
      type: Number,
      required: [true, 'Please add stock quantity'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
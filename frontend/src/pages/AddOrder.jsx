import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../store/apis/productApi';
import { createOrder } from '../store/apis/orderApi';

function AddOrder() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    customerName: '',
    productId: '',
    quantity: '',
    shippingCost: 3,
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'productId') {
      const product = products.find((p) => p._id === value);
      setSelectedProduct(product);
    }
  };

const total =
  selectedProduct && formData.quantity
      ? Number(selectedProduct.price) * Number(formData.quantity) +
        Number(formData.shippingCost)
      : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createOrder({
        customerName: formData.customerName,
        productId: formData.productId,
        quantity: Number(formData.quantity),
        shippingCost: Number(formData.shippingCost),
      });

      alert('Porosia u krijua me sukses dhe stoku u përditësua');
      navigate('/orders');
    } catch (error) {
      alert(error.response?.data?.message || 'Order failed');
    }
  };

  return (
    <div className="add-product-container">
      <h1>Krijo Porosi Klienti</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="Emri i klientit"
          value={formData.customerName}
          onChange={handleChange}
        />

        <select
          name="productId"
          value={formData.productId}
          onChange={handleChange}
        >
          <option value="">Zgjidh produktin</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name} - Stok: {product.stock} - {product.price} €
            </option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          placeholder="Sasia"
          value={formData.quantity}
          onChange={handleChange}
        />



        {selectedProduct && (
          <div className="order-summary">
            <p>
              <strong>Çmimi për njësi:</strong> {selectedProduct.price} €
            </p>
            <p>
              <strong>Stoku aktual:</strong> {selectedProduct.stock}
            </p>
            <p>
               <strong>Posta:</strong> 3 €
           </p>
            <p>
              <strong>Totali:</strong> {total} €
            </p>
            
          </div>
        )}

        <button type="submit">Krijo Porosi</button>
      </form>
    </div>
  );
}

export default AddOrder;
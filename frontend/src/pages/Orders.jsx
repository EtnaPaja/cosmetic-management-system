import { useEffect, useState } from 'react';
import { getOrders, deleteOrder } from '../store/apis/orderApi';

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this order?')) return;

    await deleteOrder(id);
    fetchOrders();
  };

  return (
    <div>
      <h1>Customer Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="product-card">
          <h3>{order.customerName}</h3>

          <p>
            <strong>Product:</strong> {order.product?.name}
          </p>

          <p>
            <strong>Quantity:</strong> {order.quantity}
          </p>

          <p>
            <strong>Unit Price:</strong> {order.unitPrice} €
          </p>

          <p>
            <strong>Shipping:</strong> {order.shippingCost} €
          </p>

          <p>
            <strong>Total:</strong> {order.totalPrice} €
          </p>

          <button onClick={() => handleDelete(order._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Orders;
import { useEffect, useState } from 'react';
import { getProducts } from '../store/apis/productApi';

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const totalProducts = products.length;

  const productsInStock = products.filter((product) => product.stock > 0).length;

  const lowStockProducts = products.filter(
    (product) => product.stock > 0 && product.stock <= 10
  ).length;

  const totalInventoryValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0
  );

  return (
  <div>
    <h1>Luxury Cosmetics Dashboard</h1>

    <div className="dashboard-grid">

      <div className="dashboard-card">
       <h3>📦 Totali i Produkteve</h3>
        <p>{totalProducts}</p>
      </div>

      <div className="dashboard-card">
        <h3>✅ Produkte në Stok</h3>
        <p>{productsInStock}</p>
      </div>

      <div className="dashboard-card">
        <h3>⚠️ Stok i Ulët</h3>
        <p>{lowStockProducts}</p>
      </div>

      <div className="dashboard-card">
        <h3>💰 Vlera e Inventarit</h3>
        <p>{totalInventoryValue} €</p>
      </div>

    </div>
  </div>
);

}
export default Dashboard;
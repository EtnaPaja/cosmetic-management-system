import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProducts, deleteProduct } from '../store/apis/productApi';

const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replaceAll('ë', 'e')
    .replaceAll('ç', 'c');
};

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchParams] = useSearchParams();
  const stockFilter = searchParams.get('stock');
  const [categoryFilter, setCategoryFilter] = useState('');

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'A jeni i sigurt që dëshironi të fshini këtë produkt?'
    );

    if (!confirmDelete) return;

    await deleteProduct(id);
    fetchProducts();

    alert('Produkti u fshi me sukses');
  };

  const filteredProducts = products.filter((product) => {
  const searchText = normalizeText(search);

  const matchesSearch =
    normalizeText(product.name).includes(searchText) ||
    normalizeText(product.brand).includes(searchText) ||
    normalizeText(product.category).includes(searchText);

  const matchesCategory =
    categoryFilter === '' || product.category === categoryFilter;

  const matchesStock =
    stockFilter === 'in-stock'
      ? product.stock > 0
      : stockFilter === 'low-stock'
      ? product.stock > 0 && product.stock <= 10
      : true;

  return matchesSearch && matchesCategory && matchesStock;
});

  return (
    <div>
      <h1>Cosmetic Products</h1>

      <input
        type="text"
        placeholder="Kërko sipas emrit, markës ose kategorisë..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">Të gjitha kategoritë</option>
        <option value="Fondatinë">Fondatinë</option>
        <option value="Buzëkuq">Buzëkuq</option>
        <option value="Maskara">Maskara</option>
        <option value="Pudër">Pudër</option>
        <option value="Blush">Blush</option>
        <option value="Paletë Hijesh">Paletë Hijesh</option>
        <option value="Korrektor">Korrektor</option>
      </select>

      <Link to="/add-product">
        <button>Add New Product</button>
      </Link>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              src={
                product.imageUrl ||
                'https://placehold.co/600x400?text=Cosmetic+Product'
              }
              alt={product.name}
              className="product-image"
              onError={(e) => {
                e.target.src =
                  'https://placehold.co/600x400?text=Cosmetic+Product';
              }}
            />

            <h3>{product.name}</h3>

            <p>
              <strong>Kategoria:</strong> {product.category}
            </p>

            <p>
              <strong>Marka:</strong> {product.brand}
            </p>

            <p>
              <strong>Çmimi:</strong> {product.price} €
            </p>

            <p>
              <strong>Stoku:</strong> {product.stock}
            </p>

            <p>{product.description}</p>

            <div className="card-buttons">
              <Link to={`/edit-product/${product._id}`}>
                <button>Edit</button>
              </Link>

              <button onClick={() => handleDelete(product._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
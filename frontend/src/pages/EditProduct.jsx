import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../store/apis/productApi';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    stock: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      setFormData(data);
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateProduct(id, formData);

    alert('Produkti u përditësua me sukses');

    navigate('/products');
  };

  return (
    <div>
      <h1>Edito Produkt</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} />
        <input name="category" value={formData.category} onChange={handleChange} />
        <input name="brand" value={formData.brand} onChange={handleChange} />
        <input name="price" value={formData.price} onChange={handleChange} />
        <input name="stock" value={formData.stock} onChange={handleChange} />
        <input name="description" value={formData.description} onChange={handleChange} />
        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />

        <button type="submit">Ruaj Ndryshimet</button>
      </form>
    </div>
  );
}

export default EditProduct;
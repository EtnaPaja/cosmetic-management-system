import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../store/apis/productApi';

function AddProduct() {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createProduct(formData);

    alert('Produkti u shtua me sukses');

    navigate('/products');
  };

  return (
    <div>
      <h1>Shto Produkt</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Emri" onChange={handleChange} />
        <input name="category" placeholder="Kategoria" onChange={handleChange} />
        <input name="brand" placeholder="Marka" onChange={handleChange} />
        <input name="price" placeholder="Cmimi" onChange={handleChange} />
        <input name="stock" placeholder="Stoku" onChange={handleChange} />
        <input name="description" placeholder="Pershkrimi" onChange={handleChange} />
        <input name="imageUrl" placeholder="Image URL" onChange={handleChange} />

        <button type="submit">Shto Produkt</button>
      </form>
    </div>
  );
}

export default AddProduct;
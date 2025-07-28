import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { baseApi } from '../../utils/baseApi';


const AddProduct = () => {
  const { auth } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
  });

  const [imageFile, setImageFile] = useState(null); // new state for image file

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // get file from input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('stock', formData.stock);
    if (imageFile) {
      form.append('images', imageFile);
    }

    try {
      const res = await fetch(baseApi+'/product/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
        body: form,
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Product added successfully!');
        setFormData({
          title: '',
          description: '',
          price: '',
          stock: '',
        });
        setImageFile(null);
      } else {
        alert(data?.message || '❌ Failed to add product');
      }
    } catch (error) {
      console.error(error);
      alert('⚠️ Error submitting product');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h2>Add New Product</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="images"
          onChange={handleImageChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={formData.stock}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;

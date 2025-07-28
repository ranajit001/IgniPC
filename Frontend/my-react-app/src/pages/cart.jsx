import React, { useEffect, useState } from 'react';

const OrdersPage = () => {
  const [deliveredProducts, setDeliveredProducts] = useState([]);
  const [newOrders, setNewOrders] = useState([]);

  useEffect(() => {
    fetch("/api/products") 
      .then(res => res.json())
      .then(data => {
        const delivered = data.filter(p => p.status === 'delivered');
        const ordered = data.filter(p => p.status !='delivered');
        setDeliveredProducts(delivered);
        setNewOrders(ordered);
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Delivered Products</h2>
      <ul>
        {deliveredProducts.map(product => (
          <li key={product._id}>{product.title}</li>
        ))}
      </ul>

      <h2 style={{ marginTop: "30px" }}>New Orders</h2>
      <ul>
        {newOrders.map(product => (
          <li key={product._id}>{product.title}</li>
        ))}
      </ul>
      <style>{`.delivered-products-container {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.product-card {
  flex: 1 1 calc(25% - 1rem);
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  background-color: #fff;
  transition: box-shadow 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-title {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.product-description {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1rem;
  font-weight: bold;
  color: #1a8917;
}

.product-image {
  width: 100%;
  max-height: 160px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}
`}</style>
    </div>
  );
};

export default OrdersPage;

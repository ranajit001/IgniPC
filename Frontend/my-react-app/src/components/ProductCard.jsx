

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    console.log(`Added to cart: ${product.title}`);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.images[0]} alt={product.title} />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-price">${product.price.toFixed(2)}</div>
        <div className="product-description">{product.description}</div>
        <button onClick={handleAddToCart}>{product.stock>0?'Add to Cart':'Out of Stock'}</button>
      </div>
      <style>{`.product-card {
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.2s ease;
}

.product-card:hover {
  transform: scale(1.02);
}

.product-image {
  width: 100%;
  height: 180px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

.product-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

.product-price {
  font-size: 16px;
  color: #2a9d8f;
  font-weight: bold;
  margin-bottom: 8px;
}

.product-description {
  font-size: 14px;
  color: #555;
  margin-bottom: 12px;
  min-height: 40px;
}

.product-info button {
  padding: 8px 12px;
  background-color: #ff6600;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.product-info button:hover {
  background-color: #e65c00;
}
`}</style>
    </div>
  );
};

export default ProductCard;

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { baseApi } from '../utils/baseApi';

const ProductsSection = () => {
  const [featured, setFeatured] = useState([]);


  const fetching = async () => {
    try { 
    
      const res = await fetch(`${baseApi}/product`);
      const data = await res.json();
      console.log(data);
      
      setFeatured(data)
    } catch (error) {
      console.log(error);
      
    }
  }


  useEffect(() => {
    fetching();

  }, []);

  return (

      <section className="products-container">
        <div className="products-grid">
          {featured.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
              <style>{`.products-container {
  padding: 2rem;
  background-color: #f8f8f8;
  margin-top: 2rem;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
  font-weight: 600;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}
`}</style>

      </section>

  );
};

export default ProductsSection;
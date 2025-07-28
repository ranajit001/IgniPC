// import Header from '../components/Header';
// import ProductsSection from '../components/ProductsSection';
import { baseApi } from '../utils/baseApi';
import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ProductCard from '../components/ProductCard';



const LandingPage = () => {
  const handleSearch = () => {
    fetching()
  };

  const[search,setSearch]= useState('');

    const [featured, setFeatured] = useState([]);
  
  
    const fetching = async () => {
      try { 
      
        const res = await fetch(`${baseApi}/product?search=${search}`)
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
    <>
      {/* <Header />
      <ProductsSection /> */}
       <header>
      <div className="top-header">
        <Link to="/" className="logo">Logo</Link>
        <div className="search-bar">
          <input type="text"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search for products name or description..." id="search-input" />
          <button onClick={handleSearch} id="search_btn">Search</button>
        </div>
        <div className="user-actions">
          <Link to="/auth">Login</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/admin/dashboard">Admin Dashbpoard</Link>
        </div>
      </div>
      <nav>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/electronics">Electronics</Link>
          <Link to="/fashion">Fashion</Link>
          <Link to="/home-kitchen">Home & Kitchen</Link>
          <Link to="/books">Books</Link>
          <Link to="/sports">Sports & Outdoors</Link>
          <Link to="/beauty">Beauty</Link>
          <Link to="/toys">Toys & Games</Link>
        </div>
      </nav>

    </header>


    <section className="products-container">
        <div className="products-grid">
          {featured.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

    <style>{`header {
  background: #4a4aef;
  color: white;
  position: sticky;
  top: 0;
  z-index: 100;
  font-family: sans-serif;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

.logo span {
  color: #ffd700;
}

.search-bar {
  display: flex;
  flex: 1;
  max-width: 400px;
  margin: 0 20px;
}

#search-input {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 14px;
}

#search_btn {
  padding: 8px 16px;
  background: #ff6600;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.user-actions {
  display: flex;
  gap: 12px;
}

.user-actions a {
  color: white;
  text-decoration: none;
  font-size: 14px;
}

nav {
  background: #3b3bb5;
  padding: 8px 20px;
}

.nav-links {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;

}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 14px;
}
  .products-container {
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
    </>
  );
};

export default LandingPage;
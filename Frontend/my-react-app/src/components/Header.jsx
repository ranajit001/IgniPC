import { Link } from 'react-router-dom';

const Header = () => {
  const handleSearch = () => {
    alert('Search button clicked!');
  };

  return (
    <header>
      <div className="top-header">
        <Link to="/" className="logo">Logo</Link>
        <div className="search-bar">
          <input type="text" placeholder="Search for products name or description..." id="search-input" />
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
`}</style>
    </header>
  );
};

export default Header;

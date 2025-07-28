// File: src/App.jsx
import React from 'react';
import LandingPage from './pages/LandingPage';
import{Routes,Route}
 from 'react-router-dom';
import AuthPage from './pages/signuplogin';
import OrderStatusPage from './pages/cart';
import { Dashboard } from './pages/admin/dashboard';


import AddProduct from './pages/admin/AddProduct';  

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/auth' element={<AuthPage/>}/>
      <Route path='/cart' element={<OrderStatusPage/>}/>
         <Route path='/admin/add-product' element={<AddProduct/>}/>
           <Route path='/admin/dashboard' element={<Dashboard/>}/>
    </Routes>
  );
};

export default App;
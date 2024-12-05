import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import AccountPage from './components/AccountPage';
import SellerDashboard from './components/SellerDashboard';
import AdminPanel from './components/AdminPanel';
import RegisterForm from './RegisterForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  const products = [
    { id: 1, name: 'Product 1', price: '$20', description: 'Description 1', image: '/path/to/image1.jpg' },
    // Add more products here
  ];

  return (
    <Router>
      <Navbar /> {/* Navbar will display on all pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products products={products} />} />
        <Route path="/products/:id" element={<ProductDetails products={products} />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Router>
  );
}

export default App;



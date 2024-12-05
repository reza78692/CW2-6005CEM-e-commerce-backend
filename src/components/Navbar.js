import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: CSS for styling the navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/account" className="nav-link">Account</Link>
      <Link to="/login" className="nav-link">Login</Link>
      <Link to="/admin" className="nav-link">Admin</Link>
    </nav>
  );
};

export default Navbar;


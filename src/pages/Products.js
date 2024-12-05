import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard'; // Assumes ProductCard component exists for rendering individual products
import './Products.css'; // Import styling for product layout

const ProductManagementPage = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });
    const [message, setMessage] = useState('');
    // Fetch all products on mount
    useEffect(() => {
        axios.get('http://localhost:8000/api/products/')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    // Retrieve login and role information
    const token = localStorage.getItem('accessToken'); // Assuming token is stored as `accessToken`
    const userRole = localStorage.getItem('userRole'); // Assuming role is stored as `userRole`
    const isAuthorized = token && (userRole === 'admin' || userRole === 'vendor');
    console.log('Token in ProductManagementPage:', token);
    console.log('User Role in ProductManagementPage:', userRole);
    console.log('Is Authorized:', isAuthorized);

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    // Create a new product (only if user is logged in and authorized)
    const handleCreateProduct = () => {
        if (!isAuthorized) {
            setMessage("You don't have permission to create products.");
            return;
        }
        axios.post('http://localhost:8000/api/products/', newProduct, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setProducts([...products, response.data]);
            setMessage('Product created successfully!');
            setNewProduct({ name: '', price: '', description: '' });
        })
        .catch(error => console.error('Error creating product:', error));
    };

    // Update a product
    const handleUpdateProduct = (id) => {
        axios.put(`http://localhost:8000/api/products/${id}/`, { name: 'Updated Product Name', price: 99.99 }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setProducts(products.map(product => product.id === id ? response.data : product));
            setMessage('Product updated successfully!');
        })
        .catch(error => console.error('Error updating product:', error));
    };

    // Delete a product
    const handleDeleteProduct = (id) => {
        axios.delete(`http://localhost:8000/api/products/${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            setProducts(products.filter(product => product.id !== id));
            setMessage('Product deleted successfully!');
        })
        .catch(error => console.error('Error deleting product:', error));
    };

    return (
        <div>
            <h1>Product Management</h1>
            <div className="products-container">
                <h2>Our Products</h2>
                {message && <p className="message">{message}</p>}
                <div className="products-grid">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product}>
                            {isAuthorized && (
                                <>
                                    <button onClick={() => handleUpdateProduct(product.id)}>Update</button>
                                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                </>
                            )}
                        </ProductCard>
                    ))}
                </div>
            </div>

            {isAuthorized && (
                <div className="create-product-form">
                    <h2>Create a New Product</h2>
                    <input
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        placeholder="Product Name"
                    />
                    <input
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        placeholder="Price"
                    />
                    <input
                        name="description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                    />
                    <button onClick={handleCreateProduct}>Create Product</button>
                </div>
            )}
        </div>
    );
};

export default ProductManagementPage;







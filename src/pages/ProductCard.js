
/*import React from 'react';
import './Products.css'; // Import CSS for styling

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={`http://127.0.0.1:8000${product.image_url}`} alt={product.name} className="product-image" />
      <h2>{product.name}</h2>
      <p>Brand: {product.brand}</p>
      <p>Category: {product.category}</p>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating} / 5 ({product.numReviews} reviews)</p>
      <p>In Stock: {product.countInStock}</p>
    </div>
  );
};

export default ProductCard;*/

import React from 'react';
import './Products.css'; // Import CSS for styling

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={`http://127.0.0.1:8000${product.image_url}`} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-brand">Brand: {product.brand}</p>
      <p className="product-category">Category: {product.category}</p>
      <p className="product-description">{product.description}</p>
      <p className="product-price">Price: ${product.price}</p>
      <p>Rating: {product.rating} / 5 ({product.numReviews} reviews)</p>
      <p>In Stock: {product.countInStock}</p>
    </div>
  );
};

export default ProductCard;





// src/pages/Products.js
import React from 'react';
import ProductList from '../components/ProductList';

const Products = () => {
    return (
        <div className="p-10 bg-white min-h-screen">
            <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Products</h1>
            <ProductList />
        </div>
    );
};

export default Products;

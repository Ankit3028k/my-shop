// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify CSS

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { addToCart } = useCart(); // Use global cart management

    // Fetch products from the API
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/products');
            setProducts(response.data);
            setError(null);
        } catch (err) {
            setError('Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle add to cart with notification
    const handleAddToCart = (product) => {
        addToCart(product); // Add the product to the cart
        toast.success(`${product.name} added to cart!`, { autoClose: 2000 }); // Display toast notification
    };

    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle loading and errors
    if (loading) {
        return <div className="text-center py-10 text-gray-700 text-xl">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600 text-xl">Error: {error}</div>;
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Product List</h2>
            <input
                type="text"
                placeholder="Search Products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 w-full"
            />
            <ul className="mt-6 space-y-4">
                {filteredProducts.length === 0 ? (
                    <li className="text-center text-gray-500">No products found.</li>
                ) : (
                    filteredProducts.map(product => (
                        <li 
                            key={product.id} 
                            className="py-3 px-4 border border-gray-200 rounded-md shadow hover:bg-gray-100 transition duration-300 flex items-center justify-between"
                        >
                            <div className="flex items-center">
                                {/* Image Section */}
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-16 h-16 object-cover rounded-md mr-4" 
                                />
                                <div>
                                    <span className="text-lg font-medium">{product.name}</span>
                                    <span className="text-lg font-medium"> ₹{product.price}</span>
                                    <div>
                                        {/* Correct Stock Check */}
                                        {product.countInStock > 0 ? (
                                            <span className="text-sm text-gray-600">In Stock: {product.countInStock}</span>
                                        ) : (
                                            <span className="text-sm text-red-500">Out of Stock</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                {/* Add to Cart Button */}
                                <button
                                    onClick={() => handleAddToCart(product)} // Trigger handleAddToCart
                                    disabled={product.countInStock === 0}
                                    className={`px-4 py-2 rounded-md text-white font-semibold ${
                                        product.countInStock > 0
                                            ? 'bg-blue-600 hover:bg-blue-700'
                                            : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>

            {/* Toast notification container */}
            <ToastContainer />
        </div>
    );
};

export default ProductList;

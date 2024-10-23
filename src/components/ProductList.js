// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Use useLocation for query params
import axiosInstance from '../axiosConfig';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify CSS

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart(); // Use global cart management
    const location = useLocation(); // Access query parameters

    // Extract the search term from query params
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || ''; // Default to empty string if no search term

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

    // Filter products based on search term (name or price)
    const filteredProducts = products.filter(product => {
        const searchLower = searchTerm.toLowerCase();
        return (
            (product.name && product.name.toLowerCase().includes(searchLower)) ||
            (product.price && product.price.toString().includes(searchLower)) // Search by price
        );
    });

    // Handle loading and errors
    if (loading) {
        return <div className="text-center py-10 text-gray-700 text-xl">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600 text-xl">Error: {error}</div>;
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Product List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.length === 0 ? (
                    <div className="text-center text-gray-500 col-span-full">No products found.</div>
                ) : (
                    filteredProducts.map(product => (
                        <div 
                            key={product.id} 
                            className="border border-gray-200 rounded-md shadow p-4 hover:bg-gray-100 transition duration-300 flex flex-col"
                        >
                            <Link to={`/product/${product.id}`} className="flex-grow flex items-center">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-16 h-16 object-cover rounded-md mr-4" 
                                />
                                <div>
                                    <h3 className="text-lg font-medium">{product.name}</h3>
                                    <span className="text-lg font-medium"> ₹{product.price}</span>
                                    <div>
                                        {product.countInStock > 0 ? (
                                            <span className="text-sm text-gray-600">In Stock: {product.countInStock}</span>
                                        ) : (
                                            <span className="text-sm text-red-500">Out of Stock</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                            <button
                                onClick={() => handleAddToCart(product)} // Trigger handleAddToCart
                                disabled={product.countInStock === 0}
                                className={`mt-2 px-4 py-2 rounded-md text-white font-semibold ${
                                    product.countInStock > 0
                                        ? 'bg-blue-600 hover:bg-blue-700'
                                        : 'bg-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Toast notification container */}
            <ToastContainer />
        </div>
    );
};

export default ProductList;

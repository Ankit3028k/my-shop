// src/pages/ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import Navbar from './Navbar';
import Footer from './Footer';
const ProductDetails = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`/products/${id}`);
                setProduct(response.data);
                setError(null);
            } catch (error) {
                setError('Error fetching product details');
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductDetails();
    }, [id]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, x: '-100vw' },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: 'spring', stiffness: 120, duration: 0.5 },
        },
    };

    const imageVariants = {
        hover: { scale: 1.1, transition: { duration: 0.3 } },
    };

    return (
        <div className=" bg-gray-50 min-h-screen">
            {loading && <p>Loading product details...</p>}
            <Navbar/>
            {error && <p className="text-red-500">{error}</p>}
            {product && (
                <motion.div
                    className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Left side: Product Image and Thumbnails */}
                    <div className="flex flex-col items-center">
                        <motion.img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-96 object-cover rounded-lg mb-6"
                            variants={imageVariants}
                            whileHover="hover"
                        />
                        <div className="flex gap-2">
                            {product.galleryImages?.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`${product.name} thumbnail ${index}`}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right side: Product Info */}
                    <div>
                        <motion.h1
                            className="text-3xl font-bold text-gray-800 mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.2 } }}
                        >
                            {product.name}
                        </motion.h1>

                        <motion.p
                            className="text-2xl font-semibold text-green-600 mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.4 } }}
                        >
                            ₹{product.price} 
                            {product.discount && (
                                <span className="ml-2 text-red-600 line-through">
                                    ₹{product.originalPrice}
                                </span>
                            )}
                        </motion.p>
                        {product.discount && (
                            <motion.p
                                className="text-green-500 font-semibold"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.5 } }}
                            >
                                Save ₹{product.discount} ({product.discountPercentage}% off)
                            </motion.p>
                        )}

                        <motion.p
                            className="text-gray-600 mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.6 } }}
                        >
                            {product.description}
                        </motion.p>

                        {/* Specifications Section */}
                        <div className="border-t pt-4">
                            <p className="text-gray-800 font-semibold">Brand: {product.brand}</p>
                            <p className="text-gray-800 font-semibold">Category: {product.category?.name || 'No Category'}</p>
                            <p className="text-gray-800 font-semibold">Stock: {product.countInStock}</p>
                            {/* <p className="text-gray-800 font-semibold">Veg/Non-Veg: {product.veg ? 'Vegetarian' : 'Non-Veg'}</p> */}
                        </div>

                        {/* Action Buttons */}
                        {/* <div className="mt-6">
                            <button className="w-full py-3 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-600 transition">
                                Login to Buy
                            </button>
                        </div> */}
                    </div>
                </motion.div>
            )}
            <Footer/>
        </div>
    );
};

export default ProductDetails;

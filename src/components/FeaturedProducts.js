// src/components/FeaturedProducts.js
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const FeaturedProducts = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await axios.get('/products?featured=true');
                setFeaturedProducts(response.data);
            } catch (error) {
                console.error('Error fetching featured products', error);
                setError('Failed to load featured products.'); // Set error message
            } finally {
                setLoading(false); // Set loading to false after request
            }
        };
        fetchFeaturedProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    if (error) {
        return <div className="text-red-600">{error}</div>; // Error state
    }

    return (
        <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
            {featuredProducts.length === 0 ? ( // Check if there are no featured products
                <p>No featured products available at the moment.</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {featuredProducts.map(product => (
                        product.isFeatured && ( // Ensure the product is featured before rendering
                            <li key={product._id} className="bg-white p-4 rounded-lg shadow-lg">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-48 object-cover mb-4 rounded-lg"
                                />
                                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                {/* <p className="text-blue-600 font-bold text-xl">₹{product.price}</p> */}
                            </li>
                        )
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FeaturedProducts;

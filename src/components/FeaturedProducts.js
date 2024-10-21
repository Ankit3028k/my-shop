// src/components/FeaturedProducts.js
    import React, { useEffect, useState } from 'react';
    import axios from '../axiosConfig';
    
    const FeaturedProducts = () => {
        const [featuredProducts, setFeaturedProducts] = useState([]);
    
        useEffect(() => {
            const fetchFeaturedProducts = async () => {
                try {
                    const response = await axios.get('/products?featured=true');
                    setFeaturedProducts(response.data);
                } catch (error) {
                    console.error('Error fetching featured products', error);
                }
            };
            fetchFeaturedProducts();
        }, []);
    
        return (
            <div className="my-8">
                <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {featuredProducts.map(product => (
                        <li key={product._id} className="bg-white p-4 rounded-lg shadow-lg">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-48 object-cover mb-4 rounded-lg"
                            />
                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                            <p className="text-blue-600 font-bold text-xl">₹{product.price}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };
    
    export default FeaturedProducts;
    
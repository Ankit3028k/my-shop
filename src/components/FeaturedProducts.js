import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const FeaturedProducts = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Store the category ID
    const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered products

    // Fetch the featured products from the API
    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await axios.get('/products?featured=true');
                setFeaturedProducts(response.data); // Store all featured products
                setFilteredProducts(response.data); // Initially show all products
            } catch (error) {
                console.error('Error fetching featured products', error);
                setError('Failed to load featured products.');
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedProducts();
    }, []);

    // Handle product click and filter by category
    const handleProductClick = (categoryId) => {
        console.log('Product clicked, category ID:', categoryId);
        setSelectedCategoryId(categoryId);

        // Filter products based on the selected category
        const filtered = featuredProducts.filter(
            (product) => product.category?.id === categoryId // Filtering based on category.id
        );

        console.log('Filtered Products:', filtered);
        setFilteredProducts(filtered); // Update the filtered products state
    };

    // Show loading state while data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    // Show error state if there's an issue fetching the data
    if (error) {
        return <div className="text-red-600">{error}</div>;
    }

    return (
        <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">Featured Products</h2>

            {/* Display Featured Products */}
            {featuredProducts.length === 0 ? (
                <p>No featured products available at the moment.</p>
            ) : (
                <>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            product.isFeatured && (
                                <li
                                    key={product._id}
                                    className="bg-white p-4 rounded-lg shadow-lg cursor-pointer"
                                    onClick={() => handleProductClick(product.category?.id)} // Passing category ID
                                >
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

                    {/* Show Products Filtered by Category */}
                    {selectedCategoryId && (
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold">Products in the same category</h3>

                            {/* Show filtered products based on the selected category */}
                            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredProducts.length === 0 ? (
                                    <p>No products found in this category.</p>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <li
                                            key={product._id}
                                            className="bg-white p-4 rounded-lg shadow-lg"
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-48 object-cover mb-4 rounded-lg"
                                            />
                                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                            {/* <p className="text-blue-600 font-bold text-xl">₹{product.price}</p> */}
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default FeaturedProducts;

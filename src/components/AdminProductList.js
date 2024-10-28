import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';

const AdminProductList = ({ products, fetchProducts, setEditProduct }) => {
    const [modifiedProducts, setModifiedProducts] = useState({}); // Local state to track modified products

    const handleDelete = async (productId) => {
        try {
            await axiosInstance.delete(`/products/${productId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // const handleFeaturedToggle = (product) => {
    //     setModifiedProducts((prev) => ({
    //         ...prev,
    //         [product._id]: !product.featured, // Toggle the featured status
    //     }));
    // };

    // const handleSaveChanges = async (productId) => {
    //     const featuredStatus = modifiedProducts[productId] !== undefined ? modifiedProducts[productId] : null;

    //     if (featuredStatus !== false) { // Only send request if there's a change
    //         try {
    //             await axiosInstance.put(`/products/${productId}`, { featured: featuredStatus }, {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });
    //             fetchProducts(); // Refresh the product list after saving
    //             setModifiedProducts((prev) => ({ ...prev, [productId]: undefined })); // Clear the modified state for that product
    //         } catch (error) {
    //             console.error('Error saving changes:', error);
    //         }
    //     }
    // };

    return (
        <div className="overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">Admin Product List</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2">Image</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Category</th>
                        <th className="p-2">Stock</th>
                        <th className="p-2">Discount</th>
                        {/* <th className="p-2">Featured</th> */}
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id} className="border-t">
                            <td className="p-2">
                                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover" />
                            </td>
                            <td className="p-2">{product.name}</td>
                            <td className="p-2">${product.price}</td>
                            <td className="p-2">{product.category?.name || 'No Category'}</td>
                            <td className="p-2">{product.countInStock}</td>
                            <td className="p-2">{product.discounted_price}</td>
                            <td className="p-2">
                                {/* <input
                                    type="checkbox"
                                    checked={modifiedProducts[product._id] !== undefined ? modifiedProducts[product._id] : product.featured}
                                    onChange={() => handleFeaturedToggle(product)}
                                /> */}
                            </td>
                            <td className="p-2 space-x-2">
                                <button
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400"
                                    onClick={() => setEditProduct(product._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Delete
                                </button>
                                {/* <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400"
                                    onClick={() => handleSaveChanges(product._id)} // Save changes for this product
                                >
                                    Save Changes
                                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProductList;

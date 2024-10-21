import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

const AdminProductForm = ({ editProduct, fetchProducts }) => {
    const [formProduct, setFormProduct] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        brand: '',
        countInStock: 0,
        image: null,
        isFeature: false, // Added isFeature in the state
    });

    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (editProduct) {
            const fetchProductDetails = async () => {
                try {
                    const { data } = await axiosInstance.get(`/products/${editProduct}`);
                    setFormProduct({
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        category: data.category,
                        brand: data.brand,
                        countInStock: data.countInStock,
                        image: data.image,
                        isFeature: data.isFeature || false, // Set the isFeature value from the product data
                    });
                } catch (error) {
                    console.error('Error fetching product details:', error);
                }
            };
            fetchProductDetails();
        }
    }, [editProduct]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleFeatureChange = (e) => {
        const value = e.target.value === 'true'; // Convert string to boolean
        setFormProduct((prev) => ({ ...prev, isFeature: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting:', formProduct); // Debug log to see the current form state
        try {
            const formData = new FormData();
            formData.append('name', formProduct.name);
            formData.append('description', formProduct.description);
            formData.append('price', formProduct.price);
            formData.append('category', formProduct.category);
            formData.append('brand', formProduct.brand);
            formData.append('countInStock', formProduct.countInStock);
            formData.append('isFeature', formProduct.isFeature.toString()); // Convert boolean to string
            if (imageFile) formData.append('image', imageFile);

            // Log FormData content
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            if (editProduct) {
                await axiosInstance.put(`/products/${editProduct}`, formData);
            } else {
                await axiosInstance.post('/products', formData);
            }
            fetchProducts();
            setFormProduct({
                name: '',
                description: '',
                price: 0,
                category: '',
                brand: '',
                countInStock: 0,
                image: null,
                isFeature: false, // Reset to initial state
            });
            setImageFile(null);
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <form className="space-y-4 p-4 border border-gray-300 rounded shadow-lg" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold">{editProduct ? 'Edit Product' : 'Add Product'}</h2>
            <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formProduct.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
            <textarea
                name="description"
                placeholder="Description"
                value={formProduct.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
            />
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={formProduct.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                value={formProduct.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
            <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={formProduct.brand}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
            <input
                type="number"
                name="countInStock"
                placeholder="Count in Stock"
                value={formProduct.countInStock}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
            <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded"
                required={!editProduct}
            />

            {/* Radio buttons for isFeature */}
            <div>
                <label className="block text-lg font-medium">Is Featured?</label>
                <div className="flex items-center space-x-4">
                    <label>
                        <input
                            type="radio"
                            name="isFeature"
                            value="true"
                            checked={formProduct.isFeature === true}
                            onChange={handleFeatureChange}
                            className="mr-2"
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="isFeature"
                            value="false"
                            checked={formProduct.isFeature === false}
                            onChange={handleFeatureChange}
                            className="mr-2"
                        />
                        No
                    </label>
                </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500">
                {editProduct ? 'Update Product' : 'Add Product'}
            </button>
        </form>
    );
};

export default AdminProductForm;

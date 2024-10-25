// src/components/CategoryList.js
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const CategoryList = ({ setSelectedCategory }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map(category => (
                    <li 
                        key={category._id} 
                        className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-200 transition"
                        onClick={() => setSelectedCategory(category.name)}  // Pass category name on click
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;

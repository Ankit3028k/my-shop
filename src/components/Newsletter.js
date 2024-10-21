// src/components/Newsletter.js
import React from 'react';

const Newsletter = () => {
    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
            <p className="mb-6">Get the latest deals and updates delivered to your inbox.</p>
            <form className="flex justify-center">
                <input type="email" className="p-3 rounded-l-lg w-64" placeholder="Your email" />
                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-r-lg transition duration-300">Subscribe</button>
            </form>
        </div>
    );
};

export default Newsletter;

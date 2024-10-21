// src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <p>&copy; {new Date().getFullYear()} E-Shop. All Rights Reserved.</p>
                <ul className="flex space-x-4">
                    <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-gray-400">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-gray-400">Contact Us</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold tracking-wide hover:text-gray-300 transition duration-300">
                    E-Shop
                </Link>
                
                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-white focus:outline-none" 
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? '✖' : '☰'}
                </button>
            </div>

            {/* Sidebar for mobile view */}
            <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleMobileMenu}>
                <div className={`fixed top-0 right-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-4">
                        <h2 className="text-xl font-bold">Menu</h2>
                        <Link to="/" className="block text-gray-700 hover:text-blue-600 transition duration-300 p-2" onClick={toggleMobileMenu}>
                            Home
                        </Link>
                        <Link to="/categories" className="block text-gray-700 hover:text-blue-600 transition duration-300 p-2" onClick={toggleMobileMenu}>
                            Categories
                        </Link>
                        <Link to="/products" className="block text-gray-700 hover:text-blue-600 transition duration-300 p-2" onClick={toggleMobileMenu}>
                            Products
                        </Link>
                        <Link to="/cart" className="block text-gray-700 hover:text-blue-600 transition duration-300 p-2" onClick={toggleMobileMenu}>
                            Cart
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

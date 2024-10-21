// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Products from './pages/Products';
import Users from './pages/Users';
import Orders from './components/Orders';
import Admin from './pages/AdminPage';
import Cart from './components/Cart';
import LoginPage from './pages/LoginPage';
import './index.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state

    const handleLogin = () => {
        setIsAuthenticated(true); // Set authentication state to true
    };

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} /> {/* Pass login handler */}
                    <Route
                        path="/admin"
                        element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} // Protect the admin route
                    />
                    {/* Add other routes as necessary */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;

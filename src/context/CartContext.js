// src/context/CartContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [shippingDetails, setShippingDetails] = useState({
        shippingAddress1: '',
        shippingAddress2: '',
        city: '',
        zip: '',
        country: '',
        phone: ''
    });

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item._id === product._id);
        if (existingProduct) {
            setCart(cart.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item._id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const validateShippingDetails = () => {
        const { shippingAddress1, city, zip, country, phone } = shippingDetails;
        if (!shippingAddress1 || !city || !zip || !country || !phone) {
            return false; // Returns false if any required field is missing
        }
        return true;
    };

    const placeOrder = async () => {
        if (!validateShippingDetails()) {
            alert('Please fill in all required shipping details.');
            return;
        }

        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        const orderData = {
            orderItems: cart.map(item => ({
                quantity: item.quantity,
                product: item._id
            })),
            shippingAddress1: shippingDetails.shippingAddress1,
            shippingAddress2: shippingDetails.shippingAddress2,
            city: shippingDetails.city,
            zip: shippingDetails.zip,
            country: shippingDetails.country,
            phone: shippingDetails.phone,
            totalPrice: totalPrice,
            user: 'user_id_here', // Replace with actual user ID
        };

        try {
            await axios.post('https://personal-shop-backend.onrender.com/api/v1/orders', orderData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            alert('Order placed successfully!');
            clearCart();
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            totalPrice: cart.reduce((total, item) => total + item.price * item.quantity, 0),
            placeOrder,
            shippingDetails,
            setShippingDetails // Provide method to update shipping details
        }}>
            {children}
        </CartContext.Provider>
    );
};

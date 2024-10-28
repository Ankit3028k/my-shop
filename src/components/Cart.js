import React from 'react';
import { useCart } from '../context/CartContext';
import ShippingDetails from './ShippingDetails';

const Cart = () => {
    const { cart, removeFromCart, totalPrice, placeOrder } = useCart();

    return (
        <div className="p-10 bg-white min-h-screen">
            <h1 className="text-4xl font-semibold mb-6">Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul>
                        {cart.map(item => (
                            <li key={item._id} className="flex justify-between mb-4">
                                <span>{item.name} {item.price} x {item.quantity}</span>
                                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                <button onClick={() => removeFromCart(item._id)} className="text-red-500">Remove</button>
                            </li>
                        ))}
                    </ul>
                    <h2 className="text-lg font-bold mt-4">Total Price: ₹{totalPrice.toFixed(2)}</h2>
                    <ShippingDetails /> {/* Include the shipping details form */}
                    <button onClick={placeOrder} className="bg-blue-500 text-white p-2 rounded mt-4">Cash on Delivery</button>
                </>
            )}
        </div>
    );
};

export default Cart;

import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); 
    const [cartItemCount, setCartItemCount] = useState(0); 

    

    const updateCartItemCount = (count) => {
        setCartItemCount(count);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                cartItemCount,
                updateCartItemCount,
                
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
import { createContext, useState } from "react";

export const CartContext = createContext(0);

export const CartContextProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    const removeItemFromCart = (item) => {
        setCartItems((prevItems) => prevItems.filter(prevItem => prevItem.customId !== item.customId));
    }

    const addItemToCartInContext = (e) => {
        const { MakeId, MakeName, VehicleTypeId, VehicleTypeName, customId } = e;
        const elementExists = cartItems.find(item => item.customId === customId)
        if (!elementExists) {
            setCartItems((prevItems) => [...prevItems, { MakeId, MakeName, VehicleTypeId, VehicleTypeName, customId }])
        }
    }

    return <CartContext.Provider value={{ cartItems, addItemToCartInContext, noOfItems: cartItems.length, removeItemFromCart }}>
        {children}
    </CartContext.Provider>

}


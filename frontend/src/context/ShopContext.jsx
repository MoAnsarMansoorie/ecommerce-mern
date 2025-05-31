import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {

    const currency = "$"
    const delivery_fee = 10
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId, size) => {

        const cartData = structuredClone(cartItems);

        if(!size) {
            toast.error("Please select a size for the item.");
            return;
        }

        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

    }

    useEffect(() => {
        console.log(cartItems)
    },[cartItems]);

    // cart count number
    const getCartCount = () => {
        let totalCount = 0;

        for (const item in cartItems) {
            try {
                for (const size in cartItems[item]) {
                    if (cartItems[item][size] > 0) {
                        totalCount += cartItems[item][size];
                    }
                }
                
            } catch (error) {
                console.error("Error calculating cart count:", error);
                
            }
        }

        return totalCount;
    }

    const value = {
        products, currency, delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
};

export default ShopContextProvider;
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {

    const currency = "$"
    const delivery_fee = 10
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("")
    const navigate = useNavigate();

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

    const updateQuantity = (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find(product => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if( cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                    
                } catch (error) {
                    console.error("Error calculating cart amount:", error);
                    
                }
            }
        }
        return totalAmount;
    }

    // fetch products from backend
    const getProductsProducts = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/v1/product/list`);
            // console.log("Products fetched successfully:", response.data);
            if(response.data.success) {
                setProducts(response.data.products);
            }
            else {
                toast.error("Failed to load products. Please try again later.");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error(error.message || "Failed to load products. Please try again later.");
        }
    }

    useEffect(() => {
        getProductsProducts();
    }, [])
    
    useEffect(() => {
        if (!token || localStorage.getItem('token')) {
            setToken(localStorage.getItem("token"));
        } 
    },[token]);

    const value = {
        products, currency, delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems, setCartItems,
        addToCart,
        getCartCount, updateQuantity, 
        getCartAmount, navigate,
        token, setToken,
        backendUrl
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
};

export default ShopContextProvider;
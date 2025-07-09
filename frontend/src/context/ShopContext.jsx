import { createContext, useState, useEffect } from "react"
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext=createContext();

const ShopContextProvider=(props)=>{

    const currency = 'Rs.';
    const delivery_fee = 40;
    const [search, setSearch]=useState('');
    const [showSearch, setShowSearch]=useState(false);
    const [cartItems, setCartItems]=useState({});
    const navigate=useNavigate();

    const addToCart= async (itemId,size)=>{

        if(!size){
            toast.error('Select Size');
            return;
        }

        let cartCopy=structuredClone(cartItems);
        if(cartCopy[itemId]){
            if(cartCopy[itemId][size]){
                cartCopy[itemId][size]+=1;
            }
            else{
                cartCopy[itemId][size]=1;
            }
        }
        else{
            cartCopy[itemId]={};
            cartCopy[itemId][size]=1;
        }
        setCartItems(cartCopy);
    }

    const getCartCount=()=>{
        let totalCount=0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        totalCount+=cartItems[items][item];
                    }
                }
                catch(error) {

                }
            }
        }
        return totalCount;
    }

    const updateCartQuantity= async (itemId,size,quantity)=>{
        let cartCopy=structuredClone(cartItems);

        cartCopy[itemId][size]=quantity;

        setCartItems(cartCopy);
    }

    const getCartAmount=()=>{
        let totalAmount=0;

        for(const items in cartItems){

            let desiredItem=products.find((product)=>items===product._id);
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        totalAmount+= desiredItem.price*cartItems[items][item];
                    }
                }
                catch(error){

                }
            }
        }
        return totalAmount;
    }

    useEffect(()=>{
        getCartCount();
    },[cartItems])

    const value={
        products, currency, delivery_fee,
        search, showSearch, setShowSearch, setSearch,
        cartItems, addToCart, getCartCount, updateCartQuantity,
        getCartAmount, navigate
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;

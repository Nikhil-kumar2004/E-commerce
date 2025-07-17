import { createContext, useState, useEffect } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const ShopContext=createContext();

const ShopContextProvider=(props)=>{

    const currency = 'Rs.';
    const delivery_fee = 40;
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [search, setSearch]=useState('');
    const [showSearch, setShowSearch]=useState(false);
    const [cartItems, setCartItems]=useState({});
    const [products, setProducts]=useState([])
    const [token, setToken]=useState('');

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
        if(token){
            try{
                const response=await axios.post(`${backendUrl}/api/cart/add`,{itemId,size}, {headers:{token}})
                toast.success(response.data.msg)
            }
            catch(error){
                console.log(error)
                toast.error(error.message)
            }
        }
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

        if(token){
            try{
                await axios.put(`${backendUrl}/api/cart/update`,{itemId,size,quantity}, {headers:{token}})
            }
            catch{
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartData=async (token)=>{
        try{
            const response=await axios.get(`${backendUrl}/api/cart/get`,{headers:{token}})
            if(response.data.success){
                setCartItems(response.data.cartData)
            }
            else{
                toast.error(response.data.msg)
            }
        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const deleteFromCart= async (itemId, size)=>{
        try{
            const response=await axios.delete(`${backendUrl}/api/cart/delete`,{data:{itemId,size}, headers:{token}})
            if(response.data.success){
                toast.success(response.data.msg)
            }
            else{
                toast.error(response.data.msg)
            }
        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
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

    const getProductData= async ()=>{
        try{
            const response=await axios.get(`${backendUrl}/api/product/list`)
            if(response.data.success){
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.msg)
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductData();
    },[])

    useEffect(()=>{
        getCartCount();
    },[cartItems])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getCartData(localStorage.getItem('token'))
        }
    },[])

    const value={
        products, currency, delivery_fee,
        search, showSearch, setShowSearch, setSearch,
        cartItems, setCartItems, addToCart, getCartCount, updateCartQuantity,
        getCartAmount, navigate, backendUrl, token, setToken, deleteFromCart
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;

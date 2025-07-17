import { toast } from "react-toastify";
import userModel from "../models/userModel.js";

const addToCart= async (req, res)=>{
    try{
        const {itemId, size}=req.body
        const {userId}=req
        const userData=await userModel.findById(userId)
        let cartData=await userData.cartData

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1
            }
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId]={}
            cartData[itemId][size]=1
        }

        await userModel.findByIdAndUpdate(userId,{cartData})
        return res.json({success: true, msg: "Added to Cart"})
    }
    catch(error){
        console.log(error);
        return res.json({success:false, msg:error.message})
    }
}


const updateCart= async (req, res)=>{
    try{
        const {itemId, size, quantity}=req.body
        const {userId}=req
        const userData=await userModel.findById(userId)
        let cartData=await userData.cartData

        cartData[itemId][size]=quantity

        await userModel.findByIdAndUpdate(userId,{cartData})
    }
    catch(error){
        console.log(error);
        return res.json({success:false, msg:error.message})
    }
}


const getUserCart= async (req, res)=>{
    try{
        const {userId}=req
        const userData=await userModel.findById(userId)
        let cartData=await userData.cartData

        return res.json({success:true, cartData})
    }
    catch(error){
        console.log(error);
        return res.json({success:false, msg:error.message})
    }
}

const deleteInCart= async (req, res)=>{
    try{
        const {userId}=req
        const {itemId, size}=req.body
        let userData=await userModel.findById(userId)

        if(userData.cartData[itemId] && userData.cartData[itemId][size]!==undefined) {
            delete userData.cartData[itemId][size];

            if (Object.keys(userData.cartData[itemId]).length === 0) {
                delete userData.cartData[itemId];
            }
        }
        await userData.save();

        return res.json({success:true, msg:"Item Deleted"})
    }
    catch(error){
        console.log(error);
        return res.json({success:false, msg:error.message})
    }
}


export {addToCart, updateCart, getUserCart, deleteInCart}
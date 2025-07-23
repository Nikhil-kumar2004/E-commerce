import userModel from "../models/userModel.js"
import orderModel from "../models/orderModel.js"
import Stripe from 'stripe'
import Razorpay from 'razorpay'

const currency='inr'
const deliveryCharge=40
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpay=new Razorpay({
    key_id:process.env.RAZORPAY_ID,
    key_secret:process.env.RAZORPAY_SECRET_KEY
})

const placeOrder= async (req,res)=>{
    try {
        const {items, address, amount}=req.body
        const {userId}=req

        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder= new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        return res.json({success: true, msg:"Order Placed"})

    } catch (error) {
        console.log(error)
        return res.json({success: false, msg:error.message})
    }
}

const placeOrderStripe= async (req,res)=>{
    try {
        
        const {items, address, amount}=req.body
        const {userId}=req
        const { origin }=req.headers

        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod: 'stripe',
            payment: false,
            date: Date.now()
        }
        const newOrder= new orderModel(orderData)
        await newOrder.save()

        const line_items=items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name: item.name
                },
                unit_amount: item.price*100
            },
            quantity: item.quantity
        }))

        line_items.push({
             price_data:{
                currency:currency,
                product_data:{
                    name: 'Delivary Charges'
                },
                unit_amount: deliveryCharge*100
            },
            quantity: 1
        })

        const session= await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items
        })

        return res.json({success: true, session_url:session.url})

    } catch (error) {
        console.log(error)
        return res.json({success: false, msg:error.message})
    }
}

const verifyStripe = async (req, res)=>{  //not secure webhooks is used in real
    const { success, orderId }=req.body
    const { userId }=req
    try {
        if(success === 'true'){
            await orderModel.findByIdAndUpdate(orderId, {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData:{}})
            return res.json({success:true, msg:"Order Placed"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            return res.json({success:false, msg:"Payment Failed"})
        }

    } catch (error) {
        console.log(error)
        return res.json({success: false, msg:error.message})
    }
}

const placeOrderRazorpay= async (req,res)=>{
    try {
        const {items, address, amount}=req.body
        const {userId}=req

        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod: 'razorpay',
            payment: false,
            date: Date.now()
        }
        const newOrder= new orderModel(orderData)
        await newOrder.save()

        const options={
            amount: amount*100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpay.orders.create(options,(error, order)=>{
            if(error){
                console.log(error)
                return res.json({success:false, msg:error})
            }
            res.json({success:true, order})
        })

    } catch (error) {
        console.log(error)
        return res.json({success: false, msg:error.message})
    }
}

const verifyRazorpay= async (req, res)=>{
    try {
        
        const {userId}=req
        const {razorpay_order_id}=req.body
        
        const orderInfo= await razorpay.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            return res.json({success:true, msg:"Payment Successful"})
        }
        else{
            return res.json({success:false, msg:"Payment Failed"})
        }

    } catch (error) {
        console.log(error)
        return res.json({success: false, msg:error.message})
    }
}

//admin function
const allOrders= async (req,res)=>{
    try{
        const orders=await orderModel.find({})
        return res.json({success:true, orders})
    }
    catch(error){
        console.log(error)
        return res.json({success: false, msg:error.message})
    }
}

const userOrders= async (req,res)=>{
    try {      
        const { userId }=req
        const orders=await orderModel.find({userId})
        return res.json({success:true, orders})

    } catch (error) {
        console.log(error)
        return res.json({success: false, msg:error.message})
    }
}

//admin function
const updateStatus=async (req,res)=>{
    try {
        
        const { orderId, status}=req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, msg:"Status Updated"})

    } catch (error) {
        console.log(error)
        return res.json({success: false, msg:error.message})
    }
}

export {placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus,verifyStripe, verifyRazorpay}
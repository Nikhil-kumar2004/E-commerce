import express from 'express'
import { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus,verifyStripe, verifyRazorpay } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import userAuth from '../middleware/userAuth.js'

const orderRouter = express.Router()

// Admin features
orderRouter.get('/list',adminAuth,allOrders)
orderRouter.patch('/status',adminAuth,updateStatus)

//Payment features
orderRouter.post('/cod',userAuth,placeOrder)
orderRouter.post('/stripe',userAuth,placeOrderStripe)
orderRouter.post('/razorpay',userAuth,placeOrderRazorpay)

//Verify Stripe
orderRouter.patch('/verifystripe',userAuth,verifyStripe)

//Verify Razorpay
orderRouter.patch('/verifyrazorpay',userAuth,verifyRazorpay)

//User features
orderRouter.get('/userorders',userAuth,userOrders)

export default orderRouter

import express from 'express'
import { addToCart, updateCart, getUserCart, deleteInCart } from '../controllers/cartController.js'
import userAuth from '../middleware/userAuth.js'

const cartRouter= express.Router()

cartRouter.get('/get',userAuth,getUserCart)
cartRouter.post('/add',userAuth,addToCart)
cartRouter.put('/update',userAuth,updateCart)
cartRouter.delete('/delete',userAuth,deleteInCart)

export default cartRouter
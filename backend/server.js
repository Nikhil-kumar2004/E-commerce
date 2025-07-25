import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCoundinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

//App Config

const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCoundinary()

//Middleware

app.use(express.json())
app.use(cors({
    origin:[
        'https://e-commerce-brown-omega-41.vercel.app',
        'https://clothify-admin-theta.vercel.app',
    ],
    credentials:true
}))

// Endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/orders',orderRouter)

app.get('/',(req,res)=>{
    return res.send('Api is Working')
})

app.listen(port, ()=>console.log("Server Started! on PORT" + ' ' + port));
export default app;
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCoundinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'

//App Config

const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCoundinary()

//Middleware

app.use(express.json())
app.use(cors())

// Endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

app.get('/',(req,res)=>{
    return res.send('Api is Working')
})

app.listen(port, ()=>console.log("Server Started! on PORT" + ' ' + port));
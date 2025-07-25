import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const loginUser= async (req, res)=>{
    try{
        const {email, password}= req.body
        const user=await userModel.findOne({email})

        if(!user){
            return res.json({success: false, msg: "User doesn't exists"})
        }

        const isMatch=await bcrypt.compare(password,user.password)

        if(isMatch){
            const token=createToken(user._id)
            return res.json({success:true, token})
        }
        else{
            return res.json({success:false, msg:"Invalid Credentials"})
        }
    }
    catch(error){
        console.log(error)
        return res.json({success:false, msg:error.message})
    }
}

const registerUser= async (req, res)=>{
    try{
        const {name, email, password}= req.body;

        if(!name || !email || !password){
            return res.json({success:false, msg:"All field are required"})
        }
        const exists= await userModel.findOne({email});

        if(exists){
            return res.json({success: false, msg: "User already exists"})
        }
        
        // validating email format and strong password
        
        if(!validator.isEmail(email)){
            return res.json({success: false, msg: "Please enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success: false, msg: "Please enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser=new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user= await newUser.save()
        const token = createToken(user._id)

        return res.status(201).json({success:true, token})
    }
    catch(error){
        console.log(error)
        return res.json({success:false, msg:error.message})
    }
}

const adminLogin= async (req, res)=>{
    try{
        const {email, password}=req.body

        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=createToken(email+password)
            return res.json({success:true, token})
        }
        else{
            return res.json({success:false, msg:"Invalid Credentials"})
        }
    }
    catch(error){
        console.log(error)
        return res.json({success:false, msg:error.message})
    }
}

export {loginUser, registerUser, adminLogin};
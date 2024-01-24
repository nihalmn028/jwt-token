const express=require('express')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const User=require('../model/user.js')
const router=express.Router()

//user registration

router.post('/register',async (req,res)=>{
  try {
    const {username,password}=req.body
    const hashedPassword=await bcrypt.hash(password,10)
    const user=new User({
      username:username,
      password:hashedPassword
    })
    await user.save()
    res.status(200).json({message:"user registered successfully"})

  } catch (error) {
    res.status(500).json({error:"registration failed"})
  }
})
//user login
router.post('/login',async (req,res)=>{
  try {
    const {username,password}=req.body
    const user=await User.findOne({username})
    if(!user){
    return res.status(401).json({error:"authentication failed"})}
  const passwordMatch=await bcrypt.compare(password,user.password)
  if(!passwordMatch){
    return res.status(401).json({error:"authentication failed"})}
const token=jwt.sign({userId:user._id},"secret key",{expiresIn:"1h"})
res.status(200).json({token})
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"login failed"})

  }
})
router.post('/forgotpassword',async (req,res)=>{
  try {
  const {username,password}= req.body
    const user=await User.findOne({username})
    if(!user)
    return res.status(401).json({error:"authentication failed"})
  await User.findByIdAndUpdate(user._id,{password},{new:true})
  res.status(200).json({message:"password changed"})
  } catch (error) {
    res.status(500).json({error:"login failed"})

  }
})
module.exports=router
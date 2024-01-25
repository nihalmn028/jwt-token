const express=require('express')
const verifyToken=require('../middleware/authMiddleware.js')
const router=express.Router()
router.get('/',verifyToken,(req,res)=>{
  console.log(req.userId);
  res.status(200).json({message:"protected route access"})
})




module.exports=router
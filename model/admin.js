const mongoose=require('mongoose')
const adminSchema=mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true
  },
  phno:{
    type:String,
    required:true,
  }
})
module.exports=mongoose.model("adminSchema",adminSchema)
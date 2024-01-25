const express=require('express')
const protectedRoute=require('./routes/protectedRoute.js')
const { default: mongoose } = require('mongoose')
const dotenv=require('dotenv').config()
const string=process.env.CONNECTION_STRING
const app=express()
const authRoutes=require('./routes/auth.js')
const port=process.env.PORT
app.use(express.json())
app.use('/auth',authRoutes)
app.use('/protected',protectedRoute)


app.listen(port,()=>{
  console.log("server running")
  mongoose.connect(string,
  {
    useNewUrlParser:true,
    useUnifiedTopology:true,
  }).then(()=>{
  console.log("mongodb connected")
  }).catch((err)=>{
    console.log(err) 

  })
})
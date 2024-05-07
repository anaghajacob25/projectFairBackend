// 1)import dotenv module
//loads .env file contents into process.env by default
require('dotenv').config()

// 2)express
const express=require('express')

// 3)import cors
const cors=require('cors')

// import router
const router=require('./Routing/router')


// // import application middleare
// const appmiddleware=require("./middleware/appMiddleware")


//import connection file
require('./DB/connection')

// 4)create server
const pfServer=express()

//5)use cors by server -this method is used to connect frontend
pfServer.use(cors())

// 6)convert  json to js objects 
//.json method - it returns a middleware that can convert json format to js object
// middleware - req-res cycle control
pfServer.use(express.json()) 


// pfServer.use(appmiddleware)
//server using router
pfServer.use(router)

// first - name by which other application can use this folder
// second express.static - export that folder
pfServer.use('/uploads',express.static('./uploads'))

//7) set port
const PORT = 4000 || process.env


//8)run server
pfServer.listen(PORT,()=>{
    console.log(`server running successfully ${PORT}`);
})

// //GET REQUEST
pfServer.get('/',(req,res)=>{
    res.send(`<h1 style='color:blue'>server running sucessfully</h1>`)
})

// //post request
// pfServer.post('/',(req,res)=>{
//     res.send('post request')
// })

// //put request
// pfServer.put('/',(req,res)=>{
//     res.send('put request')
// })
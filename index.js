const express = require("express")
const fs = require("fs")
const mongoose =  require("mongoose")
const users = require("./MOCK_DATA.json")
const userRouter = require("./routes/userRoutes")

//<------------------mongodb connection ------------------------------------------------>


// flow  :  connection -> schema -> model -> crud operation using model

// creating schema of the database 

// connection with backend 
const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/mydata")
.then(()=>console.log("mongodb connected"))
.catch(err=>console.log("not connected" ,err))

app.use("/users" , userRouter)


// using this model to insert or create data in our database


// middlewares ------------------------------->

app.use(express.urlencoded({extended : true}))

app.use((req,res,next)=>{
    console.log("hello from middleware 1")
    next()
})

app.use((req,res,next)=>{
    fs.appendFile("log.txt" , ` \n ${Date.now()} : ${req.ip} : ${req.path} : ${req.method}` , (err,data)=>{
        next()
    })
})

// routes and http methods -------------------------------------------->



// running server ---------------->
app.listen(8000,()=>{
    console.log("server startedd")
})
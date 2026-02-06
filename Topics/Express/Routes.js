const express = require('express')

const app = express()

app.get("/" , (req,res)=>{
    res.send("home page")
})

app.get("/login" ,(req,res)=>{
    res.send("hii")
})

app.post("/login" , (req,res)=>{
    res.send("hurray")
})

app.get("/about" , (req,res)=>{
    res.send("about page!!!")
})

app.listen(3000 , ()=>{
    console.log("server starteddd")
})
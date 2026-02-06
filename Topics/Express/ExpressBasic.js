const express = require("express")
const PORT = 3000

const app  = express()

console.log("app is -",app)

app.get("/" , (req,res)=>{
    res.send("home page")
})

app.get("/email" , (req,res)=>{
    res.send(JSON.stringify({email :" testemail@gmail.com"}))
})

app.listen(PORT,()=>{
    console.log("server started")
})
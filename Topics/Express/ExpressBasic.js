const express  = require('express')


const app = express()

app.get('/',(req,res)=>{
    res.send("hello from home page!" )
})

app.get("/about" , (req,res)=>{
    res.send("hello from about page" + "name is" + req.query.name + "age is" + req.query.age)
})

app.listen(3000,()=>{
    console.log("server started!!!")
})
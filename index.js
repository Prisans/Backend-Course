const express = require("express")
const fs = require("fs")
const users = require("./MOCK_DATA.json")

const app = express()

app.use(express.urlencoded({extended : true}))

// routes
app.get("/",(req,res)=>{
    res.send("hello prisans")
})

// console.log(users)

// rest api

app.get("/users" , (req,res)=>{
    const html = `
    <ul>
    ${users.map(item=>`<li>${item.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html)
})

app.get("/api/users" , (req,res)=>{
    return res.json(users)
})

// dynamic routes

app.get("/api/users/:id" , (req,res)=>{
    const userId = Number(req.params.id) 

    // console.log("id is" , req.params.id)

    const newUser = users.find(item=>item.id ===userId)

    // res.send(newUser)

    return res.json(newUser)
})

app.post("/api/users" , (req,res)=>{
    const body = req.body
    users.push({...body, id : users.length +1})
    fs.writeFile('./MOCK_DATA.json' , JSON.stringify(users) , (err,data)=>{
        return res.json({status : "success" , id : users.length +1})
    })
    console.log("body is - ",body)
    return res.json({status : "pending"})
})

app.listen(8000,()=>{
    console.log("server startedd")
})
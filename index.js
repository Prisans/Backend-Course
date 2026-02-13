const express = require("express")
const fs = require("fs")
const users = require("./MOCK_DATA.json")

const app = express()

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
app.get("/",(req,res)=>{
    res.send("hello prisans")
})

// console.log(users)

// rest api -------------------------->

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

// dynamic routes ------------------>

app.get("/api/users/:id" , (req,res)=>{
    const userId = Number(req.params.id) 

    // console.log("id is" , req.params.id)

    const newUser = users.find(item=>item.id ===userId)

    // res.send(newUser)

    return res.json(newUser)
})

// post method--------->

app.post("/api/users" , (req,res)=>{
    const body = req.body
    users.push({...body, id : users.length +1})
    fs.writeFile('./MOCK_DATA.json' , JSON.stringify(users) , (err,data)=>{
        return res.json({status : "success" , id : users.length +1})
    })
    console.log("body is - ",body)
    return res.json({status : "pending"})
})

// delete method ---------------->

app.delete("/users/:id" , (req,res)=>{
    const deletedId = Number(req.params.id)
    const deletedData = users.filter((item)=>{
        return item.id !=deletedId
    })
    
    console.log(deletedData)
    fs.writeFile("./MOCK_DATA.json" , JSON.stringify(deletedData) , (err,data)=>{
        return res.json({status : "deleted"})
    })
})

// patch ( update method) ----------------->

app.patch("/users/:id" , (req,res)=>{
    const updatedId = Number(req.params.id)
    const updatedData = req.body

    let updatedUser = users.map((item)=>{
        return (
            item.id === updatedId ? {...item , ...updatedData} : item
        )
    })

    fs.writeFile("./MOCK_DATA.json" , JSON.stringify(updatedUser) , (err,data)=>{
        return res.json({status : "updated"})
    })

    // console.log(updatedUser)

})


// running server ---------------->
app.listen(8000,()=>{
    console.log("server startedd")
})
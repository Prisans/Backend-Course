const express = require("express")

const router = express.Router()

router.get("/",(req,res)=>{
    res.send("hello prisans")
})

// console.log(users)

// rest api -------------------------->

router.get("/" , async (req,res)=>{
    const dbUsers = await User.find({})
    const html = `
    <ul>
    ${dbUsers.map(item=>`<li> Name - ${item.firstName} and Email - ${item.email}</li>`).join("")}
    </ul>
    `
    res.send(html)
})



// dynamic routes ------------------>

router.get("/:id" , (req,res)=>{
    const userId = Number(req.params.id) 

    // console.log("id is" , req.params.id)

    const newUser = users.find(item=>item.id ===userId)

    // res.send(newUser)

    return res.json(newUser)
})

// post method--------->

router.post("/" ,  async (req,res)=>{
    const {first_name, last_name, email} = req.body

    const result = await User.create({
        firstName : first_name,
        lastName : last_name,
        email : email
    })
    // users.push({...body, id : users.length +1})
    // fs.writeFile('./MOCK_DATA.json' , JSON.stringify(users) , (err,data)=>{
    //     return res.json({status : "success" , id : users.length +1})
    // })
    console.log("result is - ",result)
    return res.status(201).json({msg : "success"})
})

// delete method ---------------->

router.delete("/:id" , (req,res)=>{
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

router.patch("/:id" , (req,res)=>{
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

module.exports = router
const http = require('http')
const PORT = 3000

// creating server 


// const server = http.createServer((req,res)=>{
//     if(req.url =="/"){
//         res.writeHead(200, {"Content-Type" : "text/plain"})
//         res.end("Home page")
//     }else{
//         res.writeHead(404, {"Content-Type" : "text/plain"})
//         res.end("Not found")
//     }
// })

// server.listen(3000, ()=>{
//     console.log("started!!!!")
// })


// Question 3 - Add /sum?a=3&b=5 → return the sum (you must read query params).

const url = require("url")
const server = http.createServer((req,res)=>{
    const parsedUrl = url.parse(req.url,true)

    const path = parsedUrl.pathname
    const query = parsedUrl.query

    const a = Number(query.a)
    const b = Number(query.b)
    if(req.url == "/"){
        res.writeHead(200 , {"Content-Type" : "text/plain"})
        res.end("Home page")
    }else if(path == '/sum'){
        const s = a+b
        res.end(`sum is ${s}`)
    }else{
        res.writeHead(404)
        res.end("page not found")
    }
})

server.listen(PORT,()=>{
    console.log("working")
})
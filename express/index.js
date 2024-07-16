// const http = require('http');
const express = require('express')
const mongo = require('mongoose')


const app = express()

app.get('/', (req, res)=>{
   return res.send("Hello There! welcome to node js home page!!")
})

app.get('/about',(req, res)=>{
  return res.send(`Hi ${req.query.myname}! You are at about page!!`)
})
app.listen(8080,()=> console.log("server started!"))


// const myserver =  http.createServer(app);
// myserver.listen(8080, ()=> console.log("server started!"))
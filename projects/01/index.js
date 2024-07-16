const express = require('express')
const app = express()
const fs = require('fs')
const port = 8080

const users = require('./MOCK_DATA.json')
// console.log("user", users)
const mongoose = require('mongoose')
const { type } = require('os')
const { log } = require('console')

//MiddleWare
app.use(express.urlencoded({extended: false}))

// connect mongoose to application

mongoose.connect('mongodb://127.0.0.1:27017/expressdb')
.then(()=>console.log("connetion get sucessfully to mongoose"))
.catch((err)=>console.log(err))

// Schema creation
const userSchema = new mongoose.Schema({
    first_name :{
        type: String,
        required: false
    } ,
    last_name:{
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender:{
        type: String
    },
    job_title:{
        type: String
    }

},{timestamps: true})

const User = mongoose.model("user", userSchema)


app.get('/',(req, res)=>{
    return res.send("Hello There! Welcome to Express")
})

app.post('/api/users',async(req, res)=>{
    // TODO: Create new user
    const user = req.body

    if(!user.first_name || !user.last_name || !user.email || !user.gender || !user.job_title){
        return res.send(400).json({msg: 'All fields are required .....'})
    }

    const result = await User.create({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    gender: user.gender,
    job_title: user.job_title
    })

    return res.status(201).json({msg: 'Success'})


//    users.push({
//     id: users.length+1,
//     first_name: user.first_name,
//     last_name: user.last_name,
//     email: user.email,
//     gender: user.gender,
//     job_title: user.job_title
//    })

//    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
//     return res.json({status:'Success', id: users.length})
//    })

    
})
app.get('/users',async(req, res)=>{
    const result = await User.find({})
    const html =`
    <ul>
    ${result.map((user) =>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.status(200).send(html)
})

app.get('/api/users',async(req, res)=>{
     const result = await User.find({})
    return res.json(result)
})
// app.get('/api/users/:id',(req, res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=> user.id === id)
//     return res.json(user)
// })


// app.patch('/api/users/:id',(req, res)=>{
//     return res.json({status:'Pending'})
// })

// app.delete('/api/users/:id',(req, res)=>{
//     return res.json({status:'Pending'})
// })

app.route('/api/users/:id')
.get(async (req, res)=>{
    const u = await User.findById(req.params.id)

    return res.json(u)
})
.patch(async(req, res)=>{
      const u = await User.findByIdAndUpdate(req.params.id, {last_name:'changed'})

    return res.json({status: 'Success', u})
})
.delete(async(req, res)=>{
await User.findByIdAndDelete(req.params.id)
    return res.json({status: 'deleted successfully', id : id}, )
})


app.listen(port, ()=>console.log("server started!!"))
require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser =  require('cookie-parser')
const {checkforAuth} = require('./middlewares/auth')

const Blog = require('./models/blogs')


const app = express()
const PORT =process.env.port


//connect db
mongoose.connect(process.env.mongo_url).then((e) => console.log("mongodb is connected sussfully"))

//imports routes
const User = require('./models/user')
const usersRoutes = require('./routes/user')
const BlogRoutes = require('./routes/blogs')


//midelwares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkforAuth("token"))
app.use(express.static(path.resolve('./public')))

//template setting of ejs
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

//routes
app.use('/user', usersRoutes)
app.use('/blog', BlogRoutes)

app.get('/',async(req, res)=>{
    const allblogs = await Blog.find({})
    return res.render('home',{
        user: req.user, 
        blogs: allblogs
    })
})



app.listen(PORT, console.log(`Server started at Port ${PORT} `))
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cookieParse = require('cookie-parser')
const {checkForAuthentication, restricLog} = require('./middlewares/auth')

const urlrouts = require('./routes/url')
const staticurlrouts = require('./routes/staticRouer')
const userRoutes = require('./routes/users')




mongoose.connect('mongodb://127.0.0.1:27017/shorturl').then(()=>console.log('mongo connected sucssesfully!!'))

const app = express()

const port = 8080

//MiddleWare
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParse())
app.use(checkForAuthentication)

// routers
app.use('/api/url', restricLog(["NORMAL"]), urlrouts )
app.use('/',  staticurlrouts)
app.use('/users', userRoutes)

// template setting of ejs
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))





app.listen(port, ()=>console.log(`server is running at port : ${port}`))
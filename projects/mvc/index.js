const express = require('express')
const userRoutes = require('./routes/users')
const view = require('./routes/views')
const {connectMongoDb} = require('./connection')


const app = express()
app.use(express.urlencoded({extended: false}))

//routers
app.use('/api/users', userRoutes)
app.use('/', view)

// connect mongoose to application
connectMongoDb('mongodb://127.0.0.1:27017/expressdb').then(console.log('Mongodb connected!!'))
        .catch((err=>console.log(err)))


app.listen(8080, ()=>console.log('server started!!'))

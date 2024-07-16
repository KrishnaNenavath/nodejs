const mongoose = require('mongoose')
const users = require('../models/users')

async function handlerGetUser(){
    const result = await User.find({})
    return res.json(result)
}

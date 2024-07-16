const express = require('express')

const router = express.Router()

router.get('/',(req, res)=>{
    return res.send("Hello There! Welcome to Express")
})

module.exports = router
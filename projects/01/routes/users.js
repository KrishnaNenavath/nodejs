const express = require('express')
const router = express.Router()
const {handlerGetUser} = require('../controllers/users')

router.get('/', handlerGetUser)
.post('/', handlerPostUser)

module.exports = router
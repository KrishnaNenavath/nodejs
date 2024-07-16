const express = require('express')
const router = express.Router()
const {haddleSingup, haddleLogin} = require('../controllers/user')

router.post('/', haddleSingup)
router.post('/login', haddleLogin)




module.exports = router
const express = require('express')
const router = express.Router()
const {handleHomePageShortUrl, handlegetShortUrl, handleHomePageAllShortUrl} = require('../controllers/staticroutes')
const {restricLog} = require('../middlewares/auth')

router.get('/admin', restricLog(["ADMIN"]), handleHomePageAllShortUrl)
router.get('/', restricLog(["NORMAL", "ADMIN"]), handleHomePageShortUrl)


router.get('/signup', (req, res)=>{
    res.render('signup')
})

router.get('/login', (req, res)=>{
    res.render('login')
})

router.get('/:shortId', handlegetShortUrl)



module.exports = router
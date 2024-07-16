const express = require('express')
const router = express.Router()
const {handleGenerateShortUrl, handlegetShortUrl, handleGetAnalytics, handleGetAllShortUrls} = require('../controllers/url')


router.post('/', handleGenerateShortUrl)
router.get('/', handleGetAllShortUrls)

router.get('/:shortId', handlegetShortUrl)

router.get('/analytics/:shortId', handleGetAnalytics)


module.exports = router
const URL = require('../models/urls')
const shortid = require('shortid')



async function handleGenerateShortUrl(req, res){
    const body = req.body
    if(!body.url) return res.status(400).json({error : 'requird url'})
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        vishitHistory: [],
        createdBy: req.user._id
    })
    return res.render('staticroute.ejs', {id:shortID})
return res.status(201).json({msg: 'Suscess', shortID});
}

async function handlegetShortUrl(req, res){
    const shortId = req.params.shortId;
    console.log("shortid",shortId)
    
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push: {
        vishitHistory: {
            timestamp: Date.now(),
    }}}
)
console.log("entries", entry)
res.redirect(entry.redirectURL);

}

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId
   const entry = await URL.findOne({
    shortId
        
    })
    console.log("entry",entry)
    const analytics = {
        count: entry.vishitHistory.length,
        redirectURL: entry.redirectURL,
        shortId: entry.shortId
    }
return res.status(200).json({msg: 'Suscess', analytics});
}

async function handleGetAllShortUrls(req, res){
   const entry = await URL.find({})
   return res.render('urls.ejs',{
    urls: entry
   })
}

module.exports = {handleGenerateShortUrl, handlegetShortUrl, handleGetAnalytics, handleGetAllShortUrls}
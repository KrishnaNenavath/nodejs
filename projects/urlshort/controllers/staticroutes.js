const URL = require('../models/urls')
const shortid = require('shortid')
const express = require('express')

async function handleHomePageAllShortUrl(req, res){
    // if(!req.user) return res.redirect('/login')
    const entry = await URL.find({})
   return res.render('staticroute.ejs',{
    urls: entry
   })
}

async function handleHomePageShortUrl(req, res){
    // if(!req.user) return res.redirect('/login')
    const entry = await URL.find({createdBy: req.user._id})
   return res.render('staticroute.ejs',{
    urls: entry
   })
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
if (!entry) {
            // Handle the case when entry is not found
            return res.status(404).send('Short URL not found');
        }
console.log("entries", entry)
return res.redirect(entry.redirectURL);

}




module.exports = {handleHomePageShortUrl, handlegetShortUrl, handleHomePageAllShortUrl}
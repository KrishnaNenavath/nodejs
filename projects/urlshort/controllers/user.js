const {v4: uuidv4} = require('uuid')
const {setUser} = require('../service/auth')
const User = require('../models/users')
async function haddleSingup(req, res){
    const {name, email, password} = req.body
    await User.create({
        name,
        email,
        password
    })
    return res.redirect('/')
}

async function haddleLogin(req, res){
    const { email, password} = req.body
   
    const user = await User.findOne({email, password})
     if( !user) return res.render('login.ejs', {error:"Invalid Password"})
    
        // console.log("login user", user)
    // const sessionId = uuidv4() // this is uswd only for statefull authentication
   const token =  setUser(user)
//    console.log("token", token)
    res.cookie("token", token) 
    // cookies is used only for browsers
   return res.redirect('/')

    // to use on multiple device we need to use authorization
    // return res.json({token})
    
    



}

module.exports = {haddleSingup, haddleLogin}
const jwt = require('jsonwebtoken')
const secret = 'kanth@321krishna13452'

function setUser(user){

    console.log("users", user)

   
    return jwt.sign({
        _id: user._id,
        email : user.email,
        role: user.role
    }, secret)
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        return null;
    }

    
}

module.exports = {
    setUser, getUser
}

//// satefull
    // const sessionIdToUser = new Map()

    // function setUser(id, user){
    //     sessionIdToUser.set(id, user)
    // }

    // function getUser(id){
    //     return sessionIdToUser.get(id)
    // }

    // module.exports = {
    //     setUser, getUser
    // }
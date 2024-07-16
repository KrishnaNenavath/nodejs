const JWT = require('jsonwebtoken')
const secret = "$superstart@123"

function createtokentouser(user){
    const pyload = {
        _id: user._id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role:user.role
    }
    const token =  JWT.sign(pyload, secret)
    return token

}

function validateuser(token){
    const pyload = JWT.verify(token, secret)
    return pyload
}

module.exports = {
    createtokentouser, validateuser
}
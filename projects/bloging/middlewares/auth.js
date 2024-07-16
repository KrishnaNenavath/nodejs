const {validateuser} = require('../services/auth')

function checkforAuth(cookieName){
    return (req, res, next)=>{
        const tokenCookieValue = req.cookies[cookieName]
        if(!tokenCookieValue){
            return next()
        }
       try {
         const userpyload = validateuser(tokenCookieValue)
         req.user = userpyload
       } catch (error) {
        
       }
       return next()
    }
}


module.exports = {checkforAuth}
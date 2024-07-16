const { getUser } = require("../service/auth")

function checkForAuthentication(req, res, next){
    const tokencookie = req.cookies?.token
    //  const authorizationHeaderValue = req.headers["authorization"]
     req.user = null

     if(!tokencookie) return next()
    
    
    // const token = authorizationHeaderValue.split('Bearer ')[1];
    const token = tokencookie
    const user = getUser(token)

    req.user = user
    return next()
}

function restricLog(role = []){
    return function(req, res, next){
        if(!req.user) return res.redirect('/login')
        
        if(!role.includes(req.user.role)) return res.end("Unauthorized")
        
        return next()
    }

}

// async function restricLoginUser(req, res, next){

//     // const userUid = req.cookies?.uid
    
//     const userUid = req.headers["authorization"]
    
//     if(!userUid) return res.redirect('/login')
    
//     const token = userUid.split('Bearer ')[1];
//     // const user = getUser(userUid)
//      const user = getUser(token)
//     if(!user) return res.redirect('/login')
//     req.user = user
//     next()
// }

// async function checkauth(req, res, next){

//     console.log("req__________+++++++++", req.headers["authorization"])
//     console.log("req__________+++++++++", req.headers["authorization"])

//     // const userUid = req.cookies?.uid
//     const userUid = req.headers["authorization"]
//     const token = userUid.split('Bearer ')[1];

//     const user = getUser(token)
//     req.user = user
//     next()

// }

module.exports = {checkForAuthentication, restricLog}
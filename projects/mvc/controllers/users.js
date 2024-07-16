const User = require('../models/users')

async function handdleCreateNewUser(req, res){
    const user = req.body
    if(!user.first_name || !user.last_name || !user.email || !user.gender || !user.job_title){
        return res.send(400).json({msg: 'All fields are required .....'})
    }
    const result = await User.create({
        first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    gender: user.gender,
    job_title: user.job_title
    })

    return res.status(201).send({msg : 'Success', id:result._id })

}

async function handdleGetUser(req, res){
    console.log('users in controller', User)
    const result = await User.find({})
    console.log("i am here at controllers")
return res.status(200).json({msg: "Success!", result})    
}

async function handdleGetUserById(req, res){
    const result = await User.findById(req.params.id)
return res.status(200).json({msg: "Success!", result})    
}


async function handdleUpdateUser(req, res){
    const u = await User.findByIdAndUpdate(req.params.id, {last_name:'changed'})
    return res.status(200).json({status: 'Success', id: u._id})
}

async function handdleDeleteUser(req, res){
    const u = await User.findByIdAndDelete(req.params.id)
    return res.status(200).json({status: 'Success', id: u._id})
}

module.exports = {
    handdleCreateNewUser, 
    handdleGetUser, 
    handdleUpdateUser, 
    handdleDeleteUser,
    handdleGetUserById}
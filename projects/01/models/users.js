const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    first_name :{
        type: String,
        required: false
    } ,
    last_name:{
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender:{
        type: String
    },
    job_title:{
        type: String
    }

},
{timestamps: true}
)

const Users = mongoose.model('users', usersSchema)

module.exports = Users;
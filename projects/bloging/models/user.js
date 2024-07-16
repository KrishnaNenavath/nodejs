const { createHmac, randomBytes } = require('node:crypto');
const {Schema, model} = require('mongoose')
const {createtokentouser} = require('../services/auth')

const userSchema = new Schema({
   
    fullName: {
        type: String,
        required: true

    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    salt:{
        type: String,
    },
    password:{
        type: String,
        required: true,

    },
    profileImageUrl:{
        type: String,
        default: '/images/user.png'
    },
    role:{
        type:String,
        enum:['USER', 'ADMIN'],
        default:"USER"
    }
}, {timestamps:true})

userSchema.pre('save', function (next){
    const user = this;

    if(!user.isModified("password")) return

    const salt = randomBytes(16).toString()
    const hash = createHmac('sha256', salt)
               .update(user.password)
               .digest('hex');

    this.salt = salt
    this.password = hash

    next()
})

userSchema.static('matchPasswordAndGenerateToken', async function(email, password){
    const user = await this.findOne({email});
    if(!user) throw Error('User not found')

    const salt = user.salt
    const haspassword = user.password

    const userprovidedhas =  createHmac('sha256', salt)
               .update(password)
               .digest('hex');

    if(userprovidedhas !== haspassword) throw Error('Incorrect Password!')
    const token = createtokentouser(user)
    return token
})

const User = model('user', userSchema)

module.exports = User

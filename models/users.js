const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto').randomBytes(12).toString('base64')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide the name']
    },
    email: {
        type: String,
        required: [true, 'please provide the email'],
        unique: true,
        match: [ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        , 'Please provide valid Email'],
    },
    password: {
        type: String,
        required: [true, 'please enter valid name'],
        minlength: 3,
        select: false
    },
    cart: {
        type: Array,
        default: [],
    },
    roll: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
}) 
UserSchema.pre('save', async function () {
    if(!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash( this.password, salt)
})
UserSchema.methods.getSignToken = async function() {
    return await jwt.sign({id: this._id}, process.env.SECRET_JWT, {expiresIn: '10d'})
}
UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', UserSchema)
module.exports = User
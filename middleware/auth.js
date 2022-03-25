const jwt = require('jsonwebtoken')
const User = require('../models/users')
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../middleware/ErrorResponse')

const auth = async(req, res , next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token  = req.headers.authorization.split(' ')[1]
    }
    if(!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401))
    }
    try {
        const decoded =await jwt.verify(token, process.env.SECRET_JWT)
        if(!decoded) {
            return next(new ErrorResponse('Not authorized to access this route', 401))
        }
        const user = await User.findById(decoded.id).select('-password')
        if(!user) {
            return next(new ErrorResponse('this id is not found with this token', 404))
        }
        req.user = user
        next()
    } catch (error) {
        return next(error)
    }
}
module.exports = auth
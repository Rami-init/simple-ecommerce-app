const User = require("../models/users")
const asyncHandler = require("../middleware/asyncHandler")
const ErrorResponse = require("../middleware/ErrorResponse")



exports.login = asyncHandler(async(req, res, next)=>{
    const {email, password} = req.body
    if(! email || !password) {
        return next(new ErrorResponse('please provide the name and correct password', 404))
    }
    const user = await User.findOne({email}).select('+password')
    console.log(user)
    if(user){
       const isMatch =await user.matchPassword(password)
       console.log(isMatch)
       if(isMatch){
           sendToken(user, 200, res)
       }else {
           return next(new ErrorResponse('invalid credentials email and password', 401))
       }
    } else {
        return next(new ErrorResponse('invalid credentials email and password', 401))
    }
})
exports.register = asyncHandler(async(req, res, next)=>{
   const {name, email, password} = req.body
   const user = await User.create({name, password, email})
   console.log(user)
   sendToken(user, 201, res)
})
exports.getAllUsers = asyncHandler(async(req, res, next)=>{
    const users = await User.find()
    res.status(200).json({
        success: true,
        data: users
    })

})
exports.getUser = asyncHandler(async(req, res, next)=>{
    const id = req.params.id
    const user = await User.findById(id)
    if(user){
        return res.status(200).json({
            success: true,
            data: user
        })
    }else {
        return next(new ErrorResponse('the id is not valid', 404))
    }
})
exports.updateUser = asyncHandler(async(req, res, next)=>{
    const id = req.params.id
    let user = await User.findById(id)
    if(!user) {
        return next(new ErrorResponse('the id is not valid', 404))
    }
    user = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})  
    return res.status(200).json({
        success: true,
        data: user
    })
})
exports.deleteUser = asyncHandler(async(req, res, next)=>{
    const id = req.params.id
    let user = await User.findById(id)
    if(!user) {
        return next(new ErrorResponse('the id is not valid', 404))
    }
    await user.remove() 
    return res.status(200).json({
        success: true,
        data: 'the user succssfuly deleted!'
    })
})

const sendToken = async (user, statusCode, res)=>{
    const token = await user.getSignToken()
    return res.status(statusCode).json({
        success: true,
        token
    })
}


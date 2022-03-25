const User = require('../models/users')
const ErrorResponse = require('../middleware/ErrorResponse')


const authAdmin = async (req, res, next)=>{
    try {
        const user = req.user
        if(!user) {
            return next(new ErrorResponse('the token is exprire login again', 404))
        }
        if(user.roll === 0) {
            return next(new ErrorResponse('your prmison admin have been denided', 401))
        }
        next()
    } catch(error) {
        return next(error)
    }
}
module.exports = authAdmin
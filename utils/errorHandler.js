const ErrorResponse = require('../middleware/ErrorResponse')

const errorHandler = async(err, req, res, next)=>{
    let error = {...err}
    error.message = err.message
    if(err.name === 'CastError') {
        const message = 'Resource is not found'
        error = new ErrorResponse(message, 404)
    }
    if(err.code === 11000) {
        const message = 'Duplicate Field Value Entered'
        error = new ErrorResponse(message, 401)
    }
    if(err.name === 'valdiationError'){
        const message = Object.values(err.errors).map((error)=> error.message).join(',')
        error = new ErrorResponse(message, 400)
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}
module.exports = errorHandler
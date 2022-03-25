const asyncHandler = (childFun)=> (req, res, next)=> Promise.resolve(childFun(req, res, next)).catch(next)
module.exports = asyncHandler
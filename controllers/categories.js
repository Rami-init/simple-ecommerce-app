const asyncHandler = require("../middleware/asyncHandler")
const Category = require('../models/categoreis')
const ErrorResponse = require('../middleware/ErrorResponse')


exports.createCategory = asyncHandler(async(req, res, next)=>{
   const category = await Category.create(req.body)
   sendApi(category, 201, res)
})

exports.getAllCategories = asyncHandler(async(req, res, next)=>{
    const categoreis = await Category.find()
    sendApi(categoreis, 200, res)
})
exports.getCategory = asyncHandler(async(req, res, next)=>{
    const id = req.params.id 
    const category = await Category.findById(id) 
    if(!category) {
        return next(new ErrorResponse('no found Category with this id', 404))
    }
    sendApi(category, 200, res)
})
exports.updateCategory = asyncHandler(async(req, res, next)=>{
   const id = req.params.id
   let category = await Category.findById(id)
   if(!category) {
       return next(new ErrorResponse('no found Category with this id', 404))
   }
   category = await Category.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
   sendApi(category, 201, res)
})
exports.deleteCategory = asyncHandler(async(req, res, next)=>{
   const id = req.params.id
   let category = await Category.findById(id)
   if(!category){
       return next(new ErrorResponse('no found Category with this id', 404))
   }
   await category.remove()
   sendApi('the category successfly deleted', 201, res)
})
const sendApi = async (data, statusCode, res)=>{
    res.status(statusCode).json({
        success: true,
        data: data
    })
}
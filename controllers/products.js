const asyncHandler = require("../middleware/asyncHandler")
const ErrorResponse = require('../middleware/ErrorResponse')
const Product = require('../models/products')
const cloudinary = require('cloudinary')
const fs = require('fs')

// ------------- cloudinary Api connect-------
cloudinary.config({
    cloud_name: 'for-learning-and-training', 
    api_key: '297132722512674', 
    api_secret: '3lSXNP7CvV7fWduUbH7aU5vZTtY' 
})
// sorting & pageinaion and filtering 
class ProductsFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString // is parmas in url
    }
    filtering(){
        let queryObj = {...this.queryString}
        let fieldset = ['page', 'limit', 'sort']
        fieldset.forEach((val)=> delete queryObj[val])
        queryObj = JSON.stringify(queryObj)
        queryObj = queryObj.replace(/\b(gte|gt|lt|lte|regex)\b/g, match=> `$${match}`)
        this.query = this.query.find(JSON.parse(queryObj))
        return this
    }
    sorting(){
        if(this.queryString.sort) {
            let sortBy = this.queryString.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else {
            this.query = this.query.sort('-createdAt')
        }
        return this
    }
    pagination (){
        const page = parseInt(this.queryString.page) || 1;
        const limit = parseInt(this.queryString.limit) || 4;
        const skip = (page -1) * limit;
        this.query =this.query.skip(skip).limit(limit)
        return this
    } 
    async pageSize (){
        
        return pages
    } 
}
// ---------------create Product with upload in cloadinary -------------------
exports.createProduct = asyncHandler(async(req, res, next)=>{
    const pathFile = await req.file.path 
    const fileUpload = await cloudinary.v2.uploader.upload(pathFile, {folder: 'uploads'})
    fs.unlink(pathFile, (err)=> console.log(err))
    const {public_id, secure_url} = fileUpload
    
    const {
        inStock, 
        price,
    } = req.body
    let tempBody = req.body
    const product = await Product.create({...tempBody, image:{public_id, secure_url}, price: Number(price), inStock: Number(inStock)})
    sendApi(product, 201, res)
})
// -------------get All Porducts ------------------------------------------
exports.getAllPorducts = asyncHandler(async(req, res, next)=>{
   const ProductApi = new ProductsFeatures(Product.find(), req.query).filtering().sorting().pagination()
   const products = await ProductApi.query 
   let pages;

   if(req.query.page) { 
    const page = await parseInt(req.query.page) || 1;
    const pageSize = await parseInt(req.query.limit) || 12;
    const total = await Product.countDocuments()
     pages = total / pageSize;
    if(page > pages) {
        return next(new ErrorResponse('the page not found', 404))
    }
   }
   res.status(200).json({
       success: true,
       pages,
       count: products.length,
       data: products
   })
})
exports.getProduct = asyncHandler(async(req, res, next)=>{
    const id = req.params.id
    const product = await Product.findById(id)
    if(!product) {
        return next(new ErrorResponse('no product with this produt', 404))
    }
    sendApi(product, 200, res)
})
// -------------------update Products -----------------------
exports.updateProduct = asyncHandler(async(req, res, next)=>{
    const id = req.params.id
    let product = await Product.findById(id)
    if(!product) {
        return next(new ErrorResponse('no product with this produt', 404))
    }
    product = await Product.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
    sendApi(product, 201, res)
})
//  ------------- delete products and destroy cloadinary image ----------
exports.deleteProduct = asyncHandler(async(req, res, next)=>{
    const id = req.params.id
    let product = await Product.findById(id) 
    console.log(product)
    if(!product) {
        return next(new ErrorResponse('no product with this produt', 404))
    }
    const public_id = await product.image.public_id
    console.log(public_id)
    const fileDestroy = await cloudinary.v2.uploader.destroy(public_id)
    if(!fileDestroy) {
        return next(new ErrorResponse('the image not remove from cloadinrary', 404))
    }
    await product.remove()
    sendApi('the product successfully deleted!', 200, res)
})
// short res to implement
const sendApi = async (data, statusCode, res)=>{
    res.status(statusCode).json({
        success: true,
        data: data
    })
}
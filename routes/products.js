const express = require('express')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const  router = express.Router()
const {createProduct, getAllPorducts, getProduct, updateProduct, deleteProduct} = require('../controllers/products')
router.route('/').post(auth, authAdmin, upload.single('image'), createProduct)
router.route('/products').get(getAllPorducts)
router.route('/:id').get(getProduct).put(auth, authAdmin, updateProduct).delete(auth, authAdmin, deleteProduct)

module.exports = router
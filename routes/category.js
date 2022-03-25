const express = require('express')
const  router = express.Router()
const {createCategory, getAllCategories, getCategory, updateCategory, deleteCategory} = require('../controllers/categories')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/').post(auth, authAdmin, createCategory)
router.route('/categories').get(getAllCategories)
router.route('/:id').get(getCategory).put(auth, authAdmin, updateCategory).delete(auth, authAdmin, deleteCategory)

module.exports = router
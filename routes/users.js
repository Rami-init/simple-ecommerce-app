const express = require('express')
const  router = express.Router()
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const {protect} = require('../controllers/protect')
const {login, register, getAllUsers, getUser, updateUser, deleteUser} = require('../controllers/users')
router.route('/login').post(login)
router.route('/register').post(register)
router.route('/users').get(auth,authAdmin, getAllUsers)
router.route('/infor').get(auth, protect)
router.route('/:id').get(auth, getUser).put(auth, authAdmin, updateUser).delete(auth, authAdmin, deleteUser)

module.exports = router
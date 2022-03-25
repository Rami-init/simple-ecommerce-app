const express = require('express')
const app = express()
require('dotenv').config({path: './config.env'})
const cors = require('cors')
const connectDB = require('./config/db')
const errorHandler = require('./utils/errorHandler')
cors()
connectDB()
app.use(express.json())
app.use('/api/user', require('./routes/users'))
app.use('/api/product', require('./routes/products'))
app.use('/api/category', require('./routes/category'))
app.use(errorHandler)
app.get('/', (req, res, next)=>{
    res.send('hello')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`the server conncted in: ${PORT} `)
})
const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide the category name'],
        trim: true,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide the id of creator']
    } 
},{
    timestamps: true
})

const Category = mongoose.model('Category', CategorySchema)
module.exports = Category
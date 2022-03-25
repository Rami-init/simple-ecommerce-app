const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'please provide the name product']
    },
    description: {
        type: String,
        required: [true, 'please provide the description product']
    },
    price: {
        type: Number,
        required: [true, 'please provide the price product']
    },
    content: {
        type: String,
        required: [true, 'please provide the content product']
    },
    rating: {
        type: Number,
        default: 4.1
    },
    image: {
        type: Object,
    },
    checked: {
        type: Boolean,
        default: false,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'please provide the category of product']
    },
    inStock: {
        type: Number,
        required: [true, 'please provide the qty of product'],
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide the creator roduct']
    },
    sold: {
        type: Boolean,
        default: false,
        
    }
},{
    timestamps: true,
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product
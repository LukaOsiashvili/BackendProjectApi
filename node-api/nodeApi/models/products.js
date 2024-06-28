const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    code: {type: String, required: true},
    productName: {type: String, required: true},
    color: {type: String},
    price: {type: Number}
    },
    {
        collection: 'Products',
        timestamps: true,
        read: 'nearest',
        writeConcern: {
            w: 'majority',
            j: true,
            wtimeout: 30000
        }
});

const productsModel = mongoose.model('Products', productSchema);
module.exports = productsModel;
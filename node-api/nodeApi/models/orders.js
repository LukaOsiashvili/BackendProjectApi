const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({

    product: {type: String, required: true },
    forBranch: [{
      branchName: {type: String, required: true},
      address: {type: String, required: true}
    }],
    openDate: {type: Date, required: true},
    dueDate: {type: Date, required: true},
    issuedByWorker: [{
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    }],
    indInstructions: {type: String},
    engraved: {type: Boolean, required: true},
    doneByWorker: [{
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    }],
    comments: {type: String},
    price: {type: Number, required: true},
    active: {type: Boolean}
}, {
    collection: 'Orders',
    timestamps: true,
    read: 'nearest',
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeoutMS: 30000
    }

})

const ordersModel = mongoose.model('Order', ordersSchema);
module.exports = ordersModel;
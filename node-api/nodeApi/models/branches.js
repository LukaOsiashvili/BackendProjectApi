const mongoose = require('mongoose');

const branchesSchema = new mongoose.Schema({

    branchName: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true}

    }, {
        collection: 'Branches',
        timestamps: true,
        read: 'nearest',
        writeConcern: {
            w: 'majority',
            j: true,
            wtimeout: 30000
        }
    }
)

const branchesModel = mongoose.model('Branches', branchesSchema);
module.exports = branchesModel;
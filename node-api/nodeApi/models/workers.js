const mongoose = require('mongoose');

const workersSchema = new mongoose.Schema({

    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dob: {type: Date},
    salary: {type: Number},
    joinedCompany: {type: Date},
    leftCompany: {type: Date},
    branches: [{
        branchName: {type: String}
    }],
    role: {type: String},
    username: {type: String, required: true, unicode: true},
    password: {type: String, required: true},
    permits: [{type: String}]
}, {
    collection: 'Workers',
    timestamps: true,
    read:'nearest',
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 30000
    }
});

const workersModel = mongoose.model('Workers', workersSchema);
module.exports = workersModel;
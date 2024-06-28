const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({

        name: {type: String, required: true}

    },
    {
        collection: 'Addresses',
        timestamps: true,
        writeConcern:{
            w:'majority',
            j:true,
            wtimeoutMS:30000

        },
        read: 'nearest'
    });

const Model = mongoose.model('Address', addressSchema);
module.exports = Model;

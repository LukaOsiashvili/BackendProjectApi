const mongoose = require('mongoose');

const citiesSchema = new mongoose.Schema({

        name: {type: String, required: true}

    },
    {
        collection: 'Cities',
        timestamps: true,
        writeConcern:{
            w:'majority',
            j:true,
            wtimeoutMS:30000

        },
        read: 'nearest'
    });

const Model = mongoose.model('City', citiesSchema);
module.exports = Model;

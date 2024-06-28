const mongoose = require('mongoose');

const permissionsSchema = new mongoose.Schema({

        name: [{type: String, required: true}],
        forRole: {type: String, required: true}

    },
    {
        collection: 'Permissions',
        timestamps: true,
        writeConcern:{
            w:'majority',
            j:true,
            wtimeoutMS:30000

        },
        read: 'nearest'
    });

const Model = mongoose.model('Permission', permissionsSchema);
module.exports = Model;

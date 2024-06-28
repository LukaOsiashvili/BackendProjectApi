const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({

    name: {type: String, required: true}

},
    {
        collection: 'Roles',
        timestamps: true,
        writeConcern:{
            w:'majority',
            j:true,
            wtimeoutMS:30000

        },
        read: 'nearest'
});

const Model = mongoose.model('Role', rolesSchema);
module.exports = Model;

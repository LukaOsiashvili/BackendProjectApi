const RolesModel = require('../models/roles')

module.exports = {
    getAll: (req, res) => {
        RolesModel.find({})
            .then(data =>{
                res.json(data);
            })
            .catch(error =>{
                res.status(500).json(error);
                console.log('Could Not Fetch All Workers');
            })
    },

    getOne: async (req, res) =>{
        try{
            const item = await RolesModel.findById(req.params.id);
            res.json(item);
        }catch (error){
            res.status(500).json(error);
        }
    },

    add: async (req, res) =>{
        try{
            const savedItem = await new RolesModel(req.body).save();
            res.json(savedItem);
        } catch (error){
            res.status(500).json(error);
        }
    },

    update: async (req, res) => {
        try {
            const updatedItem = await RolesModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

            if (!updatedItem) {
                return res.status(404).json({ message: 'Not found' });
            }

            return res.json(updatedItem);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating information' });
        }
    },

    delete: async (req, res) =>{
        try{
            await RolesModel.deleteOne({_id: req.params.id});
            res.json({success: true});
        }catch (error){
            res.status(500).json(error);
        }
    }

}
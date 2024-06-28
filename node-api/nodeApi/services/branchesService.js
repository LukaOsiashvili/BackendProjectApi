const BranchesModel = require('../models/branches')

module.exports = {
    getAll: (req, res) => {
        BranchesModel.find({})
            .then(data =>{
                res.json(data);
            })
            .catch(error =>{
                res.status(500).json(error);
            })
    },

    getOne: async (req, res) =>{
        try{
            const item = await BranchesModel.findById(req.params.id);
            res.json(item);
        }catch (error){
            res.status(500).json(error);
        }
    },

    add: async (req, res) =>{
        try{
            const savedItem = await new BranchesModel(req.body).save();
            res.json(savedItem);
        } catch (error){
            res.status(500).json(error);
        }
    },

    update: async (req, res) => {
        try {
            const updatedItem = await BranchesModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

            if (!updatedItem) {
                return res.status(404).json({ message: 'Branch not found' });
            }

            return res.json(updatedItem);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating branch information' });
        }
    },

    delete: async (req, res) =>{
        try{
            await BranchesModel.deleteOne({_id: req.params.id});
            res.json({success: true});
        }catch (error){
            res.status(500).json(error);
        }
    }

}
const ProductsModel = require('../models/products')

module.exports = {
    getAll: (req, res) => {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        ProductsModel.find({}).skip((page - 1) * limit).limit(limit)
            .then(data =>{
                res.json(data);
            })
            .catch(error =>{
                res.status(500).json(error);
                console.log('Could Not Fetch All Products');
            })
    },

    getOne: async (req, res) =>{
        try{
            const item = await ProductsModel.findById(req.params.id);
            res.json(item);
        }catch (error){
            res.status(500).json(error);
        }
    },

    add: async (req, res) =>{
        try{
            const savedItem = await new ProductsModel(req.body).save();
            res.json(savedItem);
        } catch (error){
            res.status(500).json(error);
        }
    },

    update: async (req, res) => {
        try {
            const updatedItem = await ProductsModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

            if (!updatedItem) {
                return res.status(404).json({ message: 'Product not found' });
            }

            return res.json(updatedItem);
        } catch (error) {
            console.error('Error Updating Product Information:', error);
            return res.status(500).json({ message: 'Error Updating Product Information' });
        }
    },

    delete: async (req, res) =>{
        try{
            await ProductsModel.deleteOne({_id: req.params.id});
            res.json({success: true});
        }catch (error){
            res.status(500).json(error);
        }
    }

}
const WorkersModel = require('../models/workers');
const PermissionsModel = require('../models/permissions');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    getAll: (req, res) => {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        WorkersModel.find({}, {password: 0}).skip((page - 1) * limit).limit(limit)
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
            const item = await WorkersModel.findById(req.params.id, {password: 0});
            res.json(item);
        }catch (error){
            res.status(500).json(error);
        }
    },

    update: async (req, res) => {
        try {
            const updatedItem = await WorkersModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

            if (!updatedItem) {
                return res.status(404).json({ message: 'Worker not found' });
            }

            return res.json(updatedItem);
        } catch (error) {
            console.error('Error updating worker information:', error);
            return res.status(500).json({ message: 'Error updating worker information' });
        }
    },

    delete: async (req, res) =>{
        try{
            await WorkersModel.deleteOne({_id: req.params.id});
            res.json({success: true});
        }catch (error){
            res.status(500).json(error);
        }
    },

    register: async (req, res) =>{
        try{
            if(!req.body.username || !req.body.password){
                return res.status(400).json({message: 'REQUIRED FIELD MISSING'});
            }

            const exists = await WorkersModel.findOne({username: req.body.username});

            if(exists){
                return res.status(409).json({message: 'USER ALREADY EXISTS'});
            }

            const hashPassword = bcrypt.hashSync(req.body.password, 10);

            // If permits field is not entered, permits data will be fetched by role from Permissions collection

            if (!req.body.permits && req.body.role) {
                const rolePermissions = await PermissionsModel.findOne({ forRole: req.body.role }).select('name');
                req.body.permits = rolePermissions.name;
            }

            req.body.password = hashPassword;

            const savedUser = await new WorkersModel(req.body).save();

            const token = jwt.sign({
                id: savedUser._id,
                username: savedUser.username,
                permits: savedUser.permits
            }, process.env.SECRET_KEY);

            res.json({token});
        } catch (err){
            console.log(err);
            res.status(500).send(err);
        }
    },

    login: async (req, res) => {

        try{
            const worker = await WorkersModel.findOne({
                username: req.body.username
            });

            if(!worker) {
                return res.status(404).json({message: 'USER NOT FOUND'});
            }

            if(bcrypt.compareSync(req.body.password, worker.password)){
                const token =  jwt.sign({
                    id: worker._id,
                    username: worker.username,
                    permits: worker.permits
                }, process.env.SECRET_KEY);

                res.json({token});
            }else{
                return res.status(404).json({message: 'USER NOT FOUND'});
            }
        } catch (err){
            console.log(err);
            res.status(500).send(err);
        }

    }

}
const userModel = require('../models/user')

const loginController = async (req, resp) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await userModel.findOne({ email, password })
        if (!user) {
            return resp.status(404).send('User not Registered');
        }
        resp.status(200).json({
            success: true,
            user
        });
    }
    catch (error) {
        resp.status(400).json({
            success: false,
            error,
        })
    }
};

const registerController = async (req, res) => {
    try{
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).json({
            success: true,
            newUser,
        })
    }
    catch(error){
        res.status(400).json({
            success: true,
            error
        })
    }
};

module.exports = { loginController, registerController };
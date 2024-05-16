const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, 'name is required']
        },
        email:{
            type:String,
            required:[true, 'Email is required and should be unique'],
            unique:true
        },
        password:{
            type:String,
            required:[true, 'Password is required'],
            unique:true
        },
    },
    { timestamps: true}
)

const user = mongoose.model('users',userSchema)
module.exports = user;
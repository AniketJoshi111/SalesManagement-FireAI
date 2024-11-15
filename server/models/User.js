const mongoose = require("mongoose");
const { type } = require("os");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['User','Admin'],
        required:true,
        default:'User'
    }
});

module.exports = mongoose.model('User',UserSchema);

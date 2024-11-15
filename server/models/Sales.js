const mongoose = require("mongoose");
const { type } = require("os");

const SalesSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        unique:true
    },
    amount:{
        type:Number,
        required:true
    },
    DateofSale:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum :['pending','completed','returned'],

    },
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
     }

})
const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: [true, "userId is required"]
    },
    amount: {
        type: Number,
        requires: [true, "amount is required"]
    },
    type:{
        type: String,
        required: [true,"type is required"]
    },
    category: {
        type: String,
        requires: [true, "category is required"]
    },
    reference: {
        type: String,
    },
    description: {
        type: String,
        requires: [true, "desc is required"]
    },
    date: {
        type: Date,
        requires: [true, "date is required"]
    }
},
    { timestamps: true }
);

const transactionModel = mongoose.model("transactions", transactionSchema)

module.exports = transactionModel;
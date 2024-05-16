const transactionModel = require("../models/transactioModel")
const moment = require("moment")
const getAllTransaction = async(req,res) =>{
    try{
        // destructure from req.body
        const {freq, selectedDate, userId, expenseType} = req.body

        // get all transaction based on the given userId and date frequency
        const transactions = await transactionModel.find(
            {
            userId: userId,
            ...(freq !== 'custom'? {
            date: {
                 $gt : moment().subtract(Number(freq),'d').toDate()
                }
            } : {
                date:{
                    $gte : selectedDate[0],
                $lte : selectedDate[1]
                }
            }),
            ...(expenseType!=='all' && {type: expenseType})
            });
        res.status(200).json(transactions)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

const addTransaction = async(req,res) =>{
    try{
        const newTransaction = new transactionModel(req.body)
        await newTransaction.save()
        res.status(201).send('Transaction created')
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {getAllTransaction, addTransaction}
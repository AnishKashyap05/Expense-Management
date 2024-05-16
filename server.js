const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/connectDB')
const { loginController, registerController } = require('./controllers/userController')
const { addTransaction, getAllTransaction } = require('./controllers/transactionController')
const path =require('path')
dotenv.config();

// call databse
connectDB();

// initialise the express application
const app = express();

// morgan - enables HTTP request logging to the console
// Everytime you make any HTTP request(get, post, delete....),
// it will log some details to the console
app.use(morgan('dev'))

// parse the incoming request from client to JSON format
app.use(express.json())

// to avoid CORS error
app.use(cors())

app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',(req,res) =>{
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

//Start the express server at port 8030 
//and once started it will log to console
const PORT = 8030 || process.env.PORT
app.listen(PORT, () =>{
    console.log(`server is running on Port ${PORT}`);
});

app.get('/',(req,res)=>{
    res.send("Hello")
})

//user routes
app.post('/users/login',loginController)
app.post('/users/register',registerController)


//transaction routes
app.post('/transaction/add-transaction',addTransaction)
app.post('/transaction/get-transactions', getAllTransaction)



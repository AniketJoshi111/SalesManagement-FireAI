const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();
const router = require('./routes/sales')

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// Make sure you link the sales.js to a specific route
app.use('/', router);

const startServer = async() => {
    try{
        await connectDB()
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    }
    catch(error){
        console.error("Error during server startup")
        console.log(error.message);
    }

}

startServer()

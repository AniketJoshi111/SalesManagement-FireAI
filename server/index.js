const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./db'); 
require('dotenv').config();
const salesRouter = require('./routes/sales');
const userRouter = require('./routes/user');


const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/sales', salesRouter); 
app.use('/users', userRouter);


app.get('/', (req, res) => {
  res.send('Server is running. Navigate to /sales to test routes.');
});

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Start the Express server
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error('Error during server startup');
    console.log(error.message);
  }
};

startServer();


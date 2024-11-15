const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("MONGO URI = ", process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

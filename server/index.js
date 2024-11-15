const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

// const userRoutes = require('./routes/users');
// const salesRoutes = require('./routes/sales');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// app.use('/users', userRoutes);
// app.use('/sales', salesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

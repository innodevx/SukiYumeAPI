const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const characterRoutes = require('./routes/characterRoutes');
app.use('/api/characters', characterRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

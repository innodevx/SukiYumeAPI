const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const characterRoutes = require('./routes/characterRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const connectDB = require('./config/db');
connectDB();


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/characters', characterRoutes);
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const mongoose = require('mongoose');
const mongodbURL = process.env.MONGODB_URL || 'mongodb://localhost:27017/dev';

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURL);
    console.log('✅ Successful connection to MongoDB on' + mongodbURL);
  } catch (error) {
    console.error('❌ MongoDB connection error :', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
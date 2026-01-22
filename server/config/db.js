
// server/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // We will put the actual URL in a secret file later
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1); // Stop the app if DB fails
  }
};

export default connectDB;
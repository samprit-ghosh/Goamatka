import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

async function testDB() {
  const URI = process.env.MONGODB_URI;
  console.log('Connecting to:', URI ? 'URI found' : 'URI MISSING');
  try {
    await mongoose.connect(URI!);
    console.log('Database connection successful!');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
}

testDB();

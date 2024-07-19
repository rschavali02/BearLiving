// pages/api/test-connection.js
//testing Vercel MongoDB connection
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
  try {
    await dbConnect();
    const userCount = await User.countDocuments(); // Fetch the count of users as a simple test
    res.status(200).json({ message: 'Connected to MongoDB successfully', userCount });
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to MongoDB', error: error.message });
  }
}

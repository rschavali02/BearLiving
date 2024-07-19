// pages/api/email.ts
import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions);
};

// Define the email schema
const emailSchema = new mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Create a model from the schema
const Email = mongoose.models.Email || mongoose.model('Email', emailSchema);

const emailHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();
  
    if (req.method === 'POST') {
      const { email, message } = req.body;
  
      const newEmail = new Email({ email, message });
      try {
        await newEmail.save();
        res.status(201).json(newEmail);
      } catch (err) {
        if (err instanceof Error) {
          res.status(400).json({ error: err.message });
        } else {
          res.status(400).json({ error: "An unknown error occurred" });
        }
      }
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  };
  
  export default emailHandler;


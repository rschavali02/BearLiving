// pages/api/register.js
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Waitlist Confirmation',
    text: 'Thank you for joining our waitlist! - BearLiving Team',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

export default async function handler(req, res) {
  await dbConnect();

  const { email, password } = req.body;

  try {
    const newUser = new User({ email, password });
    await newUser.save();
    sendConfirmationEmail(email);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error registering user' });
  }
}

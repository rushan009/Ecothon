const mongoose = require('mongoose');
const User = require('../models/User');
const Collector = require('../models/Collector');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this phone number already exists' });
    }

    // Create new user
    const newUser = new User({ name, email, phone, password, role });
    await newUser.save();

    // If the user is a collector, create a corresponding collector document
    if (role === 'collector') {
      const newCollector = new Collector({ user_id: newUser._id });
      await newCollector.save();
    }

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('Error registering user:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
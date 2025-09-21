// src/controllers/authController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user provided email and password
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // 2. Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // 3. Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create and save the new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // 5. Send a success response
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Check for email and password
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // 2. Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      // Use a generic error message for security
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3. Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 4. Generate a JWT
    const payload = {
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' } // Token expires in 1 hour
    );
    
    // 5. Send the token to the client
    res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
export const getMe = async (req: Request, res: Response) => {
  // The user data is attached to the request in the 'protect' middleware
  const user = (req as any).user;
  res.status(200).json(user);
};
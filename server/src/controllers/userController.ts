import { Request, Response } from 'express';
import User from '../models/user';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({userId: user?.id});
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    // Assuming you implement a method to generate auth tokens on your User model
    res.json({ userId: user?.id });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
};

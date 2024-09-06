import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import user from '../models/user';

const secretKey = process.env.SECRET_JWT as string;

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized access' });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { userId: string };
    const userId = await user.findById(decoded.userId).select('_id');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized user' });
    }
    
    req.user = userId._id;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default authMiddleware;

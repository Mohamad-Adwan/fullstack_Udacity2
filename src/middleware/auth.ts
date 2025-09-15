import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request { userId?: number }

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: 'missing auth header' });
    const token = header.split(' ')[1];
    const payload: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = payload.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'invalid token' });
  }
};
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Expect header: Authorization: Bearer <token>
  const token = req.headers['authorization'];
  if (!token) {
    res.status(401).json('No token provided');
    return 
  }

  try {
    const jwtKey = process.env.JWT_KEY!;
    const decoded = jwt.verify(token, jwtKey) as JwtPayload;
    // Attach user ID to the request
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json('Invalid or expired token');
    return
  }
}
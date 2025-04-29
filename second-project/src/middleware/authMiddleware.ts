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
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json('No token provided');
    return 
  }

  const token = authHeader.split(' ')[1];
  try {
    const jwtKey = process.env.JWT_KEY!;
    const decoded = jwt.verify(token, jwtKey) as JwtPayload;
    // Attach user ID to the request
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json('Invalid or expired token');
    return
  }
}
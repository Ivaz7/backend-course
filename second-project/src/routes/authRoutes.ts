import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../lib/db';

const router = express.Router();

// register
router.post('/register', (req: Request, res: Response) => {

});

// login
router.post('/login', (req: Request, res: Response) => {
  
});

export default router;
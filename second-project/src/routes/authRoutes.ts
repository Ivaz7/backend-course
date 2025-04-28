import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db, { insertTodo, insertUser } from '../lib/db';

const router = express.Router();

// register a new user (/auth/register)
router.post('/register', (req: Request, res: Response) => {
  const { username, password } = req.body;

  // encrypt password
  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    // insert a new user to the database
    const result = insertUser.run(username, hashedPassword);

    // default todo
    // insert todo
    const defaultTodo = `Hello :) Add your first todo`;
    insertTodo.run(result.lastInsertRowid, defaultTodo);

    // token jwt
    const jwtKey = process.env.JWT_KEY!;

    //  create token a new user
    const token = jwt.sign({ id: result.lastInsertRowid }, jwtKey, { expiresIn: '24h' });
    res.json({ token })
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }

  console.log(username, hashedPassword);
  res.sendStatus(201);
});

// login (/auth/login)
router.post('/login', (req: Request, res: Response) => {
  
});

export default router;
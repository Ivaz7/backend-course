import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient';

const router = express.Router();

// register a new user (/auth/register)
router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // encrypt password
  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    // insert a new user to the database
    const result = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      }
    })

    // default todo
    // insert todo
    const defaultTodo = `Hello :) Add your first todo`;
    await prisma.todo.create({
      data: {
        task: defaultTodo,
        userId: result.id
      }
    })

    // token jwt
    const jwtKey = process.env.JWT_KEY!;

    //  create token a new user
    const token = jwt.sign({ id: result.id }, jwtKey, { expiresIn: '24h' });
    res.json({ token });
    return;
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
});

// login (/auth/login)
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  try {
    // get user
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    // if the user was not found
    if (!user) { 
      res.status(404).send('User not found');
      return;
    };

    // get password
    const passwordUser = user.password;

    // sync compare encrypt the password
    const passwordIsValid = bcrypt.compareSync(password, String(passwordUser));

    // if password does not match
    if (!passwordIsValid) {
      res.status(401).send("Your password is incorrect");
      return;
    }
    
    // token jwt
    const jwtKey = process.env.JWT_KEY!;

    const token = jwt.sign({ id: user.id }, jwtKey, { expiresIn: '24h' });
    res.json({ token })
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
});

export default router;
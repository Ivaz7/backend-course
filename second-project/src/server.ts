import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import authRouters from './routes/authRoutes';
import todoRouters from './routes/todoRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// use json file
app.use(express.json());

// config for telling where the public
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// routes
app.use('/auth', authRouters);
app.use('/todos', todoRouters);

app.listen(PORT, () => {
  console.log(`Server is running in: ${PORT}`)
});
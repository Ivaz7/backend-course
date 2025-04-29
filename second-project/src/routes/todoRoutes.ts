import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { 
  getTodos,
  insertTodo,
} from '../lib/db';

const router = express.Router();

// get all todo
router.get('/', (req: Request, res: Response) => {
  const userId = req.userId!;
  const todos = getTodos.all(userId);
  res.json(todos);
});

// create todo
router.post('/', (req: Request, res: Response) => {
  const { task } = req.body;
  const userId = req.userId!;
  const result = insertTodo.run(userId, task);
  res.json({
    id: result.lastInsertRowid,
    task,
    completed: 0
  })
});

// update todo
router.put('/:id', (req: Request, res: Response) => {

});

// delete todo
router.delete('/:id', (req: Request, res: Response) => {
  
})

export default router;
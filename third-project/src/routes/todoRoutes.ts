import express, { Request, Response } from 'express';
import prisma from '../prismaClient';

const router = express.Router();

// get all todo
router.get('/', async (req: Request, res: Response) => {
  const userId = req.userId!;
  const todos = await prisma.todo.findMany({
    where: {
      userId,
    }
  })
  res.json(todos);
});

// create todo
router.post('/', async (req: Request, res: Response) => {
  const { task } = req.body;
  const userId = req.userId!;
  const result = await prisma.todo.create({
    data: {
      task,
      userId
    }
  })
  res.json(result)
});

// update todo
router.put('/:id', async (req: Request, res: Response) => {
  const userId = req.userId!;
  const { completed } = req.body;
  const { id } = req.params;
  const result = await prisma.todo.update({
    where: {
      id: parseInt(id),
      userId,
    }, 
    data: {
      completed: !!completed
    }
  })
  res.json(result)
});

// delete todo
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.userId!;
  const result = await prisma.todo.delete({
    where: {
      id: parseInt(id),
      userId,
    }
  })
  res.json(result)
})

export default router;
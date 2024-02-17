import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const { id } = query;

  switch (method) {
    case 'GET':
      try {
        if (id) {
          // Fetch a specific goal by id
          const goal = await prisma.goal.findUnique({
            where: { id: Number(id) },
          });
          if (goal) {
            res.status(200).json(goal);
          } else {
            res.status(404).json({ error: 'goal not found' });
          }
        } else {
          // Fetch all goals
          const goals = await prisma.goal.findMany();
          res.status(200).json(goals);
        }
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error retrieving goal(s)' });
      }
      break;

    case 'PUT':
      try {
        const test = await prisma.goal.update({
          where: { id: Number(id) },
          data: body,
        });
        res.status(200).json(test);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error updating test entry' });
      }
      break;

    case 'POST':
      try {
        const goal = await prisma.goal.create({
          data: {
            name: body.name
          },
        });
        res.status(201).json(goal);
      } catch (e) {
        console.error('Error during POST operation:', e);
        res.status(500).json({ error: 'Error creating goal' });
      }
      break;

    case 'DELETE':
      try {
        await prisma.goal.delete({
          where: { id: Number(id) },
        });
        res.status(204).end();
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error deleting test entry' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
    
    
}

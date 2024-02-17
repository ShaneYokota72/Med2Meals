import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const { id } = query;

  switch (method) {
    case 'GET':
      try {
        if (id) {
          // Fetch a specific diet by id
          const diet = await prisma.diet.findUnique({
            where: { id: Number(id) },
          });
          if (diet) {
            res.status(200).json(diet);
          } else {
            res.status(404).json({ error: 'diet not found' });
          }
        } else {
          // Fetch all diets
          const diets = await prisma.diet.findMany();
          res.status(200).json(diets);
        }
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error retrieving diet(s)' });
      }
      break;

    case 'PUT':
      try {
        const test = await prisma.diet.update({
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
        const diet = await prisma.diet.create({
          data: {
            name: body.name
          },
        });
        res.status(201).json(diet);
      } catch (e) {
        console.error('Error during POST operation:', e);
        res.status(500).json({ error: 'Error creating diet' });
      }
      break;

    case 'DELETE':
      try {
        await prisma.diet.delete({
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

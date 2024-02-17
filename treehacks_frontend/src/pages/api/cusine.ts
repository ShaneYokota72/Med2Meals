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
          // Fetch a specific cusine by id
          const cusine = await prisma.cusine.findUnique({
            where: { id: Number(id) },
          });
          if (cusine) {
            res.status(200).json(cusine);
          } else {
            res.status(404).json({ error: 'cusine not found' });
          }
        } else {
          // Fetch all cusines
          const cusines = await prisma.cusine.findMany();
          res.status(200).json(cusines);
        }
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error retrieving cusine(s)' });
      }
      break;

    case 'PUT':
      try {
        const test = await prisma.cusine.update({
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
        const cusine = await prisma.cusine.create({
          data: {
            name: body.name
          },
        });
        res.status(201).json(cusine);
      } catch (e) {
        console.error('Error during POST operation:', e);
        res.status(500).json({ error: 'Error creating cusine' });
      }
      break;

    case 'DELETE':
      try {
        await prisma.cusine.delete({
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

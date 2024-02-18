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
          // Fetch a specific restaurant by id
          const restaurant = await prisma.restaurant.findUnique({
            where: { id: Number(id) },
          });
          if (restaurant) {
            res.status(200).json(restaurant);
          } else {
            res.status(404).json({ error: 'restaurant not found' });
          }
        } else {
          // Fetch all restaurants
          const restaurants = await prisma.restaurant.findMany();
          res.status(200).json(restaurants);
        }
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error retrieving restaurant(s)' });
      }
      break;

    case 'PUT':
      try {
        const test = await prisma.restaurant.update({
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
        const restaurant = await prisma.restaurant.create({
          data: {
                name: body.name,
                imageUrl: body.imageUrl,
          },
        });
        res.status(201).json(restaurant);
      } catch (e) {
        console.error('Error during POST operation:', e);
        res.status(500).json({ error: 'Error creating restaurant' });
      }
      break;

    case 'DELETE':
      try {
        await prisma.restaurant.delete({
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

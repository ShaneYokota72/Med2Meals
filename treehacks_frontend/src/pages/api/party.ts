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
          // Fetch a specific party by id
          const party = await prisma.party.findUnique({
            where: { id: Number(id) },
          });
          if (party) {
            res.status(200).json(party);
          } else {
            res.status(404).json({ error: 'party not found' });
          }
        } else {
          // Fetch all partys
          const partys = await prisma.party.findMany();
          res.status(200).json(partys);
        }
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error retrieving party(s)' });
      }
      break;

    case 'PUT':
      try {
        const test = await prisma.party.update({
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
            const { name, capacity, eventTime, restaurantId } = body;
            const party = await prisma.party.create({
            data: {
                name,
                capacity: Number(capacity),
                eventTime: new Date(eventTime),
                restaurantId: Number(restaurantId),
            },
            });
            res.status(201).json(party);
        } catch (e) {
            console.error('Error during POST operation:', e);
            res.status(500).json({ error: 'Error creating party' });
        }
    case 'DELETE':
      try {
        await prisma.party.delete({
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

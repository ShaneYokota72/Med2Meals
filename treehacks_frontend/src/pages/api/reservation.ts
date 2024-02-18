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
          // Fetch a specific reservation by id
          const reservation = await prisma.reservation.findUnique({
            where: { id: Number(id) },
          });
          if (reservation) {
            res.status(200).json(reservation);
          } else {
            res.status(404).json({ error: 'reservation not found' });
          }
        } else {
          // Fetch all reservations
          const reservations = await prisma.reservation.findMany();
          res.status(200).json(reservations);
        }
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error retrieving reservation(s)' });
      }
      break;

    case 'PUT':
      try {
        const test = await prisma.reservation.update({
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
        const reservation = await prisma.reservation.create({
          data: {
                partyId,
          },
        });
        res.status(201).json(reservation);
      } catch (e) {
        console.error('Error during POST operation:', e);
        res.status(500).json({ error: 'Error creating reservation' });
      }
      break;

    case 'DELETE':
      try {
        await prisma.reservation.delete({
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

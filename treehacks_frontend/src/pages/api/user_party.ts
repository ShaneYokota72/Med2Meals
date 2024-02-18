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
          // Fetch a specific user_party by id
          const user_party = await prisma.user_party.findUnique({
            where: { id: Number(id) },
          });
          if (user_party) {
            res.status(200).json(user_party);
          } else {
            res.status(404).json({ error: 'user_party not found' });
          }
        } else {
          // Fetch all user_partys
          const user_partys = await prisma.user_party.findMany();
          res.status(200).json(user_partys);
        }
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error retrieving user_party(s)' });
      }
      break;

    case 'PUT':
      try {
        const test = await prisma.user_party.update({
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
    const { partyId, userId } = body;
    // Start a transaction to ensure both operations are completed successfully
    const result = await prisma.$transaction(async (prisma) => {
      // Create the UserParty entry
      const userParty = await prisma.userParty.create({
        data: {
          partyId: Number(partyId),
          userId: Number(userId),
        },
      });

      // Increment the registered count in the Party table
      const updatedParty = await prisma.party.update({
        where: { id: Number(partyId) },
        data: {
          registered: {
            increment: 1,
          },
        },
      });

      return { userParty, updatedParty };
    });

    res.status(201).json(result.userParty);
  } catch (e) {
    console.error('Error during POST operation:', e);
    res.status(500).json({ error: 'Error creating user_party entry' });
  }
  break;
    case 'DELETE':
      try {
        await prisma.user_party.delete({
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

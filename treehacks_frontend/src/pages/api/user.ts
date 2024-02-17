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
          // Fetch a specific user by id
          const user = await prisma.user.findUnique({
            where: { id: Number(id) },
          });
          if (user) {
            res.status(200).json(user);
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        } else {
          // Fetch all users
          const users = await prisma.user.findMany();
          res.status(200).json(users);
        }
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error retrieving user(s)' });
      }
      break;

    case 'PUT':
      try {
        const test = await prisma.user.update({
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
        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await prisma.user.create({
          data: {
            username: body.username,
            password: hashedPassword,
            age: body.age,
          },
        });

        // Do not return the password hash
        const { password, ...rest } = user;

        res.status(201).json(rest);
      } catch (e) {
        console.error('Error during POST operation:', e);
        res.status(500).json({ error: 'Error creating user' });
      }
      break;

    case 'DELETE':
      try {
        await prisma.user.delete({
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

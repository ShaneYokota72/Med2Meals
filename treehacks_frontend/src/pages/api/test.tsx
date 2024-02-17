import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export interface Item {
  id: string;
  name: string;
}

export interface PostInput {
  title: string;
  content: string;
  published: boolean;
}



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      console.log(`GET request for items`);
      try {
      const { id } = req.query;

      if (id) {
        const test = await prisma.test.findUnique({
          where: {
            id: Number(id),
          },
        });
        res.status(200).json(test);
      } else {
        const tests = await prisma.test.findMany();
        res.status(200).json(tests);
      }
    } catch (e) {
      console.error('Error during GET operation:', e);
      res.status(500).json({ error: 'Error retrieving tests' });
    }
    break;
    case 'PUT':
    try {
      const { id } = req.query;
      const testInput: PostInput = body;

      const test = await prisma.test.update({
        where: {
          id: Number(id),
        },
        data: testInput,
      });

      res.status(200).json(test);
    } catch (e) {
      console.error('Error during PUT operation:', e);
      res.status(500).json({ error: 'Error updating test' });
    }
    break;
    case 'POST':
      console.log('POST request to create a new post');
      try {
        const postInput: PostInput = body;
        console.log('POST request to create a new post', postInput);

        const post = await prisma.test.create({
          data: {
            ...postInput,
          },
        });
        res.status(201).json(post);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error creating post' });
      }
      break;

    case 'DELETE':
    try {
      const { id } = req.query;

      await prisma.test.delete({
        where: {
          id: Number(id),
        },
      });

      res.status(204).end(); // No content to send back
    } catch (e) {
      console.error('Error during DELETE operation:', e);
      res.status(500).json({ error: 'Error deleting test' });
    }
    break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

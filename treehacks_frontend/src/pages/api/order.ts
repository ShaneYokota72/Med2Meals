import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const { id } = query;


  const cookieHeader = req.headers.cookie;

  // Parse the Cookie header to get an object of cookies
  const cookies = parse(cookieHeader || '');

  // Access the userData cookie
  const userDataString = cookies.userData;
  const userData = userDataString ? JSON.parse(userDataString) : null;

  console.log("userData");
  console.log(userData);
  const roleId = userData.role;

  switch (method) {
    case 'GET':
      try {

        if (id) {
          // Fetch a specific order by id
          const order = await prisma.order.findUnique({
            where: { id: Number(id) },
          });
          if (order) {
            res.status(200).json(order);
          } else {
            res.status(404).json({ error: 'order not found' });
          }
        } else {
          // Fetch all orders
          // let orders = await prisma.order.findMany();
          const orders = await prisma.order.findMany({
            include: {
              user: {
                select: {
                  name: true
                }
              },
              server: {
                select: {
                  name: true
                }
              }
            }
          });

          console.log(orders);

      
          res.status(200).json(orders);

          
        }
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error retrieving order(s)' });
      }
      break;

    case 'PUT':
      try {
        const test = await prisma.order.update({
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
        const order = await prisma.order.create({
          data: {
            name: body.name,
            reciepe: body.reciepe,
            userId: Number(userData.id),
            compensation: body.compensation
          },
        });
        res.status(201).json(order);
      } catch (e) {
        console.error('Error during POST operation:', e);
        res.status(500).json({ error: 'Error creating order' });
      }
      break;

    case 'DELETE':
      try {
        await prisma.order.delete({
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

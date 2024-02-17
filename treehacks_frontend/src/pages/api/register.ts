// pages/api/register.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  if (method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password, age, diets, cusines, goals } = body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          age,
        },
      });

      const userCusinesPromises = cusines.map((cusineId) =>
        prisma.userCusine.create({
          data: {
            userId: user.id,
            cusineId,
          },
        })
      );

      const userDietsPromises = diets.map((dietId) =>
        prisma.userDiet.create({
          data: {
            userId: user.id,
            dietId,
          },
        })
      );

      const userGoalsPromises = goals.map((goalId) =>
        prisma.userGoal.create({
          data: {
            userId: user.id,
            goalId,
          },
        })
      );

      await Promise.all([...userCusinesPromises, ...userDietsPromises, ...userGoalsPromises]);

      return user;
    });

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Error during user registration' });
  }
}

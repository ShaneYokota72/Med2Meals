// pages/api/register.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  if (method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password, age, name, role } = body;
  console.log("SERVER LOGS")
  console.log(username, password, name, age);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { user: newUser, userRole } = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          name,
          age
        },
      });

      const userRole = await prisma.userRole.create({
        data: {
          userId: user.id, // Use the ID of the newly created user
          roleId: role, // Use the provided role ID
        },
      });
      return {user, userRole};
    });

    const { password: _, ...userWithoutPassword } = newUser;
    console.log("user details in cookie");
    console.log(newUser)
    const userDataForCookie = {
      id: newUser.id, username: newUser.name, walletId: newUser.walletId, role: userRole.roleId
    };
    const serialized = serialize('userData', JSON.stringify(userDataForCookie), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    res.setHeader('Set-Cookie', serialized);
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Error during user registration' });
  }
}

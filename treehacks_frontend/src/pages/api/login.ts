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
  const { username, password } = body;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        userRoles: {
          include: {
            role: true, // Include details of the role from the Role model
          },
        },
      },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const { password: _, ...userWithoutPassword } = user;


    // Assuming a user has only one role, extract the roleId directly
    const roleId = user.userRoles.length > 0 ? user.userRoles[0].roleId : null;

    // Prepare the response, now including only the roleId
    const response = {
      ...userWithoutPassword,
      roleId, // Include only the roleId
    };


  
    console.log("user details in cookie");
    console.log(response)
    const userDataForCookie = {
      id: response.id, username: response.name, walletId: response.walletId, role: response.roleId
    };
    const serialized = serialize('userData', JSON.stringify(userDataForCookie), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    res.setHeader('Set-Cookie', serialized);



    res.status(200).json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error during user login' });
  }
}

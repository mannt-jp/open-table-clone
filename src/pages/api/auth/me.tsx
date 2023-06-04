import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers.authorization as string;

  const token = bearerToken.split(" ")[1];

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);


  const payload = jwt.decode(token) as { email: string };

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true,
    },
  });

  return res.json({ user });
}

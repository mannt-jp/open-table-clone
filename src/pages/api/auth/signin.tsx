import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const errs: string[] = [];

    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid!",
      },

      {
        valid: validator.isLength(password, { min: 1 }),
        errorMessage: "Password is invalid!",
      },
    ];
    validationSchema.forEach((check) => {
      if (!check.valid) {
        errs.push(check.errorMessage);
      }
    });
    if (errs.length) {
      return res.status(400).json({ errorMessage: errs[0] });
    }

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userWithEmail) {
      return res
        .status(401)
        .json({ errorMessage: "Email or password is invalid!" });
    }

    const isMatch = await bcrypt.compare(password, userWithEmail.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ errorMessage: "Email or password is invalid!" });
    }

    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose.SignJWT({
      email: userWithEmail.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);
    setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

    return res.status(200).json({
      firstName: userWithEmail.first_name,
      lastName: userWithEmail.last_name,
      email: userWithEmail.email,
      phone: userWithEmail.phone,
      city: userWithEmail.city,
    });
  }
  return res.status(404).json("Unknown endpoint");
}

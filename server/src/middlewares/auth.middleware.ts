import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import 'dotenv/config';
import { PrismaClient, User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

dotenv.config();
const prisma = new PrismaClient();

interface IToken {
  id: number;
  fistname: string;
  lastname: string;
  occupation: string;
}

/**
 * hash password before added to DB
 */
export const hashPassword = async (password: string) => {
  const hashedPassword = await argon2.hash(password);
  return hashedPassword;
};

/**
 * Check if user exist folowing email
 * return user information
 */
export const verifyUser = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return user;
};

/**
 * Verify password according to user info from DB
 */
export const verifyPassword = async (passwordInput: string, user: User) => {
  if (!user.firstname) {
    return;
  }
  const verifiedPassword = await argon2.verify(user.password, passwordInput);
  if (verifiedPassword) {
    // password match generate token
    const token = await jwt.sign(
      {
        id: user.id,
        fistname: user.firstname,
        lastname: user.lastname,
        occupation: user.occupation,
      },
      String(process.env.SECRET_KEY),
      {
        expiresIn: process.env.JWT_EXPIRE,
      },
    );
    return token;
  } else {
    // password did not match
    return { error: 'Wrong credentials' };
  }
};

/**
 * Middleware to check if user is authenticated according his token
 */
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next('Please login to access the data');
    }
    const verify: any = await jwt.verify(token, String(process.env.SECRET_KEY));
    const user = await prisma.user.findUnique({
      where: {
        id: Number(verify.id),
      },
    });
    if (!user) {
      res.status(404).json({ message: 'not allowed' });
    }
    next();
  } catch (error) {
    return next(error);
  }
};

/**
 * reset password of a user
 */
export const resetPassword = async (passwordInput: string, user: User) => {
  const hashedPassword = await hashPassword(passwordInput);

  const updatedUser = await prisma.user.update({
    where: { id: Number(user.id) },
    data: {
      ...user,
      password: hashedPassword,
    },
  });
  return updatedUser;
};

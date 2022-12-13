import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

import { hashPassword } from '../middlewares/auth.middleware';
import { exclude } from '../utils/excludeFiled.utils';

const prisma = new PrismaClient();

// @desc Get all users
// @route GET /api/users
// @access Private
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    const usersWithouPassword = users.map((user) => {
      return exclude(user, ['password']);
    });
    res.status(200).json(usersWithouPassword);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one user
// @route GET /api/users/:id
// @access Private
const getOneUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (user) {
      const userWithoutPassword = exclude(user, ['password']);
      res.status(200).json(userWithoutPassword);
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one user
// @route POST /api/users
// @access Private
const createUser = async (req: Request, res: Response) => {
  const { firstname, lastname, address, postal_code, city, occupation, contrat_type, email, password, phone } = req.body;

  const hashedPassword = await hashPassword(password);

  try {
    const result = await prisma.user.create({
      data: {
        firstname,
        lastname,
        address,
        postal_code,
        city,
        occupation,
        contrat_type,
        is_archived: false,
        email,
        password: hashedPassword,
        phone,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err)
    res.status(500).json({ err });
  }
};

// @desc Update one user
// @route PUT /api/users/:id
// @access Private
const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { firstname, lastname, address, postal_code, city, occupation, contrat_type, phone } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) return res.status(404).json({ error: `User with ID ${id} was not found...` });

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        ...user,
        firstname,
        lastname,
        address,
        postal_code,
        city,
        occupation,
        contrat_type,
        is_archived: false,
        phone,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: `User with ID ${id} does not exist in the database` });
  }
};

// @desc Archive one user
// @route PUT /api/users/archive/:id
// @access Private
const archiveUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { is_archived } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) return res.status(404).json({ error: `User with ID ${id} was not found...` });

    const archivedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        ...user,
        is_archived: is_archived === 'true',
      },
    });
    res.status(200).json(archivedUser);
  } catch (error) {
    res.status(500).json({ error: `User with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one user
// @route DELETE /api/users/:id
// @access Private
const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: `User with ID ${id} does not exist in the database` });
  }
};

export { getUsers, getOneUser, createUser, updateUser, archiveUser, deleteUser };

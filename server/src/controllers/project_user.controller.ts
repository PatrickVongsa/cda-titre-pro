import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all projectUsers
// @route GET /api/project-users
// @access Private
const getProjectUsers = async (req: Request, res: Response) => {
  try {
    const projectUsers = await prisma.project_user.findMany();
    res.status(200).json(projectUsers);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get all users from one project
// @route GET /api/project-users/:id
// @access Private
const getOneProjectUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const projectUsers = await prisma.project_user.findMany({
      where: {
        project_id: Number(id),
      },
    });
    res.status(200).json(projectUsers);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one projectUser
// @route POST /api/project-users
// @access Private
const createProjectUser = async (req: Request, res: Response) => {
  const { user_id, project_id } = req.body;
  try {
    const result = await prisma.project_user.create({
      data: {
        user_id: Number(user_id),
        project_id: Number(project_id),
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Delete one user from one project
// @route DELETE /api/project-users/:id
// @access Private
const deleteProjectUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { user_id } = req.body;

  try {
    const projectUser = await prisma.project_user.delete({
      where: {
        user_id_project_id: { user_id: Number(user_id), project_id: Number(id) },
      },
    });
    res.status(200).json(projectUser);
  } catch (error) {
    res.status(500).json({ error: `ID ${id} does not exist in the database` });
  }
};

// @desc Delete all user from one project
// @route DELETE /api/project-users/
// @access Private
const deleteProjectUsers = async (req: Request, res: Response) => {
  const { project_id } = req.body;

  try {
    const projectUser = await prisma.project_user.deleteMany({
      where: {
        project_id: Number(project_id),
      },
    });
    res.status(200).json(projectUser);
  } catch (error) {
    res.status(500).json({ error: `ID ${project_id} does not exist in the database` });
  }
};

export { getProjectUsers, getOneProjectUser, createProjectUser, deleteProjectUser, deleteProjectUsers };

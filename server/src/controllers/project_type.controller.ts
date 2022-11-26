import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all project type
// @route GET /api/project-types
// @access Private
const getProjectTypes = async (req: Request, res: Response) => {
  try {
    const types = await prisma.project_type.findMany();
    res.status(200).json(types);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one project type
// @route GET /api/project-types/:id
// @access Private
const getOneProjectType = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const status = await prisma.project_type.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(status);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one project type
// @route POST /api/project-types
// @access Private
const createProjectType = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const result = await prisma.project_type.create({
      data: {
        name,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Update one project type
// @route PUT /api/project-types/:id
// @access Private
const updateProjectType = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    const type = await prisma.project_type.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!type) return res.status(404).json({ error: `Type with ID ${id} was not found...` });

    const updatedProjectType = await prisma.project_type.update({
      where: { id: Number(id) },
      data: {
        ...type,
        name,
      },
    });
    res.status(200).json(updatedProjectType);
  } catch (error) {
    res.status(500).json({ error: `Type with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one project type
// @route DELETE /api/project-types/:id
// @access Private
const deleteProjectType = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const type = await prisma.project_type.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({ error: `Type with ID ${id} does not exist in the database` });
  }
};

export { getProjectTypes, getOneProjectType, createProjectType, updateProjectType, deleteProjectType };

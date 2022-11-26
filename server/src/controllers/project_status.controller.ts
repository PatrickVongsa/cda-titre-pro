import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all project status
// @route GET /api/project-status
// @access Private
const getProjectStatuses = async (req: Request, res: Response) => {
  try {
    const statuses = await prisma.project_status.findMany();
    res.status(200).json(statuses);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one project status
// @route GET /api/project-status/:id
// @access Private
const getOneProjectStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const status = await prisma.project_status.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(status);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one project status
// @route POST /api/project-status
// @access Private
const createProjectStatus = async (req: Request, res: Response) => {
  const { name, color, order_number } = req.body;
  try {
    const result = await prisma.project_status.create({
      data: {
        name,
        color,
        order_number: Number(order_number),
        is_archived: false,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Update one project status
// @route PUT /api/project-status/:id
// @access Private
const updateProjectStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, color, order_number } = req.body;
  try {
    const status = await prisma.project_status.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!status) return res.status(404).json({ error: `Status with ID ${id} was not found...` });

    const updatedProjectStatus = await prisma.project_status.update({
      where: { id: Number(id) },
      data: {
        ...status,
        name,
        color,
        order_number: Number(order_number),
        is_archived: false,
      },
    });
    res.status(200).json(updatedProjectStatus);
  } catch (error) {
    res.status(500).json({ error: `Status with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one project status
// @route DELETE /api/project-status/:id
// @access Private
const deleteProjectStatus = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const status = await prisma.project_status.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: `Status with ID ${id} does not exist in the database` });
  }
};

export { getProjectStatuses, getOneProjectStatus, createProjectStatus, updateProjectStatus, deleteProjectStatus };

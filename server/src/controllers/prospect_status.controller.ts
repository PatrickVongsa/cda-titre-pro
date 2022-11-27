import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all prospect status
// @route GET /api/prospect-status
// @access Private
const getProspectStatuses = async (req: Request, res: Response) => {
  try {
    const statuses = await prisma.prospect_status.findMany();
    res.status(200).json(statuses);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one prospect status
// @route GET /api/prospect-status/:id
// @access Private
const getOneProspectStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const status = await prisma.prospect_status.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(status);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one prospect status
// @route POST /api/prospect-status
// @access Private
const createProspectStatus = async (req: Request, res: Response) => {
  const { name, color, order_number } = req.body;
  try {
    const result = await prisma.prospect_status.create({
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

// @desc Update one prospect status
// @route PUT /api/prospect-status/:id
// @access Private
const updateProspectStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, color, order_number } = req.body;
  try {
    const status = await prisma.prospect_status.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!status) return res.status(404).json({ error: `Status with ID ${id} was not found...` });

    const updatedProspectStatus = await prisma.prospect_status.update({
      where: { id: Number(id) },
      data: {
        ...status,
        name,
        color,
        order_number: Number(order_number),
        is_archived: false,
      },
    });
    res.status(200).json(updatedProspectStatus);
  } catch (error) {
    res.status(500).json({ error: `Status with ID ${id} does not exist in the database` });
  }
};

// @desc Archive one prospect status
// @route PUT /api/prospect-status/archive/:id
// @access Private
const archiveProspectStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { is_archived } = req.body;
  try {
    const status = await prisma.prospect_status.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!status) return res.status(404).json({ error: `Status with ID ${id} was not found...` });

    const updatedProspectStatus = await prisma.prospect_status.update({
      where: { id: Number(id) },
      data: {
        ...status,
        is_archived: is_archived === 'true',
      },
    });
    res.status(200).json(updatedProspectStatus);
  } catch (error) {
    res.status(500).json({ error: `Status with ID ${id} does not exist in the database ${error}` });
  }
};

// @desc Delete one prospect status
// @route DELETE /api/prospect-status/:id
// @access Private
const deleteProspectStatus = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const status = await prisma.prospect_status.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: `Status with ID ${id} does not exist in the database` });
  }
};

export {
  getProspectStatuses,
  getOneProspectStatus,
  createProspectStatus,
  updateProspectStatus,
  archiveProspectStatus,
  deleteProspectStatus,
};

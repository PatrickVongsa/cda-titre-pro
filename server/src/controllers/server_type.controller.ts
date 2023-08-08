import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all server types
// @route GET /api/server-types
// @access Private
const getServerTypes = async (req: Request, res: Response) => {
  try {
    const serverTypes = await prisma.server_type.findMany();
    res.status(200).json(serverTypes);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one  server type
// @route GET /api/server-types/:id
// @access Private
const getOneServerType = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const serverType = await prisma.server_type.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(serverType);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one  server type
// @route POST /api/server-types
// @access Private
const createServerType = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const result = await prisma.server_type.create({
      data: {
        name,
        is_archived: false,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Update one  server type
// @route PUT /api/server-types/:id
// @access Private
const updateServerType = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    const serverType = await prisma.server_type.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!serverType) return res.status(404).json({ error: `Server Type with ID ${id} was not found...` });

    const updatedServerType = await prisma.server_type.update({
      where: { id: Number(id) },
      data: {
        ...serverType,
        name,
        is_archived: false,
      },
    });
    res.status(200).json(updatedServerType);
  } catch (error) {
    res.status(500).json({ error: `Server Type with ID ${id} does not exist in the database` });
  }
};

// @desc Archive one  server type
// @route PUT /api/server-types/archive/:id
// @access Private
const archiveServerType = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { is_archived } = req.body;
  try {
    const serverType = await prisma.server_type.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!serverType) return res.status(404).json({ error: `Server Type with ID ${id} was not found...` });

    const updatedServerType = await prisma.server_type.update({
      where: { id: Number(id) },
      data: {
        ...serverType,
        is_archived: is_archived === "true",
      },
    });
    res.status(200).json(updatedServerType);
  } catch (error) {
    res.status(500).json({ error: `Server Type with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one  server type
// @route DELETE /api/server-types/:id
// @access Private
const deleteServerType = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const serverType = await prisma.server_type.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(serverType);
  } catch (error) {
    res.status(500).json({ error: `Server Type with ID ${id} does not exist in the database` });
  }
};

export { getServerTypes, getOneServerType, createServerType, updateServerType, archiveServerType, deleteServerType };

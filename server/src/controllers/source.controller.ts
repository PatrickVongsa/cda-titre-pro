import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all sources
// @route GET /api/sources
// @access Private
const getSources = async (req: Request, res: Response) => {
  try {
    const sources = await prisma.source.findMany();
    res.status(200).json(sources);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one source
// @route GET /api/source/:id
// @access Private
const getOneSource = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const source = await prisma.source.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(source);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one source
// @route POST /api/sources
// @access Private
const createSource = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const result = await prisma.source.create({
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

// @desc Update one source
// @route PUT /api/sources/:id
// @access Private
const updateSource = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    const source = await prisma.source.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!source) return res.status(404).json({ error: `Source with ID ${id} was not found...` });

    const updatedSource = await prisma.source.update({
      where: { id: Number(id) },
      data: {
        ...source,
        name,
        is_archived: false,
      },
    });
    res.status(200).json(updatedSource);
  } catch (error) {
    res.status(500).json({ error: `Source with ID ${id} does not exist in the database` });
  }
};

// @desc Archive one source
// @route PUT /api/sources/archive/:id
// @access Private
const archiveSource = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { is_archived } = req.body;
  try {
    const source = await prisma.source.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!source) return res.status(404).json({ error: `Source with ID ${id} was not found...` });

    const updatedSource = await prisma.source.update({
      where: { id: Number(id) },
      data: {
        ...source,
        is_archived: is_archived === "true",
      },
    });
    res.status(200).json(updatedSource);
  } catch (error) {
    res.status(500).json({ error: `Source with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one source
// @route DELETE /api/sources/:id
// @access Private
const deleteSource = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const source = await prisma.source.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(source);
  } catch (error) {
    res.status(500).json({ error: `Source with ID ${id} does not exist in the database` });
  }
};

export { getSources, getOneSource, createSource, updateSource, archiveSource, deleteSource };

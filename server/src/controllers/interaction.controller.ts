import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all interactions
// @route GET /api/interactions
// @access Private
const getInteractions = async (req: Request, res: Response) => {
  try {
    const interactions = await prisma.interaction.findMany({
      include: {
        reported_by: true,
        modified_by: true,
      },
    });
    res.status(200).json(interactions);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one interaction
// @route GET /api/interactions/:id
// @access Private
const getOneInteraction = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const interaction = await prisma.interaction.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        reported_by: true,
        modified_by: true,
      },
    });
    res.status(200).json(interaction);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one interaction
// @route POST /api/interactions
// @access Private
const createInteraction = async (req: Request, res: Response) => {
  const { report, reported_by_id, reported_at, piste_id } = req.body;

  let data = {
    report,
    reported_by_id: Number(reported_by_id),
    reported_at: new Date(reported_at),
    piste_id: Number(piste_id),
    is_archived: false,
  };

  try {
    const result = await prisma.interaction.create({
      data,
      include: {
        reported_by: true,
        modified_by: true,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Update one interaction
// @route PUT /api/interactions/:id
// @access Private
const updateInteraction = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { report, reported_by_id, reported_at, piste_id, modified_by_id, modified_at } = req.body;
  try {
    const interaction = await prisma.interaction.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!interaction) return res.status(404).json({ error: `Interaction with ID ${id} was not found...` });

    const updatedInteraction = await prisma.interaction.update({
      where: { id: Number(id) },
      data: {
        ...interaction,
        report,
        reported_by_id: Number(reported_by_id),
        reported_at: new Date(reported_at),
        piste_id: Number(piste_id),
        modified_by_id: Number(modified_by_id),
        modified_at: new Date(modified_at),
        is_archived: false,
      },
      include: {
        reported_by: true,
        modified_by: true,
      },
    });
    res.status(200).json(updatedInteraction);
  } catch (error) {
    res.status(500).json({ error: `Interaction with ID ${id} does not exist in the database` });
  }
};

// @desc Archive one interaction
// @route PUT /api/interactions/archive/:id
// @access Private
const archiveInteraction = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { is_archived } = req.body;
  try {
    const interaction = await prisma.interaction.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!interaction) return res.status(404).json({ error: `Interaction with ID ${id} was not found...` });

    const updatedInteraction = await prisma.interaction.update({
      where: { id: Number(id) },
      data: {
        ...interaction,
        is_archived: is_archived === 'true',
      },
      include: {
        reported_by: true,
        modified_by: true,
      },
    });
    res.status(200).json(updatedInteraction);
  } catch (error) {
    res.status(500).json({ error: `Interaction with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one interaction
// @route DELETE /api/interactions/:id
// @access Private
const deleteInteraction = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const interaction = await prisma.interaction.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(interaction);
  } catch (error) {
    res.status(500).json({ error: `Interaction with ID ${id} does not exist in the database` });
  }
};

export {
  getInteractions,
  getOneInteraction,
  createInteraction,
  updateInteraction,
  archiveInteraction,
  deleteInteraction,
};

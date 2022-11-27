import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all activities
// @route GET /api/activities
// @access Private
const getActivities = async (req: Request, res: Response) => {
  try {
    const activities = await prisma.activity.findMany();
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one activity
// @route GET /api/activities/:id
// @access Private
const getOneActivity = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const activity = await prisma.activity.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(activity);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one activity
// @route POST /api/activities
// @access Private
const createActivity = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const result = await prisma.activity.create({
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

// @desc Update one activity
// @route PUT /api/activities/:id
// @access Private
const updateActivity = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    const activity = await prisma.activity.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!activity) return res.status(404).json({ error: `Activity with ID ${id} was not found...` });

    const updatedActivity = await prisma.activity.update({
      where: { id: Number(id) },
      data: {
        ...activity,
        name,
        is_archived: false,
      },
    });
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(500).json({ error: `Activity with ID ${id} does not exist in the database` });
  }
};

// @desc Archive one activity
// @route PUT /api/activities/archive/:id
// @access Private
const archiveActivity = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { is_archived } = req.body;
  try {
    const activity = await prisma.activity.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!activity) return res.status(404).json({ error: `Activity with ID ${id} was not found...` });

    const updatedActivity = await prisma.activity.update({
      where: { id: Number(id) },
      data: {
        ...activity,
        is_archived: is_archived === "true",
      },
    });
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(500).json({ error: `Activity with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one activity
// @route DELETE /api/activities/:id
// @access Private
const deleteActivity = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const activity = await prisma.activity.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: `Activity with ID ${id} does not exist in the database` });
  }
};

export { getActivities, getOneActivity, createActivity, updateActivity, archiveActivity, deleteActivity };

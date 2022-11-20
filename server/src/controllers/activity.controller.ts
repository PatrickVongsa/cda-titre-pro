import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
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
  const activity = await prisma.activity.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(activity);
};

// @desc Create one activity
// @route POST /api/activities
// @access Private
const createActivity = async (req: Request, res: Response) => {
  const { name } = req.body;

  const result = await prisma.activity.create({
    data: {
      name,
      is_archived: false,
    },
  });
  res.status(200).json(result);
};

// @desc Update one activity
// @route PUT /api/activities/:id
// @access Private
const updateActivity = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, is_archived } = req.body;
  try {
    const activity = await prisma.activity.findUnique({
      where: {
        id: Number(id),
      },
    });
    const updatedActivity = await prisma.activity.update({
      where: { id: Number(id) },
      data: {
        ...activity,
        name,
        is_archived,
      },
    });
    res.status(200).json(updatedActivity);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Activity with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one activity
// @route DELETE /api/activities/:id
// @access Private
const deleteActivity = async (req: Request, res: Response) => {
  const id = req.params.id;
  const activity = await prisma.activity.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(activity);
};

export {
  getActivities,
  getOneActivity,
  createActivity,
  updateActivity,
  deleteActivity,
};

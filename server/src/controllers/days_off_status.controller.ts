import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all days-off-status
// @route GET /api/days-off-status
// @access Private
const getDaysOffStatuses = async (req: Request, res: Response) => {
  try {
    const DaysOffStatuses = await prisma.days_off_status.findMany();
    res.status(200).json(DaysOffStatuses);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one days-off-status
// @route GET /api/days-off-status/:id
// @access Private
const getOneDaysOffStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const daysOffStatus = await prisma.days_off_status.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(daysOffStatus);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one days-off-status
// @route POST /api/days-off-status
// @access Private
const createDaysOffStatus = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const result = await prisma.days_off_status.create({
      data: {
        name,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Update one days-off-status
// @route PUT /api/days-off-status/:id
// @access Private
const updateDaysOffStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    const daysOffStatus = await prisma.days_off_status.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!daysOffStatus) return res.status(404).json({ error: `Days-off status with ID ${id} was not found...` });

    const updatedDaysOffStatus = await prisma.days_off_status.update({
      where: { id: Number(id) },
      data: {
        ...daysOffStatus,
        name
      },
    });
    res.status(200).json(updatedDaysOffStatus);
  } catch (error) {
    res.status(500).json({ error: `Days-off status with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one days-off-status
// @route DELETE /api/days-off-status/:id
// @access Private
const deleteDaysOffStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const daysOffStatus = await prisma.days_off_status.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(daysOffStatus);
  } catch (error) {
    res.status(500).json({ error: `CaDays-offtalog with ID ${id} does not exist in the database` });
  }
};

export { getDaysOffStatuses, getOneDaysOffStatus, createDaysOffStatus, updateDaysOffStatus, deleteDaysOffStatus };

import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all days-off
// @route GET /api/days-off
// @access Private
const getDaysOffs = async (req: Request, res: Response) => {
  try {
    const DaysOffs = await prisma.days_off.findMany({
      include: {
        days_off_status: true,
      },
    });
    res.status(200).json(DaysOffs);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one days-off
// @route GET /api/days-off/:id
// @access Private
const getOneDaysOff = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const daysOff = await prisma.days_off.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        days_off_status: true,
      },
    });
    res.status(200).json(daysOff);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one days-off
// @route POST /api/days-off
// @access Private
const createDaysOff = async (req: Request, res: Response) => {
  const { start_date, end_date, days_off_status_id, user_id } = req.body;
  try {
    const result = await prisma.days_off.create({
      data: {
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        days_off_status_id: Number(days_off_status_id),
        user_id: Number(user_id),
      },
      include: {
        days_off_status: true,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Update one days-off
// @route PUT /api/days-off/:id
// @access Private
const updateDaysOff = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { start_date, end_date, days_off_status_id, user_id } = req.body;
  try {
    const daysOff = await prisma.days_off.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!daysOff) return res.status(404).json({ error: `Days-off with ID ${id} was not found...` });

    const updatedDaysOff = await prisma.days_off.update({
      where: { id: Number(id) },
      data: {
        ...daysOff,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        days_off_status_id: Number(days_off_status_id),
        user_id: Number(user_id),
      },
      include: {
        days_off_status: true,
      },
    });
    res.status(200).json(updatedDaysOff);
  } catch (error) {
    res.status(500).json({ error: `Days-off with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one days-off
// @route DELETE /api/days-off/:id
// @access Private
const deleteDaysOff = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const daysOff = await prisma.days_off.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(daysOff);
  } catch (error) {
    res.status(500).json({ error: `CaDays-offtalog with ID ${id} does not exist in the database` });
  }
};

export { getDaysOffs, getOneDaysOff, createDaysOff, updateDaysOff, deleteDaysOff };

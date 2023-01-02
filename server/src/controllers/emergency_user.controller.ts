import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all emergencyUsers
// @route GET /api/emergency-users
// @access Private
const getEmergencyUsers = async (req: Request, res: Response) => {
  try {
    const emergencyUsers = await prisma.emergency_user.findMany();
    res.status(200).json(emergencyUsers);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get all emergency contact from one user
// @route GET /api/emergency-users/:id
// @access Private
const getOneEmergencyUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const emergencyUsers = await prisma.emergency_user.findMany({
      where: {
        user_id: Number(id),
      },
    });
    res.status(200).json(emergencyUsers);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one projectUser
// @route POST /api/emergency-users
// @access Private
const createEmergencyUser = async (req: Request, res: Response) => {
  const { user_id, emergency_contact_id } = req.body;
  try {
    const result = await prisma.emergency_user.create({
      data: {
        user_id: Number(user_id),
        emergency_contact_id: Number(emergency_contact_id),
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Delete one emergency contact from one user
// @route DELETE /api/emergency-users/:id
// @access Private
const deleteEmergencyUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { emergency_contact_id } = req.body;
  
  try {
    const emergencyUser = await prisma.emergency_user.delete({
      where: {
        user_id_emergency_contact_id: { user_id: Number(id), emergency_contact_id: Number(emergency_contact_id) },
      },
    });
    res.status(200).json(emergencyUser);
  } catch (error) {
    res.status(500).json({ error: `ID ${error} does not exist in the database` });
  }
};

// @desc Delete all emergency contact from one user
// @route DELETE /api/emergency-users/
// @access Private
const deleteEmergencyUsers = async (req: Request, res: Response) => {
  const { user_id } = req.body;

  try {
    const projectUser = await prisma.project_user.deleteMany({
      where: {
        user_id: Number(user_id),
      },
    });
    res.status(200).json(projectUser);
  } catch (error) {
    res.status(500).json({ error: `ID ${user_id} does not exist in the databasdfde` });
  }
};

export { getEmergencyUsers, getOneEmergencyUser, createEmergencyUser, deleteEmergencyUser, deleteEmergencyUsers };

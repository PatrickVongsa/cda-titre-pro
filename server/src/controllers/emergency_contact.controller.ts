import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all emergency contacts
// @route GET /api/emergency-contacts
// @access Private
const getEmergencyContacts = async (req: Request, res: Response) => {
  try {
    const emergencyContacts = await prisma.emergency_contact.findMany();
    res.status(200).json(emergencyContacts);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one emergency-contact
// @route GET /api/emergency-contacts/:id
// @access Private
const getOneEmergencyContact = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const emergencyContact = await prisma.emergency_contact.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(emergencyContact);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one emergency-contact
// @route POST /api/emergency-contacts
// @access Private
const createEmergencyContact = async (req: Request, res: Response) => {
  const { firstname, lastname, who_is, phone } = req.body;
  try {
    const result = await prisma.emergency_contact.create({
      data: {
        firstname,
        lastname,
        who_is,
        phone,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Update one emergency-contact
// @route PUT /api/emergency-contacts/:id
// @access Private
const updateEmergencyContact = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { firstname, lastname, who_is, phone } = req.body;
  try {
    const emergencyContact = await prisma.emergency_contact.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!emergencyContact) return res.status(404).json({ error: `Emergency Contact with ID ${id} was not found...` });

    const updatedEmergencyContact = await prisma.emergency_contact.update({
      where: { id: Number(id) },
      data: {
        ...emergencyContact,
        firstname,
        lastname,
        who_is,
        phone,
      },
    });
    res.status(200).json(updatedEmergencyContact);
  } catch (error) {
    res.status(500).json({ error: `Emergency Contact with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one emergency-contact
// @route DELETE /api/emergency-contacts/:id
// @access Private
const deleteEmergencyContact = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const emergencyContact = await prisma.emergency_contact.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(emergencyContact);
  } catch (error) {
    res.status(500).json({ error: `Emergency Contact with ID ${id} does not exist in the database` });
  }
};

export {
  getEmergencyContacts,
  getOneEmergencyContact,
  createEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
};

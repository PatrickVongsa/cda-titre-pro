import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all contacts
// @route GET /api/contacts
// @access Private
const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await prisma.contact.findMany();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one contact
// @route GET /api/contacts/:id
// @access Private
const getOneContact = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const contact = await prisma.contact.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one contact
// @route POST /api/contacts
// @access Private
const createContact = async (req: Request, res: Response) => {
  const { firstname, lastname, occupation, phone, email, is_prefered_contact, piste_id } = req.body;
  try {
    const result = await prisma.contact.create({
      data: {
        firstname,
        lastname,
        occupation,
        phone,
        email,
        is_prefered_contact,
        piste_id: Number(piste_id),
        is_archived: false,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Update one contact
// @route PUT /api/contacts/:id
// @access Private
const updateContact = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { firstname, lastname, occupation, phone, email, is_prefered_contact, piste_id } = req.body;
  try {
    const contact = await prisma.contact.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!contact) return res.status(404).json({ error: `Contact with ID ${id} was not found...` });

    const updatedActivity = await prisma.contact.update({
      where: { id: Number(id) },
      data: {
        ...contact,
        firstname,
        lastname,
        occupation,
        phone,
        email,
        is_prefered_contact: is_prefered_contact === 'true',
        piste_id: Number(piste_id),
        is_archived: false,
      },
    });
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(500).json({ error: `Contact with ID ${id} does not exist in the database` });
  }
};

// @desc Archive one contact
// @route PUT /api/contacts/archive/:id
// @access Private
const archiveContact = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { is_archived } = req.body;
  try {
    const contact = await prisma.contact.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!contact) return res.status(404).json({ error: `Contact with ID ${id} was not found...` });

    const updatedActivity = await prisma.contact.update({
      where: { id: Number(id) },
      data: {
        ...contact,
        is_archived,
      },
    });
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(500).json({ error: `Contact with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one contact
// @route DELETE /api/contacts/:id
// @access Private
const deleteContact = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const contact = await prisma.contact.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: `Contact with ID ${id} does not exist in the database` });
  }
};

export { getContacts, getOneContact, createContact, updateContact, archiveContact, deleteContact };

import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all subdomains
// @route GET /api/subdomains
// @access Private
const getSubdomains = async (req: Request, res: Response) => {
  try {
    const subdomain = await prisma.subdomain.findMany();
    res.status(200).json(subdomain);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one subdomain
// @route GET /api/subdomains/:id
// @access Private
const getOneSubdomain = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const subdomain = await prisma.subdomain.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(subdomain);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one subdomain
// @route POST /api/subdomains
// @access Private
const createSubdomain = async (req: Request, res: Response) => {
  const { name, domain_id, server_id } = req.body;
  console.log(req.body)
  try {
    const result = await prisma.subdomain.create({
      data: {
        name,
        domain_id: Number(domain_id),
        server_id: server_id ? Number(server_id) : null,
        is_archived: false,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Update one subdomain
// @route PUT /api/subdomains/:id
// @access Private
const updateSubdomain = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, domain_id, server_id } = req.body;
  try {
    const subdomain = await prisma.subdomain.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!subdomain) return res.status(404).json({ error: `Subdomain with ID ${id} was not found...` });

    const updatedSubdomain = await prisma.subdomain.update({
      where: { id: Number(id) },
      data: {
        ...subdomain,
        name,
        domain_id: Number(domain_id),
        server_id: server_id ? Number(server_id) : null,
        is_archived: false,
      },
    });
    res.status(200).json(updatedSubdomain);
  } catch (error) {
    res.status(500).json({ error: `Subdomain Type with ID ${id} does not exist in the database` });
  }
};

// @desc Archive one  subdomain
// @route PUT /api/subdomains/archive/:id
// @access Private
const archiveSubdomain = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { is_archived } = req.body;
  try {
    const subdomain = await prisma.subdomain.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!subdomain) return res.status(404).json({ error: `Subdomain Type with ID ${id} was not found...` });

    const updatedSubdomain = await prisma.subdomain.update({
      where: { id: Number(id) },
      data: {
        ...subdomain,
        is_archived: is_archived === 'true',
      },
    });
    res.status(200).json(updatedSubdomain);
  } catch (error) {
    res.status(500).json({ error: `Subdomain Type with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one  subdomain
// @route DELETE /api/subdomains/:id
// @access Private
const deleteSubdomain = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const subdomain = await prisma.subdomain.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(subdomain);
  } catch (error) {
    res.status(500).json({ error: `Subdomain Type with ID ${id} does not exist in the database` });
  }
};

export { getSubdomains, getOneSubdomain, createSubdomain, updateSubdomain, archiveSubdomain, deleteSubdomain };

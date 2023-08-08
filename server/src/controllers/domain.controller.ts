import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all domains
// @route GET /api/domains
// @access Private
const getDomains = async (req: Request, res: Response) => {
  try {
    const domains = await prisma.domain.findMany();
    res.status(200).json(domains);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one domain
// @route GET /api/domains/:id
// @access Private
const getOneDomain = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const domain = await prisma.domain.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(domain);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one domain
// @route POST /api/domains
// @access Private
const createDomain = async (req: Request, res: Response) => {
  const { domain_name, created_at, renew_at, is_owner, account_name, project_id, host_id, server_id } = req.body;
  console.log({server_id})
  try {
    const result = await prisma.domain.create({
      data: {
        domain_name,
        created_at: new Date(created_at),
        renew_at: new Date(renew_at),
        is_owner: is_owner == true,
        account_name,
        project_id: Number(project_id),
        host_id: Number(host_id),
        server_id: server_id ? Number(server_id) : null,
        is_archived: false,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err)
    res.status(500).json({ err });
  }
};

// @desc Update one domain
// @route PUT /api/domains/:id
// @access Private
const updateDomain = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { domain_name, created_at, renew_at, is_owner, account_name, project_id, host_id, server_id } = req.body;
  try {
    const domain = await prisma.domain.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!domain) return res.status(404).json({ error: `Domain with ID ${id} was not found...` });

    const updatedDomain = await prisma.domain.update({
      where: { id: Number(id) },
      data: {
        ...domain,
        domain_name,
        created_at: new Date(created_at),
        renew_at: new Date(renew_at),
        is_owner: is_owner == true,
        account_name,
        project_id: Number(project_id),
        host_id: Number(host_id),
        server_id: server_id ? Number(server_id) : null,
        is_archived: false,
      },
    });
    res.status(200).json(updatedDomain);
  } catch (error) {
    res.status(500).json({ error: `Domain with ID ${id} does not exist in the database` });
  }
};

// @desc Archive one domain
// @route PUT /api/domains/archive/:id
// @access Private
const archiveDomain = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { is_archived } = req.body;
  try {
    const domain = await prisma.domain.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!domain) return res.status(404).json({ error: `Domain with ID ${id} was not found...` });

    const updatedDomain = await prisma.domain.update({
      where: { id: Number(id) },
      data: {
        ...domain,
        is_archived: is_archived === 'true',
      },
    });
    res.status(200).json(updatedDomain);
  } catch (error) {
    res.status(500).json({ error: `Domain with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one domain
// @route DELETE /api/domains/:id
// @access Private
const deleteDomain = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const domain = await prisma.domain.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(domain);
  } catch (error) {
    res.status(500).json({ error: `Domain with ID ${id} does not exist in the database` });
  }
};

export { getDomains, getOneDomain, createDomain, updateDomain, archiveDomain, deleteDomain };

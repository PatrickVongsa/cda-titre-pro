import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all hosts
// @route GET /api/hosts
// @access Private
const getHosts = async (req: Request, res: Response) => {
  try {
    const hosts = await prisma.host.findMany();
    res.status(200).json(hosts);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one host
// @route GET /api/hosts/:id
// @access Private
const getOneHost = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const host = await prisma.host.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(host);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one host
// @route POST /api/hosts
// @access Private
const createHost = async (req: Request, res: Response) => {
  const { name, link } = req.body;
  try {
    const result = await prisma.host.create({
      data: {
        name,
        link,
        is_archived: false,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Update one host
// @route PUT /api/hosts/:id
// @access Private
const updateHost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, link } = req.body;
  try {
    const host = await prisma.host.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!host) return res.status(404).json({ error: `Host with ID ${id} was not found...` });

    const updatedHost = await prisma.host.update({
      where: { id: Number(id) },
      data: {
        ...host,
        name,
        link,
        is_archived: false,
      },
    });
    res.status(200).json(updatedHost);
  } catch (error) {
    res.status(500).json({ error: `host with ID ${id} does not exist in the database` });
  }
};

// @desc Archive one host
// @route PUT /api/hosts/archive/:id
// @access Private
const archiveHost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { is_archived } = req.body;
  try {
    const host = await prisma.host.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!host) return res.status(404).json({ error: `Host with ID ${id} was not found...` });

    const updatedHost = await prisma.host.update({
      where: { id: Number(id) },
      data: {
        ...host,
        is_archived: is_archived === 'true',
      },
    });
    res.status(200).json(updatedHost);
  } catch (error) {
    res.status(500).json({ error: `Host with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one host
// @route DELETE /api/hosts/:id
// @access Private
const deleteHost = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const host = await prisma.host.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(host);
  } catch (error) {
    res.status(500).json({ error: `Host with ID ${id} does not exist in the database` });
  }
};

export { getHosts, getOneHost, createHost, updateHost, archiveHost, deleteHost };

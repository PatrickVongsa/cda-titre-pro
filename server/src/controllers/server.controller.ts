import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all servers
// @route GET /api/servers
// @access Private
const getServers = async (req: Request, res: Response) => {
  try {
    const servers = await prisma.server.findMany();
    res.status(200).json(servers);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one server
// @route GET /api/servers/:id
// @access Private
const getOneServer = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const server = await prisma.server.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(server);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one server
// @route POST /api/servers
// @access Private
const createServer = async (req: Request, res: Response) => {
  const {
    name,
    created_at,
    renew_at,
    is_owner,
    account_name,
    project_id,
    host_id,
    is_dev,
    is_prod,
    ipv4,
    ipv6,
    stfp,
    ssh,
    bdd_host_name,
    server_type_id,
  } = req.body;
  try {
    const result = await prisma.server.create({
      data: {
        name,
        created_at: new Date(created_at),
        renew_at: new Date(renew_at),
        is_owner: is_owner == true,
        account_name,
        project_id: Number(project_id),
        host_id: Number(host_id),
        is_archived: false,
        is_dev: is_dev == true,
        is_prod: is_prod == true,
        ipv4,
        ipv6,
        stfp,
        ssh,
        bdd_host_name,
        server_type_id: Number(server_type_id),
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Update one server
// @route PUT /api/servers/:id
// @access Private
const updateServer = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { 
    name,
    created_at,
    renew_at,
    is_owner,
    account_name,
    project_id,
    host_id,
    is_dev,
    is_prod,
    ipv4,
    ipv6,
    stfp,
    ssh,
    bdd_host_name,
    server_type_id, } = req.body;
  try {
    const server = await prisma.server.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!server) return res.status(404).json({ error: `Server with ID ${id} was not found...` });

    const updatedServer = await prisma.server.update({
      where: { id: Number(id) },
      data: {
        ...server,
        name,
        created_at: new Date(created_at),
        renew_at: new Date(renew_at),
        is_owner: is_owner == true,
        account_name,
        project_id: Number(project_id),
        host_id: Number(host_id),
        is_archived: false,
        is_dev: is_dev == true,
        is_prod: is_prod == true,
        ipv4,
        ipv6,
        stfp,
        ssh,
        bdd_host_name,
        server_type_id: Number(server_type_id),
      },
    });
    res.status(200).json(updatedServer);
  } catch (error) {
    res.status(500).json({ error: `Server with ID ${id} does not exist in the database` });
  }
};

// @desc Archive one server
// @route PUT /api/servers/archive/:id
// @access Private
const archiveServer = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { is_archived } = req.body;
  try {
    const server = await prisma.server.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!server) return res.status(404).json({ error: `Server with ID ${id} was not found...` });

    const updatedServer = await prisma.server.update({
      where: { id: Number(id) },
      data: {
        ...server,
        is_archived: is_archived === 'true',
      },
    });
    res.status(200).json(updatedServer);
  } catch (error) {
    res.status(500).json({ error: `Server with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one server
// @route DELETE /api/servers/:id
// @access Private
const deleteServer = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const server = await prisma.server.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(server);
  } catch (error) {
    res.status(500).json({ error: `Server with ID ${id} does not exist in the database` });
  }
};

export { getServers, getOneServer, createServer, updateServer, archiveServer, deleteServer };

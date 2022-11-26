import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all catalogs
// @route GET /api/catalogs
// @access Private
const getCatalogs = async (req: Request, res: Response) => {
  try {
    const catalogs = await prisma.catalog.findMany();
    res.status(200).json(catalogs);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one catalog
// @route GET /api/catalogs/:id
// @access Private
const getOneCatalog = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const catalog = await prisma.catalog.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(catalog);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one catalog
// @route POST /api/catalogs
// @access Private
const createCatalog = async (req: Request, res: Response) => {
  const { name, description, price_ht } = req.body;
  try {
    const result = await prisma.catalog.create({
      data: {
        name,
        description,
        price_ht: Number(price_ht),
        is_archived: false,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Update one catalog
// @route PUT /api/catalogs/:id
// @access Private
const updateCatalog = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, description, price_ht } = req.body;
  try {
    const catalog = await prisma.catalog.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!catalog) return res.status(404).json({ error: `Catalog with ID ${id} was not found...` });

    const updatedCatalog = await prisma.catalog.update({
      where: { id: Number(id) },
      data: {
        ...catalog,
        name,
        description,
        price_ht: Number(price_ht),
        is_archived: false,
      },
    });
    res.status(200).json(updatedCatalog);
  } catch (error) {
    res.status(500).json({ error: `Catalog with ID ${id} does not exist in the database` });
  }
};

// @desc Archive one catalog
// @route PUT /api/catalogs/archive/:id
// @access Private
const archiveCatalog = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { is_archived } = req.body;
  try {
    const catalog = await prisma.catalog.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!catalog) return res.status(404).json({ error: `Catalog with ID ${id} was not found...` });

    const updatedCatalog = await prisma.catalog.update({
      where: { id: Number(id) },
      data: {
        ...catalog,
        is_archived: is_archived === 'true',
      },
    });
    res.status(200).json(updatedCatalog);
  } catch (error) {
    res.status(500).json({ error: `Catalog with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one catalog
// @route DELETE /api/catalogs/:id
// @access Private
const deleteCatalog = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const catalog = await prisma.catalog.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(catalog);
  } catch (error) {
    res.status(500).json({ error: `Catalog with ID ${id} does not exist in the database` });
  }
};

export { getCatalogs, getOneCatalog, createCatalog, updateCatalog, archiveCatalog, deleteCatalog };

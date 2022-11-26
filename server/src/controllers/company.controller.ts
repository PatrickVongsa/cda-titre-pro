import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all companies
// @route GET /api/company
// @access Private
const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await prisma.company.findMany();
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one company
// @route GET /api/company/:id
// @access Private
const getOneCompany = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const company = await prisma.company.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one company
// @route POST /api/company
// @access Private
const createCompany = async (req: Request, res: Response) => {
  const { address, postal_code, city, country, phone, email, siret, tva_number } = req.body;
  try {
    const result = await prisma.company.create({
      data: {
        address,
        postal_code,
        city,
        country,
        phone,
        email,
        siret,
        tva_number,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Update one company
// @route PUT /api/company/:id
// @access Private
const updateCompany = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { address, postal_code, city, country, phone, email, siret, tva_number } = req.body;
  try {
    const company = await prisma.company.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!company) return res.status(404).json({ error: `Company with ID ${id} was not found...` });

    const updatedCompany = await prisma.company.update({
      where: { id: Number(id) },
      data: {
        ...company,
        address,
        postal_code,
        city,
        country,
        phone,
        email,
        siret,
        tva_number,
      },
    });
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ error: `Company with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one company
// @route DELETE /api/company/:id
// @access Private
const deleteCompany = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const company = await prisma.company.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: `Company with ID ${id} does not exist in the database` });
  }
};

export { getCompanies, getOneCompany, createCompany, updateCompany, deleteCompany };

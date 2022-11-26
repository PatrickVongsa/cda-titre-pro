import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all prospects
// @route GET /api/prospects
// @access Private
const getProspects = async (req: Request, res: Response) => {
  try {
    const prospects = await prisma.prospect.findMany();
    res.status(200).json(prospects);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one prospect
// @route GET /api/prospects/:id
// @access Private
const getOneProspect = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const prospect = await prisma.prospect.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(prospect);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one prospect
// @route POST /api/prospects
// @access Private
const createProspect = async (req: Request, res: Response) => {
  const {
    company_name,
    address,
    postal_code,
    city,
    country,
    phone,
    email,
    company_logo,
    website_url,
    facebook_url,
    instagram_url,
    linkedin_url,
    contacted_at,
    estimate_budget,
    need_description,
    has_website,
    website_year,
    other_need,
    is_client,
    siret_number,
    assigned_to_id,
    piste_status_id,
    source_id,
    activity_id,
  } = req.body;

  try {
    const result = await prisma.prospect.create({
      data: {
        company_name,
        address,
        postal_code,
        city,
        country,
        phone,
        email,
        company_logo,
        website_url,
        facebook_url,
        instagram_url,
        linkedin_url,
        contacted_at: new Date(contacted_at),
        estimate_budget: Number(estimate_budget),
        need_description,
        has_website: has_website === 'true',
        website_year: Number(website_year),
        other_need,
        is_client: is_client === 'true',
        siret_number,
        assigned_to_id: Number(assigned_to_id),
        piste_status_id: Number(piste_status_id),
        source_id: Number(source_id),
        activity_id: Number(activity_id),
        is_archived: false,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Update one prospect
// @route PUT /api/prospects/:id
// @access Private
const updateProspect = async (req: Request, res: Response) => {
  const id = req.params.id;
  const {
    company_name,
    address,
    postal_code,
    city,
    country,
    phone,
    email,
    company_logo,
    website_url,
    facebook_url,
    instagram_url,
    linkedin_url,
    contacted_at,
    estimate_budget,
    need_description,
    has_website,
    website_year,
    other_need,
    is_client,
    siret_number,
    assigned_to_id,
    piste_status_id,
    source_id,
    activity_id,
  } = req.body;
  try {
    const prospect = await prisma.prospect.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!prospect) return res.status(404).json({ error: `Prospect with ID ${id} was not found...` });

    const updatedProspect = await prisma.prospect.update({
      where: { id: Number(id) },
      data: {
        ...prospect,
        company_name,
        address,
        postal_code,
        city,
        country,
        phone,
        email,
        company_logo,
        website_url,
        facebook_url,
        instagram_url,
        linkedin_url,
        contacted_at,
        estimate_budget,
        need_description,
        has_website: has_website === 'true',
        website_year,
        other_need,
        is_client: is_client === 'true',
        siret_number,
        assigned_to_id: Number(assigned_to_id),
        piste_status_id: Number(piste_status_id),
        source_id: Number(source_id),
        activity_id: Number(activity_id),
        is_archived: false,
      },
    });
    res.status(200).json(updatedProspect);
  } catch (error) {
    res.status(500).json({ error: `Prospect with ID ${id} does not exist in the database` });
  }
};

// @desc Archive one prospect
// @route PUT /api/prospects/archive/:id
// @access Private
const archiveProspect = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { is_archived } = req.body;
  try {
    const prospect = await prisma.prospect.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!prospect) return res.status(404).json({ error: `Prospect with ID ${id} was not found...` });

    const updatedProspect = await prisma.prospect.update({
      where: { id: Number(id) },
      data: {
        ...prospect,
        is_archived,
      },
    });
    res.status(200).json(updatedProspect);
  } catch (error) {
    res.status(500).json({ error: `Prospect with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one Prospect
// @route DELETE /api/Prospects/:id
// @access Private
const deleteProspect = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const prospect = await prisma.prospect.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(prospect);
  } catch (error) {
    res.status(500).json({ error: `Prospect with ID ${id} does not exist in the database` });
  }
};

export { getProspects, getOneProspect, createProspect, updateProspect, archiveProspect, deleteProspect };

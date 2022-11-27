import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Get all project
// @route GET /api/projects
// @access Private
const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Get one project
// @route GET /api/projects/:id
// @access Private
const getOneProject = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Create one project
// @route POST /api/projects
// @access Private
const createProject = async (req: Request, res: Response) => {
  const {
    name,
    description,
    start_date,
    due_date,
    project_type_id,
    project_amount,
    did_deposit,
    has_financement,
    has_fully_paid,
    project_status_id,
    link,
    github_link,
    host,
    ora_name,
  } = req.body;
  try {
    const result = await prisma.project.create({
      data: {
        name,
        description,
        start_date: new Date(start_date),
        due_date: new Date(due_date),
        project_type_id: Number(project_type_id),
        project_amount: Number(project_amount),
        did_deposit: did_deposit === 'true',
        has_financement: has_financement === 'true',
        has_fully_paid: has_fully_paid === 'true',
        project_status_id: Number(project_status_id),
        link,
        github_link,
        host,
        ora_name,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// @desc Update one project
// @route PUT /api/projects/:id
// @access Private
const updateProject = async (req: Request, res: Response) => {
  const id = req.params.id;
  const {
    name,
    description,
    start_date,
    due_date,
    project_type_id,
    project_amount,
    did_deposit,
    has_financement,
    has_fully_paid,
    project_status_id,
    link,
    github_link,
    host,
    ora_name,
  } = req.body;
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!project) return res.status(404).json({ error: `Project with ID ${id} was not found...` });

    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        ...project,
        name,
        description,
        start_date: new Date(start_date),
        due_date: new Date(due_date),
        project_type_id: Number(project_type_id),
        project_amount: Number(project_amount),
        did_deposit: did_deposit === 'true',
        has_financement: has_financement === 'true',
        has_fully_paid: has_fully_paid === 'true',
        project_status_id: Number(project_status_id),
        link,
        github_link,
        host,
        ora_name,
      },
    });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: `Project with ID ${id} does not exist in the database` });
  }
};

// @desc Delete one project
// @route DELETE /api/projects/:id
// @access Private
const deleteProject = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const project = await prisma.project.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: `Project with ID ${id} does not exist in the database` });
  }
};

export { getProjects, getOneProject, createProject, updateProject, deleteProject };

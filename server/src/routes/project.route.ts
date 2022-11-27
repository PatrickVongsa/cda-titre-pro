import { Router } from 'express';
import {
  getProjects,
  getOneProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';

const router = Router();

router.route('/').get(getProjects).post(createProject);
router.route('/:id').get(getOneProject).put(updateProject).delete(deleteProject);

export default router;

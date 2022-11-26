import { Router } from 'express';
import {
  getProjectTypes,
  getOneProjectType,
  createProjectType,
  updateProjectType,
  deleteProjectType,
} from '../controllers/project_type.controller';

const router = Router();

router.route('/').get(getProjectTypes).post(createProjectType);
router.route('/:id').get(getOneProjectType).put(updateProjectType).delete(deleteProjectType);

export default router;

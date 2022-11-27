import { Router } from 'express';
import {
  getProjectStatuses,
  getOneProjectStatus,
  createProjectStatus,
  updateProjectStatus,
  deleteProjectStatus,
} from '../controllers/project_status.controller';

const router = Router();

router.route('/').get(getProjectStatuses).post(createProjectStatus);
router.route('/:id').get(getOneProjectStatus).put(updateProjectStatus).delete(deleteProjectStatus);

export default router;

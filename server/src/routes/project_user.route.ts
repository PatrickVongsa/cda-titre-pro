import { Router } from 'express';
import {
  getProjectUsers,
  getOneProjectUser,
  createProjectUser,
  deleteProjectUser,
  deleteProjectUsers,
} from '../controllers/project_user.controller';

const router = Router();

router.route('/').get(getProjectUsers).post(createProjectUser).delete(deleteProjectUsers);
router.route('/:id').get(getOneProjectUser).delete(deleteProjectUser);

export default router;

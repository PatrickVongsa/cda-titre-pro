import { Router } from 'express';
import {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  archiveUser,
  deleteUser,
} from '../controllers/user.controller';

const router = Router();

router.route('/').get(getUsers).post(createUser);
router
  .route('/:id')
  .get(getOneUser)
  .put(updateUser)
  .delete(deleteUser);
router.route('/archive/:id').put(archiveUser)

export default router;
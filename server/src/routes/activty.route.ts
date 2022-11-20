import { Router } from 'express';
import {
  getActivities,
  getOneActivity,
  createActivity,
  updateActivity,
  deleteActivity,
} from '../controllers/activity.controller';

const router = Router();

router.route('/').get(getActivities).post(createActivity);
router
  .route('/:id')
  .get(getOneActivity)
  .put(updateActivity)
  .delete(deleteActivity);

export default router;
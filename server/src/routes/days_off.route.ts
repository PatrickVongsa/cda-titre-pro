import { Router } from 'express';
import {
  getDaysOffs,
  getOneDaysOff,
  createDaysOff,
  updateDaysOff,
  deleteDaysOff,
} from '../controllers/days_off.controller';

const router = Router();

router.route('/').get(getDaysOffs).post(createDaysOff);
router.route('/:id').get(getOneDaysOff).put(updateDaysOff).delete(deleteDaysOff);

export default router;

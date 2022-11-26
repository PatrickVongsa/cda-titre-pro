import { Router } from 'express';
import {
  getDaysOffStatuses,
  getOneDaysOffStatus,
  createDaysOffStatus,
  updateDaysOffStatus,
  deleteDaysOffStatus,
} from '../controllers/days_off_status.controller';

const router = Router();

router.route('/').get(getDaysOffStatuses).post(createDaysOffStatus);
router.route('/:id').get(getOneDaysOffStatus).put(updateDaysOffStatus).delete(deleteDaysOffStatus);

export default router;

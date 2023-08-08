import { Router } from 'express';
import {
  getEmergencyUsers,
  getOneEmergencyUser,
  createEmergencyUser,
  deleteEmergencyUser,
  deleteEmergencyUsers,
} from '../controllers/emergency_user.controller';

const router = Router();

router.route('/').get(getEmergencyUsers).post(createEmergencyUser).delete(deleteEmergencyUsers);
router.route('/:id').get(getOneEmergencyUser).delete(deleteEmergencyUser);

export default router;

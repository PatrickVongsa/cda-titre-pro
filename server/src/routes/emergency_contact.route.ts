import { Router } from 'express';
import {
  getEmergencyContacts,
  getOneEmergencyContact,
  createEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
} from '../controllers/emergency_contact.controller';

const router = Router();

router.route('/').get(getEmergencyContacts).post(createEmergencyContact);
router.route('/:id').get(getOneEmergencyContact).put(updateEmergencyContact).delete(deleteEmergencyContact);

export default router;

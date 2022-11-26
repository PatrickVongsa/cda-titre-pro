import { Router } from 'express';
import {
  getContacts,
  getOneContact,
  createContact,
  updateContact,
  archiveContact,
  deleteContact,
} from '../controllers/contact.controller';

const router = Router();

router.route('/').get(getContacts).post(createContact);
router
  .route('/:id')
  .get(getOneContact)
  .put(updateContact)
  .delete(deleteContact);
router.route('/archive/:id').put(archiveContact)

export default router;
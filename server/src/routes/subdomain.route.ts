import { Router } from 'express';
import {
  getSubdomains,
  getOneSubdomain,
  createSubdomain,
  updateSubdomain,
  archiveSubdomain,
  deleteSubdomain,
} from '../controllers/subdomain.controller';

const router = Router();

router.route('/').get(getSubdomains).post(createSubdomain);
router
  .route('/:id')
  .get(getOneSubdomain)
  .put(updateSubdomain)
  .delete(deleteSubdomain);
router.route('/archive/:id').put(archiveSubdomain)

export default router;
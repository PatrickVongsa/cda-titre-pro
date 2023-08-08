import { Router } from 'express';
import {
  getDomains,
  getOneDomain,
  createDomain,
  updateDomain,
  archiveDomain,
  deleteDomain,
} from '../controllers/domain.controller';

const router = Router();

router.route('/').get(getDomains).post(createDomain);
router
  .route('/:id')
  .get(getOneDomain)
  .put(updateDomain)
  .delete(deleteDomain);
router.route('/archive/:id').put(archiveDomain)

export default router;
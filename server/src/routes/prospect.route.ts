import { Router } from 'express';
import {
  getProspects,
  getOneProspect,
  createProspect,
  updateProspect,
  archiveProspect,
  deleteProspect,
} from '../controllers/prospect.controller';

const router = Router();

router.route('/').get(getProspects).post(createProspect);
router
  .route('/:id')
  .get(getOneProspect)
  .put(updateProspect)
  .delete(deleteProspect);
router.route('/archive/:id').put(archiveProspect)

export default router;
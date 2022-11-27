import { Router } from 'express';
import {
  getSources,
  getOneSource,
  createSource,
  updateSource,
  archiveSource,
  deleteSource,
} from '../controllers/source.controller';

const router = Router();

router.route('/').get(getSources).post(createSource);
router
  .route('/:id')
  .get(getOneSource)
  .put(updateSource)
  .delete(deleteSource);
router.route('/archive/:id').put(archiveSource)

export default router;
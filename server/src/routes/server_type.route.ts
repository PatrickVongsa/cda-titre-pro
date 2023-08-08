import { Router } from 'express';
import {
  getServerTypes,
  getOneServerType,
  createServerType,
  updateServerType,
  archiveServerType,
  deleteServerType,
} from '../controllers/server_type.controller';

const router = Router();

router.route('/').get(getServerTypes).post(createServerType);
router
  .route('/:id')
  .get(getOneServerType)
  .put(updateServerType)
  .delete(deleteServerType);
router.route('/archive/:id').put(archiveServerType)

export default router;
import { Router } from 'express';
import {
  getServers,
  getOneServer,
  createServer,
  updateServer,
  archiveServer,
  deleteServer,
} from '../controllers/server.controller';

const router = Router();

router.route('/').get(getServers).post(createServer);
router
  .route('/:id')
  .get(getOneServer)
  .put(updateServer)
  .delete(deleteServer);
router.route('/archive/:id').put(archiveServer)

export default router;
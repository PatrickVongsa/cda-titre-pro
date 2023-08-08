import { Router } from 'express';
import { getHosts, getOneHost, createHost, updateHost, archiveHost, deleteHost } from '../controllers/host.controller';

const router = Router();

router.route('/').get(getHosts).post(createHost);
router.route('/:id').get(getOneHost).put(updateHost).delete(deleteHost);
router.route('/archive/:id').put(archiveHost);

export default router;

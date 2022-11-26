import { Router } from 'express';
import {
    getProspectStatuses,
    getOneProspectStatus,
    createProspectStatus,
    updateProspectStatus,
    archiveProspectStatus,
    deleteProspectStatus,
  } from '../controllers/prospect_status.controller';

  const router = Router();

  router.route('/').get(getProspectStatuses).post(createProspectStatus);
  router
    .route('/:id')
    .get(getOneProspectStatus)
    .put(updateProspectStatus)
    .delete(deleteProspectStatus);
  router.route('/archive/:id').put(archiveProspectStatus)
  
  export default router;
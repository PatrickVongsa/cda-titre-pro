import { Router } from 'express';
import {
    getInteractions,
    getOneInteraction,
    createInteraction,
    updateInteraction,
    archiveInteraction,
    deleteInteraction,
  } from '../controllers/interaction.controller';

  const router = Router();

  router.route('/').get(getInteractions).post(createInteraction);
  router
    .route('/:id')
    .get(getOneInteraction)
    .put(updateInteraction)
    .delete(deleteInteraction);
  router.route('/archive/:id').put(archiveInteraction)
  
  export default router;
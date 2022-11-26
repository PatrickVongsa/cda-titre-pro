import { Router } from 'express';
import {
  getCatalogs,
  getOneCatalog,
  createCatalog,
  updateCatalog,
  archiveCatalog,
  deleteCatalog,
} from '../controllers/catalog.controller';

const router = Router();

router.route('/').get(getCatalogs).post(createCatalog);
router
  .route('/:id')
  .get(getOneCatalog)
  .put(updateCatalog)
  .delete(deleteCatalog);
router.route('/archive/:id').put(archiveCatalog)

export default router;
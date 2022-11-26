import { Router } from 'express';
import {
  getCompanies,
  getOneCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} from '../controllers/company.controller';

const router = Router();

router.route('/').get(getCompanies).post(createCompany);
router
  .route('/:id')
  .get(getOneCompany)
  .put(updateCompany)
  .delete(deleteCompany);

export default router;
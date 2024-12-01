import { Router } from 'express';
import VacancyResponseController from '../controllers/vacancy-response.controller';

const router = Router();

router.get('/', VacancyResponseController.getAll);
router.post('/', VacancyResponseController.create);

export default router;

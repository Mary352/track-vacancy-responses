import { Router } from 'express';
import VacancyResponseController from '../controllers/vacancy-response.controller';

const router = Router();

router.get('/', VacancyResponseController.getAll);

export default router;

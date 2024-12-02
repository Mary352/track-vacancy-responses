import { Router } from 'express';
import VacancyResponseController from '../controllers/vacancy-response.controller';

const router = Router();

router.get('/', VacancyResponseController.getAll);
router.post('/', VacancyResponseController.create);
router.post('/delete/:id', VacancyResponseController.delete);

export default router;

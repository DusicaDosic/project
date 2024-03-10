import { Router } from 'express';
import { dodajBuduceRezervacije } from '../controllers/buduceRezervacijeController.js';

const router = Router();
router.get('/', dodajBuduceRezervacije);

export default router;
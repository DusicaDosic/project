import { Router } from 'express';
import { dodajKlijente } from '../controllers/klijentiController.js';

const router = Router();
router.get('/', dodajKlijente);

export default router;
import { Router } from 'express';
import { dodajZaposlene } from '../controllers/zaposleniController.js';
const router = Router();
router.get('/', dodajZaposlene);

export default router;
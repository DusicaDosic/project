import { Router } from 'express';
import { dodajTretmane } from '../controllers/tretmaniController.js';

const router = Router();
router.get('/tretmani.html', dodajTretmane);

export default router;
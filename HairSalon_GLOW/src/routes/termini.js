import { Router } from 'express';
import { dodajTermine } from '../controllers/terminiController.js';

const router = Router();
router.get('/', dodajTermine);

export default router;
import tretmaniRouter from './tretmani.js';
import zaposleniRouter from './zaposleni.js';
import klijentiRouter from './klijenti.js';
import terminiRouter from './termini.js';
import buduceRezervacijeRouter from './buduceRezervacije.js';

router.use('/tretmani', tretmaniRouter);
router.use('/zaposleni', zaposleniRouter);
router.use('/klijenti', klijentiRouter);
router.use('/termini', terminiRouter);
router.use('/buduceRezervacije', buduceRezervacijeRouter);

export default router;
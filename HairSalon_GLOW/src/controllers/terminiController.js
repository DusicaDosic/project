import db from '../database/termini.js';
import genericController from './genericController.js';

const dodajTermine = async (req, res) => {
    await genericController.getAllData(req, res, db.dodajTermine);
};

module.exports = {
    dodajTermine
};

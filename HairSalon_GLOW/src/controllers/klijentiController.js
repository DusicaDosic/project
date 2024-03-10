import db from '../database/klijenti.js';
import genericController from './genericController.js';

const dodajKlijente = async (req, res) => {
    await genericController.getAllData(req, res, db.dodajKlijente);
};

module.exports = {
    dodajKlijente
};

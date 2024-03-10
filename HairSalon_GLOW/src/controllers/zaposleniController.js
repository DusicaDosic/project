import db from '../database/zaposleni.js';
import genericController from './genericController.js';

const dodajZaposlene = async (req, res) => {
    await genericController.getAllData(req, res, db.dodajZaposlene);
};

module.exports = {
    dodajZaposlene
};
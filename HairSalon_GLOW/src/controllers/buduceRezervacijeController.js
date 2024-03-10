import db from '../database/buduceRezervacije.js';
import genericController from './genericController.js';

const dodajBuduceRezervacije = async (req, res) => {
    await genericController.getAllData(req, res, db.dodajBuduceRezervacije);
};

module.exports = {
    dodajBuduceRezervacije
};

import sql from 'mssql';
import config from './config.js';

async function dodajBuduceRezervacije() {
    try {
        await sql.connect(config);
        const result = await sql.query('select * from Rezervacije where datumRezervacije > CURRENT_TIMESTAMP');
        return result.recordset;
    } catch (error) {
        console.error('Error executing SQL query:', error);
        throw error;
    } finally {
        await sql.close();
    }
}

module.exports = {
    dodajBuduceRezervacije
};

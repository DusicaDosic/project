import sql from 'mssql';
import config from './config.js';

async function dodajKlijente() {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM VremeTermina');
        return result.recordset;
    } catch (error) {
        console.error('Error executing SQL query:', error);
        throw error;
    } finally {
        await sql.close();
    }
}

module.exports = {
    dodajKlijente
};

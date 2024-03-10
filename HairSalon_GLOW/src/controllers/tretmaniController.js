// tretmaniController.js

import sql from 'mssql';
console.log(1);
export async function dodajTretmane() {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM Tretmani');
        console.log(1);
        console.log(result.recordset);
        return result.recordset;
    } catch (error) {
        console.error('Error executing SQL query:', error);
        throw error;
    } finally {
        await sql.close();
    }
}

const config = {
    user: 'sa',
    password: 'A1b2g3d4*',
    server: 'DESKTOP-LSDGO06',
    database: 'FrizerskiSalon',
    options: {
      encrypt: false,
    },
};
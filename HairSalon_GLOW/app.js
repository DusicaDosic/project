import sql from 'mssql';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5500;
app.listen(PORT, () => console.log("Server running"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/tretmani', async function(req, res) {
    try {
      await sql.connect(config);
      console.log('Connected to the database');
      let result = await sql.query('SELECT * FROM Tretmani');
      let tretmani = result.recordsets[0]; 
      console.log(tretmani);
      res.json(tretmani);
    } catch (err) {
      console.error('Error connecting to the database:', err);
    } finally {
      await sql.close();
      console.log('Disconnected from the database');
    }
})

app.get('/zaposleni', async function(req, res) {
  try {
    await sql.connect(config);
    let result = await sql.query('SELECT * FROM Zaposleni');
    let zaposleni = result.recordsets[0]; 
    res.json(zaposleni);
  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    await sql.close();
  }
})

app.get('/klijenti', async function(req, res) {
  try {
    await sql.connect(config);
    let result = await sql.query('SELECT * FROM Klijent');
    let klijenti = result.recordsets[0]; 
    res.json(klijenti);
  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    await sql.close();
  }
})

app.get('/termini', async function(req, res) {
  try {
    await sql.connect(config);
    let result = await sql.query('SELECT * FROM VremeTermina');
    let klijenti = result.recordsets[0]; 
    res.json(klijenti);
  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    await sql.close();
  }
})

app.get('/buduceRezervacije', async function(req, res) {
  try {
    await sql.connect(config);
    let result = await sql.query('select * from Rezervacije where datumRezervacije > CURRENT_TIMESTAMP');
    let bRezervacije = result.recordsets[0]; 
    res.json(bRezervacije);
  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    await sql.close();
  }
})


app.post('/Registrovanje.html', async function (req, res) {
  const noviKlijenat = req.body;
  try {
    await sql.connect(config);
    let r = new sql.Request();

    let insertQuery = "INSERT INTO Klijent (korisnickoImeKlij, lozinkaKlij, imeKlij, prezimeKlij, imejlKlij) VALUES(@KI, @LOZ, @IME, @PREZIME, @IMEJL)";
    r.input('KI', sql.NVarChar(50), noviKlijenat.korisnickoImeKlij);
    r.input('LOZ', sql.NVarChar(50), noviKlijenat.lozinkaKlij);
    r.input('IME', sql.NVarChar(20), noviKlijenat.imeKlij);
    r.input('PREZIME', sql.NVarChar(20), noviKlijenat.prezimeKlij);
    r.input('IMEJL', sql.NVarChar(50), noviKlijenat.imejlKlij);

    try {
    let result = await r.query(insertQuery);
    console.log('Uspešno uneti podaci');
    res.json({
      status: 'success'
    });
   } catch (err) {
    console.error('Greška pri unosu podataka:', err);
    res.json({
      status: 'error'
    });
    } finally {
    await sql.close();
    }

  } catch (err) {
    console.error('Greška pri povezivanju na bazu:', err);
  } finally {
    await sql.close();
  }
});

app.post('/Rezervisanje.html', async function (req, res) {
  const novaRezervacija = req.body;
  try {
      await sql.connect(config);
      let r = new sql.Request();

      let insertQuery = "INSERT INTO Rezervacije (datumRezervacije, vremeRezervacije, zaposlen, tretman, klijent) VALUES(@datumRezervacije, @vremeRezervacije, @zaposlen, @tretman, @klijent)";
      r.input('datumRezervacije', sql.Date, novaRezervacija.datumRezervacije);
      r.input('vremeRezervacije', sql.Int, novaRezervacija.vremeRezervacije);
      r.input('zaposlen', sql.NVarChar(50), novaRezervacija.zaposlen);
      r.input('tretman', sql.Int, novaRezervacija.tretman);
      r.input('klijent', sql.NVarChar(50), novaRezervacija.klijent);

      try {
      let res = await r.query(insertQuery);
      console.log('Uspešno uneti podaci');
      res.json({
        status: 'success'
      });
      } catch (err) {
      console.error('Greška pri unosu podataka:', err);
      res.json({
        status: 'error'
      });
      } finally {
        setTimeout(async () => {
          await sql.close();
        }, 1000);
      }

  } catch (err) {
    console.error('Greška pri povezivanju na bazu:', err);
  } finally {
    setTimeout(async () => {
      await sql.close();
    }, 1000);
  }
});

app.post('/rezervacijeKlijenta', async function(req, res) {
  let korisnik = req.body;
  try {
    await sql.connect(config);
    let r = new sql.Request();
    let insertQuery = "SELECT datumRezervacije, vremeRezervacije, zaposlen, tretman, t.nazivTret, t.cenaTret, t.trajanjeTret, v.VremeOd, z.imeZap, z.prezimeZap from Rezervacije r LEFT JOIN Tretmani t ON r.tretman = t.IDtret LEFT JOIN VremeTermina v ON r.vremeRezervacije=v.idT LEFT JOIN Zaposleni z ON r.zaposlen = z.korisnickoImeZap where klijent=@korisnik";
    r.input('korisnik', sql.NVarChar(50), korisnik.data);

      try {
        let result = await r.query(insertQuery);
        console.log('Uspešno uneti podaci');
        let kRezervacije = result.recordsets[0]; 
        res.json(kRezervacije);
      } catch (err) {
      console.error('Greška pri priupljanju podataka:', err);
      res.json({
        status: 'error'
      });
      } finally {
      await sql.close();
      }

  } catch (err) {
    console.error('Greška pri povezivanju na bazu:', err);
  } finally {
    await sql.close();
  }
})


const config = {
  user: 'sa',
  password: 'A1b2g3d4*',
  server: 'DESKTOP-LSDGO06',
  database: 'FrizerskiSalon',
  options: {
    encrypt: false,
  },
};


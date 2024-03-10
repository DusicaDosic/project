let zaposleni = [];
let klijenti = [];
let unetoKI = '';
let lozinka = '';
let imejl = '';
let ime = '';
let prezime = '';

//REGISTROVANJE
let btnRegistrujSe = document.querySelector('#registrujse');
btnRegistrujSe.addEventListener('click', function (event) {
        event.preventDefault();
        unetoKI = document.querySelector('div.reg input.korisnickoIme').value;
        lozinka = document.querySelector('div.reg input.lozinka').value;
        imejl = document.querySelector('#email').value;
        ime = document.querySelector('#firstName').value;
        prezime = document.querySelector('#lastName').value;

        if (unetoKI === '' || lozinka === '' || imejl === '') {
            alert('Niste uneli sve podatke');
        } else if (lozinka.length<8) {
            alert("Lozinka mora da ima 8 karaktera");
        } else if (imejl.split("@").length!==2) {
            alert("Imejl nije unet u ispravnom formatu");
        }
        else {
            dodajPodatke();
        }
    })
    
//DOBIJANJE ZAPOSLENIH IZ BAZE
function dodajPodatke() {
    fetch('http://localhost:5500/zaposleni')
    .then(response => response.json())
    .then(data=> upisiZaposlenog(data))
    .then(() => nabaviKlijenta())
    .catch(error => {
        console.log(error);
    });
    function upisiZaposlenog(data) {
        zaposleni=data;
    }
}

//DOBIJANJE KLIJENATA IZ BAZE
function nabaviKlijenta() {
    fetch('http://localhost:5500/klijenti')
    .then(response => response.json())
    .then(data=> upisiKlijenta(data))
    .then(() => proveraUpis())
    .catch(error => {
        console.log(error);
    });
    function upisiKlijenta(data) {
        klijenti = data;
    }
}


function proveraUpis() {
    let zauzetaKI = [];
    for (let zaposlen of zaposleni) {
        zauzetaKI.push(zaposlen.korisnickoImeZap);
    }
    for (let klijenat of klijenti) {
        zauzetaKI.push(klijenat.korisnickoImeKlij);
    }
    let proveraKI = true;
    for (let KI of zauzetaKI) {
        if (KI === unetoKI) {
            proveraKI = false;
            alert('Korisničko ime je zauzeto');
            break;
        }
    }
    if (proveraKI) {
        let klijent = {
            korisnickoImeKlij: unetoKI,
            lozinkaKlij: lozinka,
            imeKlij: null,
            prezimeKlij: null,
            imejlKlij: imejl
        };
        console.log(klijent);
        if (ime !== '') {
            klijent.imeKlij = ime;
        }
        if (prezime !== '') {
            klijent.prezimeKlij = prezime;
        }

        fetch('/Registrovanje.html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(klijent)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result.status);
                if (result.status == 'success') {
                    alert('Uspešno ste se registrovali');
                    upisiStorage();
                } else {
                    alert('Došlo je do greške, molim Vas pokušajte opet');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function upisiStorage() {
    sessionStorage.setItem('korisnickoIme', JSON.stringify(unetoKI));
}
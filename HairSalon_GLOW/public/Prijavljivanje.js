let zaposleni = [];
let klijenti = [];
let prijUnetoKI = '';
let prijLozinka = '';
let KIz = '';
let LOz = '';
let KIk = '';
let LOk = '';

//PRIJAVLJIVANJE
let btnPrijaviSe = document.querySelector('#prijavise');
btnPrijaviSe.addEventListener('click', function(event) {
    event.preventDefault();
    prijUnetoKI = document.querySelector('#prijava input.korisnickoIme').value;
    prijLozinka = document.querySelector('#prijava input.lozinka').value;
    if (prijUnetoKI==='' || prijLozinka==='') {
        alert('Niste uneli sve podatke');
    } else {
        dodajZaposlene();
    }
})

//DOBIJANJE ZAPOSLENIH IZ BAZE
function dodajZaposlene() {
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
    .then(() => provera())
    .catch(error => {
        console.log(error);
    });
    function upisiKlijenta(data) {
        klijenti = data;
    }
}

function provera() {
    let proveraP = '';
    for(let zaposlen of zaposleni) {
        if(zaposlen.korisnickoImeZap === prijUnetoKI) {
            KIz = zaposlen.korisnickoImeZap;
            LOz = zaposlen.lozinkaZap;
            proveraP = 'Z';
            break;
        } 
    }
    if(proveraP==='') {
        for(let klijenat of klijenti) {
            if(klijenat.korisnickoImeKlij === prijUnetoKI) {
                KIk = klijenat.korisnickoImeKlij;
                LOk = klijenat.lozinkaKlij;
                proveraP = 'K';
                break;
            }
        }
    }
    if(proveraP==='') {
        alert('Ne postoji korisnik sa upisanim korisničkim imenom');
    }
    if(proveraP==='Z') {
        if(prijLozinka === LOz) {
            sessionStorage.setItem('korisnickoIme', JSON.stringify(KIz));
            sessionStorage.setItem('Zaposlen', JSON.stringify(1));
            console.log('success');
        } else {
            alert('Pogrešna lozinka');
        }
    }
    if(proveraP==='K') {
        if(prijLozinka === LOk) {
            sessionStorage.setItem('korisnickoIme', JSON.stringify(KIk));
            console.log('success');
        } else {
            alert('Pogrešna lozinka');
        }
    }
    if(proveraP==='K' || proveraP==='Z') {
        alert('Uspešno ste se prijavili');
    }
}


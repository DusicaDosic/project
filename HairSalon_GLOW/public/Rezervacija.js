let bRez = [];
let termini = [];
let odabraniZap = [];

let btnDatumi = Array.from(document.querySelectorAll('.dani li:not(.inactive)'));

let datumRez = new Date();
let datum = '';
let formatiranDatum = '';
dodajELnaDatum();
function dodajELnaDatum() {
    btnDatumi.forEach((btnDatum) => {
        btnDatum.addEventListener('click', (e) => {
            document.getElementById('rezervisi').style.display = 'none';
            let dan = '';
            let mesec = '';
            let godina = '';
            dan = btnDatum.textContent;
            let mesecGod = document.querySelector('p.trenutniDatum').textContent.split(' ');
            godina = parseInt(mesecGod[1]);
            switch (mesecGod[0]) {
                case 'Januar':
                    mesec = 0;
                    break;
                case 'Februar':
                    mesec = 1;
                    break;
                case 'Mart':
                    mesec = 2;
                    break;
                case 'April':
                    mesec = 3;
                    break;  
                case 'Maj':
                    mesec = 4;
                    break; 
                case 'Jun':
                    mesec = 5;
                    break;   
                case 'Jul':
                    mesec = 6;
                    break;   
                case 'Avgust':
                    mesec = 7;
                    break;   
                case 'Septembar':
                    mesec = 8;
                    break; 
                case 'Oktobar':
                    mesec = 9;
                    break;   
                case 'Novembar':
                    mesec = 10;
                    break;   
                case 'Decembar':
                    mesec = 11;
                    break;            
              }
            datum = new Date(godina, mesec, dan);
            let danas = new Date();
            if(datum > danas){
                btnDatumi.forEach((bd) => {
                    bd.classList.remove('active');
                });
                btnDatum.classList.add('active');
                dodajbRezervacije();
            } else {
                alert('Molim Vas izaberite datume nakon današnjeg dana');
            }
        })
    })
}

let ikone = document.querySelectorAll(".ikone span");
ikone.forEach((ikona) => {
    ikona.addEventListener('click', (e) => {
        btnDatumi = Array.from(document.querySelectorAll('.dani li:not(.inactive)'));
        dodajELnaDatum();
    })
})

let dpbZaposleni = document.getElementById('dpbZaposleni');
dpbZaposleni.addEventListener('change', (e) => {
    if(document.querySelector('.active')) {
        dodajbRezervacije();
    }
})

//DODAJ BUDUCE REZERVACIJE
async function dodajbRezervacije() {  
    const rezultat = await fetch('http://localhost:5500/buduceRezervacije');
    bRez = await rezultat.json();
    dodajTermine();
}

//DODAJ SVE TERMINE
let slobodniTermini = [];
async function dodajTermine() {  
    let upisaniTermini = Array.from(document.getElementsByClassName('termin'));
    if(upisaniTermini.length > 0) {
        upisaniTermini.forEach((t) => {
            t.remove();
        })
    }
    const rezultat = await fetch('http://localhost:5500/termini');
    termini = await rezultat.json();
    let dostupniTermini = document.getElementById('dostupniTermini');
    odabraniZap = dpbZaposleni.value;
    let terminiRezervacijaZaZapDat = [];
    const year = datum.getFullYear();
    const month = (datum.getMonth() + 1).toString().padStart(2, '0');;
    const day = datum.getDate().toString().padStart(2, '0');;
    formatiranDatum = `${year}-${month}-${day}`;

    bRez.forEach((rez) => {
        let datumRez = rez.datumRezervacije.split('T')[0];

        if(datumRez === formatiranDatum && rez.zaposlen === odabraniZap) {
            terminiRezervacijaZaZapDat.push(rez.vremeRezervacije);
        }
    })
    let brojTermina = parseInt(document.querySelector('#tretmani p:last-child').textContent.split(': ')[1].split('m')[0]) / 15;
    for(let i=0; i<= termini.length-brojTermina; i++) {
        let provera = true;
        for(let y=i; y< i +brojTermina; y++) {
            for(let z= 0; z< terminiRezervacijaZaZapDat.length; z++) {
                if(terminiRezervacijaZaZapDat[z] == termini[y].idT) {
                    provera = false;
                    break;
                }
            }
        }

        if(provera) {
            let terminTekst = termini[i].VremeOd.split('T')[1].split(':00.')[0];
            let button = document.createElement('button');
            button.classList.add('termin');
            button.value = termini[i].idT;
            button.textContent = terminTekst;
            dostupniTermini.appendChild(button);
        }
    }
    dodajELnaTermine();
}

function dodajELnaTermine() {
    let ispisaniTermini = Array.from(document.getElementsByClassName('termin'));
    if(ispisaniTermini.length > 0) {
        ispisaniTermini.forEach((t) => {
            t.addEventListener('click', (e) => {
                let odabranT = Array.from(document.getElementsByClassName('odabranTermin'));
                if(odabranT.length == 1) {
                    odabranT = document.querySelector('.odabranTermin');
                    odabranT.classList.remove('odabranTermin');
                } 
                e.currentTarget.classList.toggle("odabranTermin");
                let btnRezervacija = document.getElementById('rezervisi');
                btnRezervacija.style.display = 'block';
                window.scrollBy(0, 200); 
                btnRezervacija.addEventListener(('click'), (e) => {
                    let rezervacija;
                    let tretmani = JSON.parse(sessionStorage.getItem('idTretmana'));
                    let tretmaniTrajanje = sessionStorage.getItem('trajanjeTretmana').split(', ');
                    let brojacT = 0;
                    let t = parseInt(document.querySelector('.odabranTermin').value)
                    let proveraGresaka = false;
                    for(let i=0; i<tretmani.length; i++) {
                        let trajanjeT = parseInt(tretmaniTrajanje[i]) / 15;
                        for(let y=0; y<trajanjeT; y++) {
                            rezervacija = {
                                datumRezervacije : formatiranDatum,
                                vremeRezervacije : t+brojacT,
                                zaposlen: odabraniZap,
                                tretman : tretmani[i],
                                klijent: JSON.parse(sessionStorage.getItem('korisnickoIme'))
                            }
                            brojacT++;
                            fetch('/Rezervisanje.html', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(rezervacija)
                            })
                            .then(response => response.json())
                            .then(result => {
                                console.log(result.status);
                                if (result.status != 'success') {
                                    proveraGresaka = true;
                                } 
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            })
                        }
                    }
                    btnRezervacija.style.display='none';
                    if(proveraGresaka) {
                        alert('Došlo je do greške, molim Vas pokušajte opet');
                        location.reload();
                    } else {
                        alert('Uspšno ste napravili rezervaciju');
                        location.reload();
                    }
                });
            });
        })
    }
}



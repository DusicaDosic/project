let korisnik = JSON.parse(sessionStorage.getItem('korisnickoIme'));
let rezervacijeK = [];
let tretmani = [];
let zaposleni = [];

dodajTretmane();


fetch('/rezervacijeKlijenta', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({data: korisnik})
    })
    .then(response => response.json())
    .then(result => {
        rezervacijeK = result;
    })
    .then(() => upisiRezervacijeK(rezervacijeK))
    .catch(error => {
        console.error('Error:', error);
    });

function upisiRezervacijeK(rezervacijeK) {
    let kontejner = document.getElementById('mojeRezervacije');
    for(let i = rezervacijeK.length - 1; i>=0; i) {
        let datumRezervacije = rezervacijeK[i].datumRezervacije.split('T')[0];
        let vremeOd = rezervacijeK[i].VremeOd.split('T')[1].split(':00.')[0];
        let tretman = rezervacijeK[i].nazivTret;
        let zaposlen = rezervacijeK[i].imeZap + ' ' + rezervacijeK[i].prezimeZap;
        let cena = rezervacijeK[i].cenaTret;
        let timestamp = Date.parse(datumRezervacije);
        let date = new Date(timestamp);
        let danas = new Date();
        let status = '';
        if(date>danas) {
            status =  'u procesu';
        } else {
            status = 'prošlo';
        }
        let div = document.createElement('div');
        div.className = 'mojaRezervacija';
        div.innerHTML = `<div class="rTretman">
                            <p>${tretman}</p>
                        </div>
                        <div class="datumVreme">
                            <p>Datum: ${datumRezervacije}</p>
                            <p>Vreme: ${vremeOd}</p>
                        </div>
                        <div class="zaposleni">
                            <p>Zaposleni: ${zaposlen}</p>
                        </div>
                        <div class="cenaStatus">
                            <p>Cena: ${cena}</p>
                            <div>Status: <p class="status" style="display:inline;">${status}</p></div>
                        </div>`;
        kontejner.append(div)
        let trajanje = rezervacijeK[i].trajanjeTret / 15;
        let tretmanDiv = div.querySelector('.rTretman');
        let statusP = div.querySelector('.status');
        if(status === 'u procesu') {
            div.style.borderColor = 'green';
            tretmanDiv.style.color = 'green';
            statusP.style.color = 'green';
        } else {
            div.style.borderColor = 'red';
            tretmanDiv.style.color = 'red';
            statusP.style.color = 'red';
        }
        i = i - trajanje;
    }
}

//DOBIJANJE TRETMANA IZ BAZE
function dodajTretmane() {
    fetch('http://localhost:5500/tretmani')
    .then(response => response.json())
    .then(data=> upisiTretmane(data))
    .then(() => dodajZaposlene())
    .catch(error => {
        console.log(error);
    });
    function upisiTretmane(data) {
        tretmani=data;
    }
}

function dodajZaposlene() {
    fetch('http://localhost:5500/zaposleni')
    .then(response => response.json())
    .then(data=> upisiZaposlenog(data))
    .then(() => dodajEL())
    .catch(error => {
        console.log(error);
    });
    function upisiZaposlenog(data) {
        zaposleni=data;
    }
}

function dodajEL() {
    let datalistT = document.querySelector('#tretmaniF datalist');
    for(let tretman of tretmani) {
        let option = document.createElement('option');
        option.value = tretman.IDtret;
        option.textContent = tretman.nazivTret;
        datalistT.appendChild(option);
    }

    let selectZ = document.querySelector('#zaposleniF select');
    for(let zaposlen of zaposleni) {
        let option = document.createElement('option');
        option.value = zaposlen.korisnickoImeZap;
        option.textContent = zaposlen.imeZap + ' ' + zaposlen.prezimeZap;
        selectZ.appendChild(option);
    }

    let pretragaT = document.querySelector('#tretmaniF input');
    pretragaT.addEventListener('input', function() {
        let filter = pretragaT.value.toLowerCase();
        let options = datalistT.options;
      
        for (let i = 0; i < options.length; i++) {
            let nazivTretmana = options[i].text.toLowerCase();
            if (nazivTretmana.includes(filter)) {
                options[i].style.display = '';
            } else {
                options[i].style.display = 'none';
            }
        }
    });
    
    let selectS = document.querySelector('#statusF select');
    let btnFilterUkloni = document.getElementById('btnFilterUkloni');
    btnFilterUkloni.addEventListener('click', (e)=> {
        location.reload();
    })
    let btnFilter = document.getElementById('btnFilter'); 
    btnFilter.addEventListener('click', function() {
        let rezervacijeF = rezervacijeK;
        console.log(pretragaT.value);
        if(pretragaT.value ==='' && selectZ.value == 0 && selectS.value == 0) {
            location.reload();
        }
        else {
            let klaseRez = Array.from(document.getElementsByClassName('mojaRezervacija'));
            klaseRez.forEach(function(r) {
                r.remove();
              });
            if(pretragaT.value !== '') {
                rezervacijeF = rezervacijeF.filter((r)=>{
                    if(r.tretman == pretragaT.value) {
                        return true;
                    }
                });
            }
            if(selectZ.value != 0) {
                rezervacijeF = rezervacijeF.filter((r)=>{
                    if(r.zaposlen == selectZ.value) {
                        return true;
                    }
                });
            }
            if(selectS.value > 0) {
                rezervacijeF = rezervacijeF.filter((r)=>{
                    let datumRezervacije = r.datumRezervacije.split('T')[0];
                    let timestamp = Date.parse(datumRezervacije);
                    let date = new Date(timestamp);
                    let danas = new Date();
                    if(selectS.value ==1 && date>danas) {
                        console.log('da');
                        return true;
                    }
                    if(selectS.value ==2 && date<danas) {
                        return true;

                    }
                });
            }
        }
        upisiRezervacijeK(rezervacijeF);
    })


}

let tretmani = [];
let zaposleni = [];
let brojTermina = 0;
let idTretmana = JSON.parse(sessionStorage.getItem('idTretmana'));
dodajTretmane();
dodajZaposlenog();
//DOBIJANJE TRETMANA IZ BAZE
function dodajTretmane() {
    fetch('http://localhost:5500/tretmani')
    .then(response => response.json())
    .then(data=> upisiTretmane(data))
    .then(() => upisiOdabraneTretmane())
    .catch(error => {
        console.log(error);
    });
    function upisiTretmane(data) {
        tretmani=data;
    }
}

//Upisivanje odabranih tretmana
function upisiOdabraneTretmane() {
    let pTretmani = document.getElementById('tretmani');
    let odabraniTretmani = tretmani.filter((tretman) => {
        for(let odabraniT of idTretmana) {
            if(odabraniT == tretman.IDtret) {
                return true;
            }
        }
    })
    let vremeBrojac = 0;
    let cenaBrojac = 0;
    sessionStorage.setItem('trajanjeTretmana', '');
    for(let odabraniT of odabraniTretmani) {
        let p = document.createElement('p');
        p.textContent = 'Tretman: ' + odabraniT.nazivTret;
        pTretmani.appendChild(p);
        vremeBrojac += odabraniT.trajanjeTret;
        cenaBrojac += odabraniT.cenaTret;
        let ssTrajanjeT = sessionStorage.getItem("trajanjeTretmana");
        let noviSS = JSON.stringify(odabraniT.trajanjeTret);
        if (ssTrajanjeT) {
            ssTrajanjeT += ", " + noviSS;
        } else {
            ssTrajanjeT = noviSS;
        }

        sessionStorage.setItem("trajanjeTretmana", ssTrajanjeT);
    }
    
    let pCena = document.createElement('p');
    pCena.textContent = 'Cena tretmana: ' + cenaBrojac + 'din'
    pTretmani.appendChild(pCena);
    let pVreme = document.createElement('p');
    pVreme.textContent = 'Trajanje tretmana: ' + vremeBrojac + 'min'
    pTretmani.appendChild(pVreme);
    brojTermina = vremeBrojac / 15;
}

//DOBIJANJE ZAPOSLENIH IZ BAZE
function dodajZaposlenog() {
    fetch('http://localhost:5500/zaposleni')
    .then(response => response.json())
    .then(data=> upisiZaposlenog(data))
    .then(() => upisiDostupneZaposlene())
    .catch(error => {
        console.log(error);
    });
    function upisiZaposlenog(data) {
        zaposleni=data;
    }
}

function upisiDostupneZaposlene() {
    let select = document.querySelector('select');
    let trenutnoZaposleni = zaposleni.filter((z) => {
        if(z.trenutniStatus === 'Z') {
            return true;
        }
    })
    for(let zaposlen of trenutnoZaposleni) {
        let option = document.createElement('option');
        option.value = zaposlen.korisnickoImeZap;
        option.textContent = zaposlen.imeZap + ' ' + zaposlen.prezimeZap;
        select.appendChild(option);
    }
}

//KALENDAR
const daniTag = document.querySelector(".dani"),
trenutniDatum = document.querySelector(".trenutniDatum"),
ikone = document.querySelectorAll(".ikone span");


let date = new Date(),
godina = date.getFullYear(),
mesec = date.getMonth();

const meseci = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul",
              "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];

const napraviKalendar = () => {
    let prviDanMeseca = new Date(godina, mesec, 1).getDay(),
    poslednjiDatumMeseca = new Date(godina, mesec + 1, 0).getDate(), 
    poslednjiDanMeseca = new Date(godina, mesec, poslednjiDatumMeseca).getDay(), 
    poslednjiDatumProslogMeseca = new Date(godina, mesec, 0).getDate(); 
    let liTag = "";

    for (let i = prviDanMeseca; i > 0; i--) { 
        liTag += `<li class="inactive">${poslednjiDatumProslogMeseca - i + 1}</li>`;
    }

    for (let i = 1; i <= poslednjiDatumMeseca; i++) { 
        let danas = i === date.getDate() && mesec === new Date().getMonth() 
                     && godina === new Date().getFullYear() ? "danas inactive" : "";
        liTag += `<li class="${danas}">${i}</li>`;
    }

    for (let i = poslednjiDanMeseca; i < 6; i++) { 
        liTag += `<li class="inactive">${i - poslednjiDanMeseca + 1}</li>`
    }
    trenutniDatum.innerText = `${meseci[mesec]} ${godina}`;
    daniTag.innerHTML = liTag;

    let dani = Array.from(document.querySelectorAll('.dani li'));
    for(let i = 0; i < dani.length; i+=7) {
        dani[i].classList.add('inactive');
    }

    for(let i = 6; i < dani.length; i+=7) {
        dani[i].classList.add('inactive');
    }
}
napraviKalendar();



ikone.forEach(ikona => { 
    ikona.addEventListener("click", () => { 
        mesec = ikona.id === "prev" ? mesec - 1 : mesec + 1;

        if(mesec < 0 || mesec > 11) { 
            date = new Date(godina, mesec, new Date().getDate());
            godina = date.getFullYear(); 
            mesec = date.getMonth(); 
        } else {
            date = new Date();
        }
        napraviKalendar();
    });
});

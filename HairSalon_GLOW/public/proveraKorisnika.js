let korisnik = JSON.parse(sessionStorage.getItem('korisnickoIme'));
let zaposlenProvera = JSON.parse(sessionStorage.getItem('Zaposlen'));

let lista = document.querySelector('nav ul');
if(korisnik!==null && zaposlenProvera!== 1) {
    let li = document.createElement('li')
    li.innerHTML = `<img class="imgKorisnik" src="Slike/korisnik.png" alt="korisnik">
                    <ul id="meni">
                        <li>${korisnik}</li>
                        <li><a href="RezervacijeKlijenta.html">Moje rezervacije</a></li>
                        <li><a href="Pocetna.html">Odjava</a></li>
                    </ul>`;
    lista.appendChild(li);
    let meni = document.getElementById('meni');
    meni.style.display = 'none';

    let odjava = document.querySelector('#meni li:last-child a');
    
    li.addEventListener('click', () => {
        if(meni.className === 'sakrij') {
            meni.style.display = 'none';
            meni.classList.remove('sakrij');
        } else {
            meni.style.display = 'block';
            meni.classList.add('sakrij');
        }
    })

    odjava.addEventListener('click', (e) => {
        sessionStorage.removeItem('korisnickoIme');
    })
} else if(korisnik!==null && zaposlenProvera=== 1) {
    let li = document.createElement('li')
    li.innerHTML = `<img class="imgKorisnik" src="Slike/korisnik.png" alt="korisnik">
                    <ul id="meni">
                        <li>${korisnik}</li>
                        <li><a hreg="">Sve rezervacije</a></li>
                        <li><a href="Pocetna.html">Odjava</a></li>
                    </ul>`;
    lista.appendChild(li);
    let meni = document.getElementById('meni');
    meni.style.display = 'none';

    let odjava = document.querySelector('#meni li:last-child a');
    
    li.addEventListener('click', () => {
        if(meni.className === 'sakrij') {
            meni.style.display = 'none';
            meni.classList.remove('sakrij');
        } else {
            meni.style.display = 'block';
            meni.classList.add('sakrij');
        }
    })

    odjava.addEventListener('click', (e) => {
        sessionStorage.removeItem('korisnickoIme');
        sessionStorage.removeItem('Zaposlen');
    })
} else {
    let li = document.createElement('li')
    li.innerHTML = `<div class="dugmad">
                        <button class="Registracija"><a href="Registrovanje.html">Registruj se</a></button>
                        <button class="Prijava"><a href="Prijavljivanje.html" style="color:black">Prijavi se</a></button>
                    </div>`;
    lista.appendChild(li);
}
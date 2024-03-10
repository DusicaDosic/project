let btnZakazi = document.querySelector('#btnZakaziZ, #btnZakaziM');
btnZakazi.addEventListener('click', function(e) {
    let tretmani = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    let idTretmana = tretmani.map((tretman) => {
        return tretman.value;
    })
    if(idTretmana.length > 0) {
        sessionStorage.removeItem('idTretmana');
        sessionStorage.setItem('idTretmana', JSON.stringify(idTretmana));

        let link = document.querySelector('#btnZakaziZ a, #btnZakaziM a');
        if(JSON.parse(sessionStorage.getItem('Zaposlen'))) {
            alert('Da biste zakazali termin morate biti ulogovani kao klijent');
        } else {
            if(sessionStorage.getItem('korisnickoIme')) {
                link.href = 'Rezervacija.html';
            } else {
                link.href = 'Registrovanje.html';
            }
        }
    } else {
        alert('Niste odabrali nijedan tretman');
    }
})
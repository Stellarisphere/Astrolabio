const ghiera = document.getElementById('ghiera-giorni');

const mesi = [
    { nome: 'Gennaio', giorni: 31 },
    { nome: 'Febbraio', giorni: 28 },
    { nome: 'Marzo', giorni: 31 },
    { nome: 'Aprile', giorni: 30 },
    { nome: 'Maggio', giorni: 31 },
    { nome: 'Giugno', giorni: 30 },
    { nome: 'Luglio', giorni: 31 },
    { nome: 'Agosto', giorni: 31 },
    { nome: 'Settembre', giorni: 30 },
    { nome: 'Ottobre', giorni: 31 },
    { nome: 'Novembre', giorni: 30 },
    { nome: 'Dicembre', giorni: 31 }
];

const totaleGiorni = 365;

function placeLabel(text, giornoIndex, radius, isMese = false, centroX, centroY) {
    const angleDeg = (giornoIndex / totaleGiorni) * 360 - 90;
    const angleRad = angleDeg * (Math.PI / 180);

    const x = centroX + radius * Math.cos(angleRad);
    const y = centroY + radius * Math.sin(angleRad);

    const label = document.createElement('div');
    label.className = isMese ? 'month-label' : 'day-label';
    label.textContent = text;
    if (isMese) label.style.fontWeight = 'bold';

    label.style.left = `${x}px`;
    label.style.top = `${y}px`;
    label.style.transform = `translate(-50%, -50%) rotate(${angleDeg + 90}deg)`;
    ghiera.appendChild(label);
}

function disegnaGhiera() {
    ghiera.innerHTML = '';

    const centroX = ghiera.clientWidth / 2;
    const centroY = ghiera.clientHeight / 2;
    const raggioInterno = (Math.min(ghiera.clientWidth, ghiera.clientHeight) / 2) * 0.85;

    const proporzioneTickSmall = 0.02;
    const proporzioneTickMedium = 0.035;
    const proporzioneFineMese = 0.30;
    const proporzioneEtichetteGiorni = 0.03;
    const proporzioneEtichetteMesi = proporzioneEtichetteGiorni * 2.9; 

    const lunghezzaTickSmall = raggioInterno * proporzioneTickSmall;
    const lunghezzaTickMedium = raggioInterno * proporzioneTickMedium;
    const lunghezzaFineMese = raggioInterno * proporzioneFineMese;
    const raggioEsternoMedium = raggioInterno + lunghezzaTickMedium;
    const raggioEsternoFineMese = raggioInterno + lunghezzaFineMese;

    const raggioEtichetteGiorni = raggioEsternoMedium + (raggioInterno * proporzioneEtichetteGiorni);
    const raggioEtichetteMesi = raggioEsternoMedium + (raggioInterno * proporzioneEtichetteMesi);

    let giornoAssoluto = 0;

    mesi.forEach(mese => {
        const centroMese = giornoAssoluto + mese.giorni / 2;
        // etichette mesi un po' più esterne
        placeLabel(mese.nome, centroMese, raggioEtichetteMesi, true, centroX, centroY);

        for (let giorno = 1; giorno <= mese.giorni; giorno++) {
            const globalDay = giornoAssoluto + giorno;
            const angleDeg = (globalDay / totaleGiorni) * 360 - 90;
            const angleRad = angleDeg * (Math.PI / 180);

            const xInner = centroX + raggioInterno * Math.cos(angleRad);
            const yInner = centroY + raggioInterno * Math.sin(angleRad);

            let tick = document.createElement('div');
            tick.classList.add('day-tick');

            if (giorno % 5 === 0) {
                tick.classList.add('tick-medium');
                tick.style.width = '1.5px';
                tick.style.height = `${lunghezzaTickMedium}px`;
                tick.style.left = `${xInner}px`;
                tick.style.top = `${yInner}px`;
                tick.style.transformOrigin = 'top center';
                tick.style.transform = `rotate(${angleDeg - 90}deg)`;
                tick.style.backgroundColor = 'white';
                tick.style.border = 'none';

            } else {
                tick.classList.add('tick-small');
                tick.style.width = '1px';
                tick.style.height = `${lunghezzaTickSmall}px`;
                tick.style.left = `${xInner}px`;
                tick.style.top = `${yInner}px`;
                tick.style.transformOrigin = 'top center';
                tick.style.transform = `rotate(${angleDeg - 90}deg)`;
                tick.style.backgroundColor = 'white';
                tick.style.border = 'none';
            }

            ghiera.appendChild(tick);

            if (giorno % 5 === 0) {
                // etichette giorni più interne
                placeLabel(giorno.toString(), globalDay, raggioEtichetteGiorni, false, centroX, centroY);
            }
        }

        const endAngle = ((giornoAssoluto + mese.giorni) / totaleGiorni) * 360 - 90;
        const fineMese = document.createElement('div');
        fineMese.classList.add('day-tick', 'tick-fine-mese');
        fineMese.style.width = '2px';
        fineMese.style.height = `${lunghezzaFineMese}px`;
        const xInnerMese = centroX + raggioInterno * Math.cos(endAngle * Math.PI / 180);
        const yInnerMese = centroY + raggioInterno * Math.sin(endAngle * Math.PI / 180);
        fineMese.style.left = `${xInnerMese}px`;
        fineMese.style.top = `${yInnerMese}px`;
        fineMese.style.transformOrigin = 'top center';
        fineMese.style.transform = `rotate(${endAngle - 90}deg)`;
        fineMese.style.backgroundColor = 'white';

        ghiera.appendChild(fineMese);

        giornoAssoluto += mese.giorni;
    });
}

function disegnaOre() {
    const container = document.getElementById('ore-container');
    container.innerHTML = '';

    const raggio = container.offsetWidth / 2 * 0.90; // distanza dal centro
    const centroX = container.offsetWidth / 2;
    const centroY = container.offsetHeight / 2;

    for (let h = 0; h < 24; h++) {
        const angolo = -((360 / 24) * h) - 90; // 0 in alto, poi antiorario
        const rad = angolo * Math.PI / 180;

        const x = centroX + raggio * Math.cos(rad);
        const y = centroY + raggio * Math.sin(rad);

        const label = document.createElement('div');
        label.className = 'hour-label';
        label.innerText = h.toString();

        label.style.left = `${x}px`;
        label.style.top = `${y}px`;
        label.style.transform = `translate(-50%, -50%) rotate(${angolo + 90}deg)`;

        container.appendChild(label);
    }
}
function disegnaTickOre() {
    const container = document.getElementById('tick-ore');
    container.innerHTML = '';

    const centroX = container.offsetWidth / 2;
    const centroY = container.offsetHeight / 2;
    const raggio = container.offsetWidth / 1.8; // leggermente dentro la maschera ellittica

    const totalTicks = 24 * 6; // ogni 10 minuti (6 tick per ora)
    for (let i = 0; i < totalTicks; i++) {
        const angoloDeg = (360 / totalTicks) * i - 90;
        const rad = angoloDeg * Math.PI / 180;

        const x = centroX + raggio * Math.cos(rad);
        const y = centroY + raggio * Math.sin(rad);

        const tick = document.createElement('div');
        const isOraIntera = i % 6 === 0;

        tick.classList.add('tick-ora');
        tick.classList.add(isOraIntera ? 'tick-ora-major' : 'tick-ora-minor');

        tick.style.left = `${x}px`;
        tick.style.top = `${y}px`;
        tick.style.transformOrigin = 'top center';
        tick.style.transform = `rotate(${angoloDeg + 90}deg)`;

        container.appendChild(tick);
    }
}
// chiamata iniziale
disegnaGhiera();
disegnaOre();
disegnaTickOre();

// aggiorna alla resize
window.addEventListener('resize', () => {
    disegnaGhiera();
    disegnaOre();
    disegnaTickOre();
});


let zoomAttivo = false;

document.getElementById("btn-zoom").addEventListener("click", () => {
    zoomAttivo = !zoomAttivo;
    const container = document.getElementById("container-centrale");

    if (zoomAttivo) {
        const isPortrait = window.matchMedia("(orientation: portrait)").matches;

        if (isPortrait) {
            // Se è verticale, ruota di 90°, scala e trasla per centrare
            container.style.transform = "scale(1.65) translate(0, 6%)";
            container.style.transformOrigin = "center center";
        } else {
            // Se è orizzontale, solo scala e trasla normalmente
            container.style.transform = "scale(1.5) translateY(-13%)";
            container.style.transformOrigin = "center center";
        }
    } else {
        // Disabilita zoom e rotazione
        container.style.transform = "scale(1) rotate(0deg)";
        container.style.transformOrigin = "center center";
    }
});


const rotable = document.getElementById('rotable');

let isDragging = false;
let lastAngle = 0;
let startAngle = 0;

function getAngle(x, y, centerX, centerY) {
    return Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
}

function onPointerDown(event) {
    event.preventDefault();
    isDragging = true;

    rotable.classList.remove("smooth-rotate");
    const rect = astrolabio.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let clientX, clientY;
    if (event.type.startsWith('touch')) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }

    startAngle = getAngle(clientX, clientY, centerX, centerY) - lastAngle;
}

function onPointerMove(event) {
    if (!isDragging) return;

    event.preventDefault();

    const rect = astrolabio.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let clientX, clientY;
    if (event.type.startsWith('touch')) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }

    const currentAngle = getAngle(clientX, clientY, centerX, centerY);
    let rotation = currentAngle - startAngle;
    lastAngle = rotation;

    rotable.style.transform = `rotate(${rotation}deg)`;

    // Aggiorna solo ora nel display senza cambiare il giorno
    aggiornaOraDaRotazione(rotation);
}


function onPointerUp() {
    isDragging = false;
}

astrolabio.addEventListener('mousedown', onPointerDown);
window.addEventListener('mousemove', onPointerMove);
window.addEventListener('mouseup', onPointerUp);

astrolabio.addEventListener('touchstart', onPointerDown);
window.addEventListener('touchmove', onPointerMove, { passive: false });
window.addEventListener('touchend', onPointerUp);
window.addEventListener('touchcancel', onPointerUp);


function calcolaGiornoDellAnno(data) {
    const mesi = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let giorno = data.getDate();       // giorno del mese
    let mese = data.getMonth();        // 0 = gennaio

    for (let i = 0; i < mese; i++) {
        giorno += mesi[i];
    }

    return giorno; // opzionale: da 0 a 364
}

document.getElementById("btn-ora-attuale").addEventListener("click", () => {
    const now = new Date();
    const giornoDellAnno = calcolaGiornoDellAnno(now);

    // Calcola gradi ecc come prima
    const ore = now.getHours();
    const minuti = now.getMinutes();
    const secondi = now.getSeconds();
    const oraDecimale = ore + minuti / 60 + secondi / 3600;

    const gradiGiorno = (giornoDellAnno / 365) * 360;
    const gradiOra = (oraDecimale / 24) * 360;
    const angoloFinale = -gradiOra - gradiGiorno;

    rotable.classList.add("smooth-rotate");
    rotable.style.transform = `rotate(${angoloFinale}deg)`;

    // Aggiorna display e slider
    aggiornaDisplayESlider(now);
});



const sliderGiorni = document.getElementById("slider-giorni");
const sliderMinuti = document.getElementById("slider-minuti");
const display = document.getElementById("time-display");

const dataBase = new Date("2025-01-01T00:00:00"); // inizio anno

function aggiornaDataDaSlider() {
    const giorniOffset = parseInt(sliderGiorni.value);
    const minutiOffset = parseInt(sliderMinuti.value);

    const nuovaData = new Date(dataBase);
    nuovaData.setDate(nuovaData.getDate() + giorniOffset);
    nuovaData.setMinutes(minutiOffset);

    // formatta data e ora (es. 01 Giu 2025 - 14:35)
    const opzioni = { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" };
    display.textContent = nuovaData.toLocaleString("it-IT", opzioni).replace(",", " -");

    // Aggiorna rotazione
    aggiornaDisplayESlider(nuovaData);
    aggiornaRotazioneDaData(nuovaData);

}

function aggiornaRotazioneDaData(data) {
    const inizioAnno = new Date(data.getFullYear(), 0, 1);
    const giornoAnno = Math.floor((data - inizioAnno) / (1000 * 60 * 60 * 24));
    const oraDecimale = data.getHours() + data.getMinutes() / 60 + data.getSeconds() / 3600;

    const gradiGiorno = (giornoAnno / 365) * 360;
    const gradiOra = (oraDecimale / 24) * 360;
    const angolo = -gradiOra - gradiGiorno;

    rotable.classList.add("smooth-rotate");
    rotable.style.transform = `rotate(${angolo}deg)`;
}

// Eventi slider
sliderGiorni.addEventListener("input", aggiornaDataDaSlider);
sliderMinuti.addEventListener("input", aggiornaDataDaSlider);

// inizializza
aggiornaDataDaSlider();

function aggiornaDisplayESlider(data) {
    // Aggiorna il display del testo
    const opzioni = { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" };
    display.textContent = data.toLocaleString("it-IT", opzioni).replace(",", " -");

    // Calcola giorni dall'inizio anno
    const inizioAnno = new Date(data.getFullYear(), 0, 1);
    const giorniOffset = Math.floor((data - inizioAnno) / (1000 * 60 * 60 * 24));

    // Calcola minuti dall'inizio della giornata
    const minutiOffset = data.getHours() * 60 + data.getMinutes();

    // Aggiorna slider senza triggerare l’evento (opzionale)
    sliderGiorni.value = giorniOffset;
    sliderMinuti.value = minutiOffset;
}

function aggiornaOraDaRotazione(rotationDeg) {
    // rotationDeg = - (gradiGiorno + gradiOra)
    // quindi: gradiOra = -rotationDeg - gradiGiorno

    // prendi il giorno corrente dai slider
    const giorniOffset = parseInt(sliderGiorni.value);

    // Calcola i gradiGiorno
    const gradiGiorno = (giorniOffset / 365) * 360;

    // Calcola gradiOra dal rotation
    let gradiOra = -rotationDeg - gradiGiorno;

    // normalizza in [0, 360)
    gradiOra = ((gradiOra % 360) + 360) % 360;

    // ora decimale da gradiOra
    const oraDecimale = (gradiOra / 360) * 24;

    const ore = Math.floor(oraDecimale);
    const minuti = Math.floor((oraDecimale - ore) * 60);

    // Calcola nuova data basandoti sulla data base + giorniOffset e ora calcolata
    const nuovaData = new Date(dataBase);
    nuovaData.setDate(nuovaData.getDate() + giorniOffset);
    nuovaData.setHours(ore, minuti);
    // aggiorna slider dei minuti (ore * 60 + minuti)
    sliderMinuti.value = ore * 60 + minuti;

    // aggiorna display
    const opzioni = { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" };
    display.textContent = nuovaData.toLocaleString("it-IT", opzioni).replace(",", " -");
}

const now = new Date();
sliderGiorni.value = calcolaGiornoDellAnno(now) - 1; // perché lo slider probabilmente parte da 0
sliderMinuti.value = now.getHours() * 60 + now.getMinutes();
aggiornaDataDaSlider();

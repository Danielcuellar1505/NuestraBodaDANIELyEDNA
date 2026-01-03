const urlParams = new URLSearchParams(window.location.search);
const invitadoId = urlParams.get('q'); 
let nombreDB = "INVITADO ESPECIAL";
let pasesDB = 0;

if (invitadoId) {
    const docRef = window.db.collection("invitados").doc(invitadoId);

    docRef.get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            nombreDB = data.nombre.toUpperCase();
            pasesDB = data.pases;
            const container = document.getElementById('pasesContainer');
            const greeting = document.getElementById('guestGreeting');
            const count = document.getElementById('passCount');

            if (container) {
                container.classList.remove('hidden');
                greeting.innerText = nombreDB;
                count.innerText = pasesDB;
            }
        } else {
            console.error("No se encontró el Document ID.");
        }
    }).catch((error) => {
        console.error("Error al obtener datos:", error);
    });
}
// --- 1) Contador con Corazones ---
const weddingDate = new Date("May 15, 2026 18:00:00").getTime();
const secondsSpan = document.getElementById("seconds");

const spawnHeart = () => {
    const heart = document.createElement("div");
    heart.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#bc6c25" stroke="none"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
    heart.className = "heart-particle";
    const rect = secondsSpan.getBoundingClientRect();
    heart.style.left = `${rect.left + (Math.random() * rect.width)}px`;
    heart.style.top = `${window.scrollY + rect.top}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
};

let lastS = -1;
const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    if (distance < 0) return;
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("days").innerText = d.toString().padStart(2, '0');
    document.getElementById("hours").innerText = h.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = m.toString().padStart(2, '0');
    secondsSpan.innerText = s.toString().padStart(2, '0');
    if (s !== lastS) { spawnHeart(); lastS = s; }
};
setInterval(updateCountdown, 1000);
updateCountdown();

// --- 2) Carrusel ---
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}
setInterval(() => changeSlide(1), 5000);

// --- 3) Música ---
const music = document.getElementById('weddingMusic');
const musicToggle = document.getElementById('musicToggle');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
musicToggle.addEventListener('click', () => {
    if (music.paused) { music.play(); playIcon.classList.add('hidden'); pauseIcon.classList.remove('hidden'); }
    else { music.pause(); playIcon.classList.remove('hidden'); pauseIcon.classList.add('hidden'); }
});

// --- 4) RSVP Form ---
const rsvpForm = document.getElementById('rsvpForm');
const guestMessageInput = document.getElementById('guestMessage');
const instructionText = document.getElementById('instructionText');
const statusMessage = document.getElementById('statusMessage');

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const messageValue = guestMessageInput.value.trim();
    const phoneNumber = "59171147221";

    guestMessageInput.classList.remove('border-error');
    instructionText.classList.remove('text-error');

    if (messageValue.length < 10) {
        guestMessageInput.classList.add('border-error');
        instructionText.innerText = "¡Atención! El mensaje es muy corto (mínimo 10 letras).";
        instructionText.classList.add('text-error');
        return;
    }

    const confirmationText = "¡Confirmo mi asistencia!";
    
    const destInfo = `*Para:* ${nombreDB}%0A`;
    const pasesInfo = pasesDB > 0 ? `*Cupos:* ${pasesDB}%0A` : "";
    
    const finalMessage = `*CONFIRMACIÓN DE ASISTENCIA*%0A${destInfo}${pasesInfo}%0A${messageValue}%0A%0A${confirmationText}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${finalMessage}`;

    rsvpForm.style.display = 'none';
    instructionText.style.display = 'none';
    statusMessage.innerText = "¡Gracias! Redirigiendo a WhatsApp...";
    statusMessage.classList.remove('hidden');
    statusMessage.classList.add('bg-[#fdfaf7]', 'text-[#bc6c25]', 'border-[#f3ece4]');

    setTimeout(() => { 
        window.open(whatsappUrl, '_blank'); 
    }, 1500);
});

guestMessageInput.addEventListener('input', () => {
    guestMessageInput.classList.remove('border-error');
    instructionText.classList.remove('text-error');
    instructionText.innerText = "Por favor, completa este campo para habilitar el envío de tu confirmación.";
});
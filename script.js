// --- Lógica de Pases Personalizados (n = nombre, p = pases) ---
const urlParams = new URLSearchParams(window.location.search);
const guestNameParam = urlParams.get('n'); // Ejemplo: n=Juanito%20y%20Familia
const passCountParam = urlParams.get('p'); // Ejemplo: p=4

if (guestNameParam || passCountParam) {
    const container = document.getElementById('pasesContainer');
    const greeting = document.getElementById('guestGreeting');
    const count = document.getElementById('passCount');

    if (container) {
        container.classList.remove('hidden');
        // Convertimos a mayúsculas para mantener el estilo formal solicitado (PARA: JUANITO...)
        if (guestNameParam) greeting.innerText = guestNameParam.toUpperCase();
        if (passCountParam) count.innerText = passCountParam;
    }
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

// --- 4) RSVP Form Simplificado (Solo Mensaje) ---
const rsvpForm = document.getElementById('rsvpForm');
const guestMessageInput = document.getElementById('guestMessage');
const instructionText = document.getElementById('instructionText');
const statusMessage = document.getElementById('statusMessage');

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const messageValue = guestMessageInput.value.trim();
    const phoneNumber = "59171147221";

    // Reiniciar estilos de error
    guestMessageInput.classList.remove('border-error');
    instructionText.classList.remove('text-error');

    // Validación: Solo el mensaje es obligatorio ahora (mínimo 10 caracteres)
    if (messageValue.length < 10) {
        guestMessageInput.classList.add('border-error');
        instructionText.innerText = "¡Atención! El mensaje es muy corto (mínimo 10 letras).";
        instructionText.classList.add('text-error');
        return;
    }

    // Configuración del mensaje formal para WhatsApp
    const confirmationText = "¡Confirmo mi asistencia!";
    
    // Si no hay nombre en la URL por error, usamos "Invitado Especial"
    const destName = guestNameParam ? guestNameParam.toUpperCase() : "INVITADO ESPECIAL";
    const destInfo = `*Para:* ${destName}%0A`;
    const pasesInfo = passCountParam ? `*Cupos:* ${passCountParam}%0A` : "";
    
    // Formato final profesional
    const finalMessage = `*CONFIRMACIÓN DE ASISTENCIA*%0A${destInfo}${pasesInfo}%0A${messageValue}%0A%0A${confirmationText}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${finalMessage}`;

    // Interfaz de éxito
    rsvpForm.style.display = 'none';
    instructionText.style.display = 'none';
    statusMessage.innerText = "¡Gracias! Redirigiendo a WhatsApp...";
    statusMessage.classList.remove('hidden');
    statusMessage.classList.add('bg-[#fdfaf7]', 'text-[#bc6c25]', 'border-[#f3ece4]');

    setTimeout(() => { 
        window.open(whatsappUrl, '_blank'); 
    }, 1500);
});

// Limpiar error al escribir
guestMessageInput.addEventListener('input', () => {
    guestMessageInput.classList.remove('border-error');
    instructionText.classList.remove('text-error');
    instructionText.innerText = "Por favor, completa este campo para habilitar el envío de tu confirmación.";
});
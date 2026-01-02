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

// --- 4) RSVP Form con Validación Visual y WhatsApp ---
const rsvpForm = document.getElementById('rsvpForm');
const guestName = document.getElementById('guestName');
const guestMessage = document.getElementById('guestMessage');
const instructionText = document.getElementById('instructionText');
const statusMessage = document.getElementById('statusMessage');

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let hasError = false;
    const nameValue = guestName.value.trim();
    const messageValue = guestMessage.value.trim();
    const phoneNumber = "59171147221";

    // Reiniciar estilos
    guestName.classList.remove('border-error');
    guestMessage.classList.remove('border-error');
    instructionText.classList.remove('text-error');

    // Validación de Nombre
    if (nameValue === "") {
        guestName.classList.add('border-error');
        hasError = true;
    }

    // Validación de Mensaje (Mínimo 10 caracteres)
    if (messageValue.length < 10) {
        guestMessage.classList.add('border-error');
        hasError = true;
    }

    if (hasError) {
        instructionText.innerText = "¡Atención! Revisa los campos marcados en rojo.";
        instructionText.classList.add('text-error');
        return;
    }

    // Si todo está bien, procedemos al envío
    const confirmationText = "¡Confirmo mi asistencia!";
    const finalMessage = `*${nameValue}*%0A%0A${messageValue}%0A%0A${confirmationText}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${finalMessage}`;

    // Estilo visual de éxito antes de redirigir
    rsvpForm.style.display = 'none';
    instructionText.style.display = 'none';
    
    statusMessage.innerText = "¡Gracias! Tu información es correcta. Redirigiendo a WhatsApp...";
    statusMessage.classList.remove('hidden');
    statusMessage.classList.add('bg-[#fdfaf7]', 'text-[#bc6c25]', 'border-[#f3ece4]');

    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 1500);
});

// Opcional: Quitar el error mientras el usuario escribe
[guestName, guestMessage].forEach(input => {
    input.addEventListener('input', () => {
        input.classList.remove('border-error');
        instructionText.classList.remove('text-error');
        instructionText.innerText = "Por favor, completa estos dos campos para habilitar el envío de tu confirmación.";
    });
});
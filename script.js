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

// --- 4) RSVP Form con Redirección Completa ---
const rsvpForm = document.getElementById('rsvpForm');
const successMessage = document.getElementById('successMessage');

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('guestName').value.trim();
    const message = document.getElementById('guestMessage').value.trim();
    const phoneNumber = "59171147221";

    if(name === "" || message === "") return alert("Por favor, completa todos los campos.");
    if(message.length < 10) return alert("El mensaje debe tener al menos 10 caracteres.");

    // Formateo del mensaje final
    const confirmationText = "¡Confirmo mi asistencia!";
    // %0A es el salto de línea en URLs
    const finalMessage = `*${name}*%0A%0A${message}%0A%0A${confirmationText}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${finalMessage}`;

    rsvpForm.style.display = 'none';
    successMessage.classList.remove('hidden');
    setTimeout(() => { window.open(whatsappUrl, '_blank'); }, 1500);
});
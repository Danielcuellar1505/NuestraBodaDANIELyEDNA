// --- 4) Contador con Segundos ---
const weddingDate = new Date("May 15, 2026 18:00:00").getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        clearInterval(timer);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
};

const timer = setInterval(updateCountdown, 1000);
updateCountdown();

// --- 12) Carrusel "Nosotros" ---
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');

function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(() => changeSlide(1), 5000);

// --- 1) Control de Música ---
const music = document.getElementById('weddingMusic');
const musicToggle = document.getElementById('musicToggle');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

musicToggle.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    } else {
        music.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    }
});

// --- 11) RSVP Form ---
const rsvpForm = document.getElementById('rsvpForm');
const successMessage = document.getElementById('successMessage');

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    rsvpForm.classList.add('hidden');
    successMessage.classList.remove('hidden');
});
document.addEventListener('DOMContentLoaded', () => {
    // --- Manual Slider Control ---
    const slides = document.querySelectorAll('.slide-item');
    const dots = document.querySelectorAll('.dot-btn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;

    function updateSlide(index) {
        if (!slides.length) return;

        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.remove('opacity-0', 'pointer-events-none');
                slide.classList.add('opacity-100', 'pointer-events-auto');
                slide.style.zIndex = '10';
            } else {
                slide.classList.remove('opacity-100', 'pointer-events-auto');
                slide.classList.add('opacity-0', 'pointer-events-none');
                slide.style.zIndex = '0';
            }
        });

        dots.forEach((dot, i) => {
            if (i === index) {
                dot.className = 'dot-btn w-6 h-3 rounded-full bg-emerald-500 transition-all';
            } else {
                dot.className = 'dot-btn w-3 h-3 rounded-full bg-neutral-700 hover:bg-neutral-500 transition-all';
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlide(currentIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlide(currentIndex);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = index;
            updateSlide(currentIndex);
        });
    });

    updateSlide(0);
});

// --- Background Speed Lines Canvas ---
const canvas = document.getElementById('speedCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const numParticles = 70;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: Math.random() * 80 + 20,
                speed: Math.random() * 8 + 4,
                opacity: Math.random() * 0.35 + 0.1
            });
        }
    }

    function drawSpeedLines() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - p.length, p.y + (p.length * 0.2));
            ctx.strokeStyle = `rgba(16, 185, 129, ${p.opacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            p.x += p.speed;
            p.y -= p.speed * 0.2;

            if (p.x > canvas.width + p.length || p.y < -p.length) {
                p.x = -p.length;
                p.y = Math.random() * canvas.height;
            }
        });
        requestAnimationFrame(drawSpeedLines);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    resizeCanvas();
    initParticles();
    drawSpeedLines();
}
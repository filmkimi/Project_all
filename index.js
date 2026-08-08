document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Sound Effect Control (ระบบเล่นเสียงคลิก)
    // ==========================================
    const clickSound = new Audio('sound_bigbike.MP3');
    clickSound.volume = 0.5; 

  
    document.addEventListener('click', (e) => {
      
        if (e.target.closest('.sound-btn')) {
            console.log('🔊 ปุ่ม sound-btn ถูกกดแล้ว!');
            
            clickSound.currentTime = 0; 
            
            const playPromise = clickSound.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.log('เล่นเสียงไม่ได้เพราะ:', err);
                });
            }
        }
    });
    const customCursor = document.getElementById('custom-cursor');

    document.addEventListener('mousemove', (e) => {
    if (customCursor) {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    }
});
    // ==========================================
    // 2. Mobile Hamburger Menu Control
    // ==========================================
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // ==========================================
    // 3. Manual & Auto Slider Control
    // ==========================================
    const slides = document.querySelectorAll('.slide-item');
    const dots = document.querySelectorAll('.dot-btn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselContainer = document.getElementById('carouselContainer');
    
    let currentIndex = 0;
    let autoSlideTimer = null;
    const slideInterval = 4000; // 4 วินาที

    function updateSlide(index) {
        if (!slides.length) return;

        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.remove('opacity-0', 'pointer-events-none');
                slide.classList.add('opacity-100', 'pointer-events-auto');
                slide.style.zIndex = '10';
            } else {
                slide.classList.remove('opacity-100', 'pointer-events-auto');
                slide.style.zIndex = '0';
                slide.classList.add('opacity-0', 'pointer-events-none');
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

    function nextSlide() {
        if (!slides.length) return;
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide(currentIndex);
    }

    function prevSlide() {
        if (!slides.length) return;
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide(currentIndex);
    }

    function startAutoSlide() {
        stopAutoSlide();
        if (slides.length > 0) {
            autoSlideTimer = setInterval(nextSlide, slideInterval);
        }
    }

    function stopAutoSlide() {
        if (autoSlideTimer) {
            clearInterval(autoSlideTimer);
            autoSlideTimer = null;
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
            startAutoSlide();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = index;
            updateSlide(currentIndex);
            startAutoSlide();
        });
    });

    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }

    updateSlide(0);
    startAutoSlide();

    // ==========================================
    // 4. Scroll Reveal Animation
    // ==========================================
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.15
        });

        reveals.forEach((el) => observer.observe(el));
    }
});

// ==========================================
// 5. Background Speed Lines Canvas
// ==========================================
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
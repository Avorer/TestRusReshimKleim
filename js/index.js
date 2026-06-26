/* ============================================
   NEON TOUGE RACING / CYBER JDM STYLE
   Режем Клеим Studio
   JavaScript Functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initActiveSection();
    initAnimations();
    initHeaderScroll();
});

/* === МОБИЛЬНОЕ МЕНЮ === */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!menuBtn || !mobileMenu) return;
    
    menuBtn.addEventListener('click', () => {
        const isActive = mobileMenu.classList.toggle('active');
        menuBtn.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && 
            !menuBtn.contains(e.target) && 
            mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* === ПЛАВНЫЙ СКРОЛЛ === */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* === АКТИВНАЯ СЕКЦИЯ === */
function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.target === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

/* === АНИМАЦИИ ПРИ СКРОЛЛЕ === */
function initAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .marketplace-card, .contact-item, .about-card, .feature'
    );
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

/* === ЭФФЕКТ ШАПКИ ПРИ СКРОЛЛЕ === */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.style.background = 'rgba(8, 8, 8, 0.95)';
            header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.background = 'rgba(8, 8, 8, 0.85)';
            header.style.boxShadow = 'none';
        }
    });
}

/* === PARALLAX ЭФФЕКТ === */
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 1024) return;
    
    const glows = document.querySelectorAll('.neon-glow');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    glows.forEach((glow, index) => {
        const speed = (index + 1) * 15;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        
        glow.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

/* === ОБРАБОТКА ОШИБОК ИЗОБРАЖЕНИЙ === */
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Изображение не загружено:', this.src);
        });
    });
});

/* === TOUCH FEEDBACK === */
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function handler(e) {
        const target = e.target.closest('a, button');
        if (target) {
            target.style.transform = 'scale(0.97)';
            setTimeout(() => {
                if (target) target.style.transform = '';
            }, 100);
        }
    }, { passive: true });
}

console.log('%c🏎️ РЕЖЕМ КЛЕИМ STUDIO', 'font-size: 24px; font-weight: bold; color: #FF3FA4; text-shadow: 0 0 10px rgba(255, 63, 164, 0.8);');
console.log('%cCyber JDM / Neon Touge Style', 'font-size: 14px; color: #00C8FF;');
console.log('%cСайт загружен успешно! ✨', 'font-size: 12px; color: #6A35FF;');
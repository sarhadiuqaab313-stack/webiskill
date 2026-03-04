// Custom Cursor with Sparks
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
let lastSparkTime = 0;

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Move original circular cursor
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: 'forwards' });

    // Throttle spark creation
    const now = Date.now();
    if (now - lastSparkTime > 20) {
        lastSparkTime = now;
        createSpark(posX, posY);
    }
});

// Cursor Hover Effects on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .hover-lift, .portfolio-card');

interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(236, 72, 153, 0.1)';
        cursorOutline.style.borderColor = 'transparent';
    });

    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.borderColor = 'var(--secondary)';
    });
});

function createSpark(x, y) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    document.body.appendChild(spark);

    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;

    const size = Math.random() * 6 + 2;
    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;

    const colors = ['#6366f1', '#ec4899', '#14b8a6', '#ffffff', '#fbbf24'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    spark.style.backgroundColor = color;
    spark.style.boxShadow = `0 0 ${size * 2}px ${color}`;

    // Random movement direction
    const tx = (Math.random() - 0.5) * 80;
    const ty = (Math.random() - 0.5) * 80 + 20; // Bias downwards slightly

    spark.style.setProperty('--tx', `${tx}px`);
    spark.style.setProperty('--ty', `${ty}px`);

    setTimeout(() => {
        spark.remove();
    }, 600);
}

// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Navbar Scrolled Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll('.fade-in-up');
animateElements.forEach((el) => observer.observe(el));

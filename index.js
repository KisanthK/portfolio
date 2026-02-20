document.addEventListener('DOMContentLoaded', () => {
    const glow = document.querySelector('.cursor-glow');
    const heroImage = document.querySelector('.image-card');

    // 1. Mouse Follow Glow (Slightly more responsive)
    document.addEventListener('mousemove', (e) => {
        glow.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 500, fill: "forwards" });

        // 2. Profile Tilt effect
        if (heroImage) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
            heroImage.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });

    // 3. Reveal animations for content
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.bento-item, .skill-item, .about-text h2').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";
        observer.observe(el);
    });
});

// Adding visibility class via JS to keep CSS clean
const style = document.createElement('style');
style.textContent = `
    .is-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
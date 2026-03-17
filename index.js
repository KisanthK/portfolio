document.addEventListener('DOMContentLoaded', () => {
    const glow = document.querySelector('.cursor-glow');
    const heroImage = document.querySelector('.image-card');

    document.addEventListener('mousemove', (e) => {
        // ✅ Guard against null before calling .animate()
        if (glow) {
            glow.animate({
                left: `${e.clientX}px`,
                top: `${e.clientY}px`
            }, { duration: 500, fill: "forwards" });
        }

        if (heroImage) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
            heroImage.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });

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

const style = document.createElement('style');
style.textContent = `.is-visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

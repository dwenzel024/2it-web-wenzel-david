document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.transform = 'translateY(-100%)';
        initAnimations();
    }, 1500);

    function initAnimations() {
        // Hero
        const tl = gsap.timeline();
        tl.to('.hero-title', { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' })
            .to('.subtitle', { opacity: 1, duration: 1 }, '-=1')
            .to('.scroll-indicator', { opacity: 1, duration: 1 }, '-=0.5');

        // Navbar BG
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            const scrolled = window.scrollY > 50;
            nav.style.background = scrolled ? 'rgba(0,0,0,0.95)' : 'transparent';
            nav.style.padding = scrolled ? '1rem 4rem' : '2rem 4rem';
        });

        // Helper for simple scroll animations
        const fadeUp = (selector, delay = 0) => {
            gsap.utils.toArray(selector).forEach(el => {
                gsap.from(el, {
                    scrollTrigger: { trigger: el, start: "top 80%" },
                    y: 50, opacity: 0, duration: 1, delay: delay
                });
            });
        };

        // Trigger animations
        fadeUp('.section-title');

        // Staggered Grids
        const staggerAnim = (selector, trigger) => {
            gsap.from(selector, {
                scrollTrigger: { trigger: trigger, start: "top 75%" },
                y: 30, opacity: 0, duration: 0.8, stagger: 0.2
            });
        };

        staggerAnim('.bio-card', '.bio-grid');
        staggerAnim('.work-card', '.works-grid');

        // Bio Image
        gsap.from('.bio-img-container', {
            scrollTrigger: { trigger: '.bio-grid', start: "top 70%" },
            scale: 0.9, opacity: 0, duration: 1.2, delay: 0.2
        });

        // Timeline
        gsap.utils.toArray('.t-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: { trigger: item, start: "top 85%" },
                x: i % 2 === 0 ? -30 : 30, opacity: 0, duration: 1
            });
        });

        // Parallax
        gsap.to('.quote-parallax', {
            scrollTrigger: { trigger: '.quote-parallax', start: "top bottom", scrub: true },
            backgroundPosition: "50% 100%", ease: "none"
        });
    }
});

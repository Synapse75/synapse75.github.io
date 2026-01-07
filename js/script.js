document.addEventListener('DOMContentLoaded', () => {
    // Typing Effect
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const rawText = typingElement.getAttribute('data-text');
        // Parse format "[text], [more text]"
        const words = rawText.match(/\[(.*?)\]/g).map(match => match.replace('[', '').replace(']', ''));

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        if (words.length > 0) type();
    }

    // Scroll Reveal Animation (Targeting the scroll container)
    const observerOptions = {
        root: document.querySelector('.scroll-container'), // Important for scroll snap
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                entry.target.classList.remove('hidden');
                // Don't unobserve if we want them to re-animate or just stay visible. 
                // Unobserving is fine for a one-time reveal.
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

    // Active Nav Link (Spying on the scroll container)
    const scrollContainer = document.querySelector('.scroll-container');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                // Since sections are inside the scroll container, we rely on their offset relative to the container usually
                // But offsetTop gives distance from offsetParent (start of container) so this works.
                if (scrollContainer.scrollTop >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }
});

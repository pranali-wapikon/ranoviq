/**
 * IT Services - Single Page Website
 * Optimized with smooth scroll, scroll reveal, form validation
 * @version 1.0
 */

document.addEventListener('DOMContentLoaded', () => {
    // ========== Mobile Navigation ==========
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ========== Smooth Scroll (anchor links) ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== Navbar - Background change on scroll ==========
    const header = document.querySelector('.header');
    if (header) {
        const scrollThreshold = 50;

        function updateNavbar() {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', updateNavbar);
        updateNavbar(); // Initial check
    }

    // ========== Scroll Reveal Animations ==========
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (revealElements.length && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        revealElements.forEach((el) => el.classList.add('revealed'));
    }

    // ========== Process Timeline (staggered reveal) ==========
    const processSection = document.querySelector('#process');
    if (processSection && 'IntersectionObserver' in window) {
        const processObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const steps = entry.target.querySelectorAll('.process-step');
                    steps.forEach((step, index) => {
                        setTimeout(() => step.classList.add('visible'), index * 120);
                    });
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

        processObserver.observe(processSection);
    } else {
        document.querySelectorAll('.process-step').forEach(step => step.classList.add('visible'));
    }

    // ========== Testimonials Slider ==========
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');

    if (testimonialsTrack && testimonialCards.length) {
        let currentIndex = 0;
        const totalSlides = testimonialCards.length;

        function goToSlide(index) {
            currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;
            testimonialsTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        let autoSlideInterval = setInterval(nextSlide, 4000);

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 4000);
        }

        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
    }

    // ========== Back to Top Button ==========
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        const showThreshold = 400;

        function toggleBackToTop() {
            if (window.scrollY > showThreshold) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', toggleBackToTop);
        toggleBackToTop();

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========== Contact Form Validation ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const phoneInput = document.getElementById('contactPhone');
        const messageInput = document.getElementById('contactMessage');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const phoneError = document.getElementById('phoneError');
        const messageError = document.getElementById('messageError');

        function showError(input, errorEl, message) {
            input.classList.add('error');
            errorEl.textContent = message;
        }

        function clearError(input, errorEl) {
            input.classList.remove('error');
            errorEl.textContent = '';
        }

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function validateForm() {
            let isValid = true;

            if (!nameInput.value.trim()) {
                showError(nameInput, nameError, 'Name is required');
                isValid = false;
            } else {
                clearError(nameInput, nameError);
            }

            if (!emailInput.value.trim()) {
                showError(emailInput, emailError, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, emailError, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(emailInput, emailError);
            }

            if (!phoneInput.value.trim()) {
                showError(phoneInput, phoneError, 'Phone is required');
                isValid = false;
            } else {
                clearError(phoneInput, phoneError);
            }

            if (!messageInput.value.trim()) {
                showError(messageInput, messageError, 'Message is required');
                isValid = false;
            } else {
                clearError(messageInput, messageError);
            }

            return isValid;
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (validateForm()) {
                alert('Thank you! Your message has been sent successfully. We will get back to you soon.');
                contactForm.reset();
                [nameInput, emailInput, phoneInput, messageInput].forEach(input => input.classList.remove('error'));
                [nameError, emailError, phoneError, messageError].forEach(el => el.textContent = '');
            }
        });

        const errorMap = {
            contactName: nameError,
            contactEmail: emailError,
            contactPhone: phoneError,
            contactMessage: messageError
        };

        [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
            input.addEventListener('input', () => {
                if (input.classList.contains('error') && errorMap[input.id]) {
                    clearError(input, errorMap[input.id]);
                }
            });
        });
    }
});

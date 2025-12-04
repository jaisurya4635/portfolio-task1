// ===================================
// MAIN JAVASCRIPT FILE
// Portfolio Website Functionality
// ===================================

(function () {
    'use strict';

    // ===================================
    // SMOOTH SCROLLING
    // ===================================

    /**
     * Enables smooth scrolling for all anchor links
     * Adds offset for fixed navbar
     */
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Skip if href is just "#"
                if (href === '#') return;

                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();

                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            });
        });
    }

    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================

    /**
     * Adds/removes 'scrolled' class to navbar on scroll
     * Updates active nav link based on scroll position
     */
    function initNavbarScroll() {
        const navbar = document.getElementById('mainNav');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        function updateNavbar() {
            // Add scrolled class
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update active link
            let current = '';
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        // Throttle scroll event for performance
        let ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    updateNavbar();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial call
        updateNavbar();
    }

    // ===================================
    // FORM VALIDATION
    // ===================================

    /**
     * Validates contact form with custom rules
     * Shows inline error messages
     * Displays success alert on valid submission
     */
    function initFormValidation() {
        const form = document.getElementById('contactForm');
        const successAlert = document.getElementById('successAlert');

        // Validation rules
        const validationRules = {
            name: {
                required: true,
                minLength: 2,
                message: 'Name must be at least 2 characters long'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            message: {
                required: true,
                minLength: 15,
                message: 'Message must be at least 15 characters long'
            }
        };

        /**
         * Validates a single field
         * @param {HTMLElement} field - Input field to validate
         * @returns {boolean} - Whether field is valid
         */
        function validateField(field) {
            const fieldName = field.name;
            const value = field.value.trim();
            const rules = validationRules[fieldName];

            // Skip if no rules for this field
            if (!rules) return true;

            let isValid = true;
            let errorMessage = '';

            // Required validation
            if (rules.required && !value) {
                isValid = false;
                errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
            }
            // Min length validation
            else if (rules.minLength && value.length < rules.minLength) {
                isValid = false;
                errorMessage = rules.message;
            }
            // Pattern validation (for email)
            else if (rules.pattern && !rules.pattern.test(value)) {
                isValid = false;
                errorMessage = rules.message;
            }

            // Update UI
            const feedback = field.nextElementSibling;
            if (isValid) {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
                if (feedback && feedback.classList.contains('invalid-feedback')) {
                    feedback.textContent = '';
                }
            } else {
                field.classList.remove('is-valid');
                field.classList.add('is-invalid');
                if (feedback && feedback.classList.contains('invalid-feedback')) {
                    feedback.textContent = errorMessage;
                }
            }

            return isValid;
        }

        /**
         * Sanitizes user input to prevent XSS
         * @param {string} str - String to sanitize
         * @returns {string} - Sanitized string
         */
        function sanitizeInput(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }

        // Real-time validation on blur
        const formFields = form.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('blur', function () {
                validateField(this);
            });

            // Clear validation on input
            field.addEventListener('input', function () {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });

        // Form submission
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Hide previous success message
            successAlert.classList.add('d-none');

            // Validate all fields
            let isFormValid = true;
            formFields.forEach(field => {
                if (!validateField(field)) {
                    isFormValid = false;
                }
            });

            // If form is valid, process submission
            if (isFormValid) {
                // Collect and sanitize form data
                const formData = {
                    name: sanitizeInput(document.getElementById('name').value.trim()),
                    email: sanitizeInput(document.getElementById('email').value.trim()),
                    subject: sanitizeInput(document.getElementById('subject').value.trim()),
                    message: sanitizeInput(document.getElementById('message').value.trim())
                };

                // Log form data (in production, send to server)
                console.log('Form submitted with data:', formData);

                // Show success message
                successAlert.classList.remove('d-none');

                // Reset form
                form.reset();
                formFields.forEach(field => {
                    field.classList.remove('is-valid', 'is-invalid');
                });

                // Scroll to success message
                successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successAlert.classList.add('d-none');
                }, 5000);

                // In production, you would send data to server:
                /*
                fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    successAlert.classList.remove('d-none');
                    form.reset();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                });
                */
            } else {
                // Scroll to first invalid field
                const firstInvalid = form.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstInvalid.focus();
                }
            }
        });
    }

    // ===================================
    // DARK MODE TOGGLE
    // ===================================

    /**
     * Toggles dark mode and saves preference to localStorage
     */
    function initDarkMode() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const body = document.body;
        const icon = darkModeToggle.querySelector('i');

        // Check for saved preference
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'enabled') {
            body.classList.add('dark-mode');
            icon.classList.remove('bi-moon-stars');
            icon.classList.add('bi-sun');
        }

        // Toggle dark mode
        darkModeToggle.addEventListener('click', function () {
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                icon.classList.remove('bi-moon-stars');
                icon.classList.add('bi-sun');
            } else {
                localStorage.setItem('darkMode', 'disabled');
                icon.classList.remove('bi-sun');
                icon.classList.add('bi-moon-stars');
            }
        });
    }

    // ===================================
    // SCROLL ANIMATIONS
    // ===================================

    /**
     * Animates elements on scroll using Intersection Observer
     */
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';

                    // Animate progress bars
                    if (entry.target.classList.contains('progress')) {
                        const progressBar = entry.target.querySelector('.progress-bar');
                        if (progressBar) {
                            const width = progressBar.style.width;
                            progressBar.style.width = '0';
                            setTimeout(() => {
                                progressBar.style.width = width;
                            }, 100);
                        }
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe cards and progress bars
        const animateElements = document.querySelectorAll('.card, .progress');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ===================================
    // PROJECT MODAL ENHANCEMENTS
    // ===================================

    /**
     * Adds keyboard accessibility to modals
     */
    function initModalEnhancements() {
        const modals = document.querySelectorAll('.modal');

        modals.forEach(modal => {
            modal.addEventListener('shown.bs.modal', function () {
                // Focus on close button when modal opens
                const closeButton = this.querySelector('.btn-close');
                if (closeButton) {
                    closeButton.focus();
                }
            });
        });
    }

    // ===================================
    // PERFORMANCE OPTIMIZATION
    // ===================================

    /**
     * Lazy load images for better performance
     */
    function initLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        } else {
            // Fallback for browsers that don't support lazy loading
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            document.body.appendChild(script);
        }
    }

    // ===================================
    // INITIALIZATION
    // ===================================

    /**
     * Initialize all functionality when DOM is ready
     */
    function init() {
        initSmoothScroll();
        initNavbarScroll();
        initFormValidation();
        initDarkMode();
        initScrollAnimations();
        initModalEnhancements();
        initLazyLoading();

        console.log('%c Portfolio Loaded Successfully! ', 'background: #667eea; color: white; padding: 5px 10px; border-radius: 3px;');
    }

    // Run initialization when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

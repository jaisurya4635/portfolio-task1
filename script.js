// ===================================
// NAVIGATION FUNCTIONALITY
// ===================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link highlighting on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===================================
// SMOOTH SCROLLING
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// FORM VALIDATION
// ===================================

const contactForm = document.getElementById('contact-form');
const formInputs = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    subject: document.getElementById('subject'),
    message: document.getElementById('message')
};

const formErrors = {
    name: document.getElementById('name-error'),
    email: document.getElementById('email-error'),
    subject: document.getElementById('subject-error'),
    message: document.getElementById('message-error')
};

const formSuccess = document.getElementById('form-success');

// Validation rules
const validationRules = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]+$/,
        messages: {
            required: 'Name is required',
            minLength: 'Name must be at least 2 characters',
            maxLength: 'Name must not exceed 50 characters',
            pattern: 'Name can only contain letters and spaces'
        }
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        messages: {
            required: 'Email is required',
            pattern: 'Please enter a valid email address'
        }
    },
    subject: {
        required: true,
        minLength: 3,
        maxLength: 100,
        messages: {
            required: 'Subject is required',
            minLength: 'Subject must be at least 3 characters',
            maxLength: 'Subject must not exceed 100 characters'
        }
    },
    message: {
        required: true,
        minLength: 10,
        maxLength: 1000,
        messages: {
            required: 'Message is required',
            minLength: 'Message must be at least 10 characters',
            maxLength: 'Message must not exceed 1000 characters'
        }
    }
};

// Validate single field
function validateField(fieldName, value) {
    const rules = validationRules[fieldName];
    const errors = [];

    // Required validation
    if (rules.required && !value.trim()) {
        errors.push(rules.messages.required);
        return errors;
    }

    // Skip other validations if field is empty and not required
    if (!value.trim()) {
        return errors;
    }

    // Min length validation
    if (rules.minLength && value.trim().length < rules.minLength) {
        errors.push(rules.messages.minLength);
    }

    // Max length validation
    if (rules.maxLength && value.trim().length > rules.maxLength) {
        errors.push(rules.messages.maxLength);
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value.trim())) {
        errors.push(rules.messages.pattern);
    }

    return errors;
}

// Display error message
function showError(fieldName, message) {
    const input = formInputs[fieldName];
    const errorElement = formErrors[fieldName];

    input.classList.add('error');
    errorElement.textContent = message;
}

// Clear error message
function clearError(fieldName) {
    const input = formInputs[fieldName];
    const errorElement = formErrors[fieldName];

    input.classList.remove('error');
    errorElement.textContent = '';
}

// Real-time validation on input
Object.keys(formInputs).forEach(fieldName => {
    const input = formInputs[fieldName];

    // Validate on blur
    input.addEventListener('blur', () => {
        const errors = validateField(fieldName, input.value);
        if (errors.length > 0) {
            showError(fieldName, errors[0]);
        } else {
            clearError(fieldName);
        }
    });

    // Clear error on input
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            const errors = validateField(fieldName, input.value);
            if (errors.length === 0) {
                clearError(fieldName);
            }
        }
    });
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Hide previous success message
    formSuccess.classList.remove('show');

    // Validate all fields
    let isValid = true;
    const formData = {};

    Object.keys(formInputs).forEach(fieldName => {
        const input = formInputs[fieldName];
        const value = input.value;
        const errors = validateField(fieldName, value);

        if (errors.length > 0) {
            showError(fieldName, errors[0]);
            isValid = false;
        } else {
            clearError(fieldName);
            formData[fieldName] = value.trim();
        }
    });

    // If form is valid, submit
    if (isValid) {
        // Simulate form submission
        console.log('Form submitted with data:', formData);

        // Show success message
        formSuccess.classList.add('show');

        // Reset form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);

        // In a real application, you would send the data to a server here
        // Example:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        //     formSuccess.classList.add('show');
        //     contactForm.reset();
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
    } else {
        // Scroll to first error
        const firstError = contactForm.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.skill-card, .project-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// SKILL BARS ANIMATION
// ===================================

const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ===================================
// PROJECT CARD INTERACTIONS
// ===================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ===================================
// COUNTER ANIMATION FOR STATS
// ===================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const targetValue = parseInt(element.textContent);
            animateCounter(element, targetValue);
            statsObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
window.addEventListener('scroll', debounce(highlightNavLink, 10));

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Keyboard navigation for project cards
projectCards.forEach(card => {
    const link = card.querySelector('.project-link');
    
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && link) {
            link.click();
        }
    });
});

// Focus trap for mobile menu
navToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navToggle.click();
    }
});

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c👋 Welcome to my Portfolio!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cLooking for a developer? Let\'s connect!', 'font-size: 14px; color: #b8c1ec;');
console.log('%c📧 hello@portfolio.com', 'font-size: 12px; color: #7c8db5;');

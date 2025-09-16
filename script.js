// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Initialize all portfolio functionality
function initializePortfolio() {
    createScrollIndicator();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeActiveNavigation();
    initializeTypingAnimation();
    initializeProjectCards();
    initializeCertificationCards();
    initializeContactForm();
    showLoadingAnimation();
}

// Create scroll progress indicator
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.width = scrolled + '%';
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Add staggered animation for children
                const children = entry.target.querySelectorAll('.timeline-item, .certification-card, .project-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('fade-in-up');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Add scroll animation to elements
    const animateElements = document.querySelectorAll(
        '.timeline-item, .certification-card, .project-card, .social-link, section'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active navigation highlighting
function initializeActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Typing animation for hero title
function initializeTypingAnimation() {
    const heroTitle = document.querySelector('#h11');
    if (heroTitle) {
        const originalHTML = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let index = 0;
        const speed = 100; // Typing speed in ms
        
        function typeText() {
            if (index < originalHTML.length) {
                heroTitle.innerHTML = originalHTML.substring(0, index + 1);
                index++;
                setTimeout(typeText, speed);
            }
        }
        
    }
}

// Project cards interactions
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });

        // Add click functionality to view buttons
        const viewButton = card.querySelector('.view-button');
        if (viewButton) {
            viewButton.addEventListener('click', () => {
                showNotification('Project details would open here!', 'info');
            });
        }
    });
}

// Certification cards interactions
function initializeCertificationCards() {
    const certCards = document.querySelectorAll('.certification-card');
    
    certCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't toggle if clicking on verify button
            if (!e.target.closest('.cert-verify-btn')) {
                card.classList.toggle('expanded');
                const badge = card.querySelector('.cert-badge');
                if (badge) {
                    badge.style.transform = card.classList.contains('expanded') 
                        ? 'rotate(180deg)' 
                        : 'rotate(0deg)';
                }
            }
        });
    });

    // Handle certification verification buttons
    const verifyBtns = document.querySelectorAll('.cert-verify-btn');
    verifyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const certTitle = btn.closest('.certification-card').querySelector('h3').textContent;
            showNotification(`Opening verification for ${certTitle}`, 'info');
        });
    });
}

// Contact form handling
function initializeContactForm() {
    // Since the current design uses social links, let's enhance those
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click tracking for contact buttons
    const contactButton = document.querySelector('.contact-me');
    const downloadButton = document.querySelector('.d-cv');
    
    if (contactButton) {
        contactButton.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            showNotification('CV download initiated!', 'success');
        });
    }
}

// Loading animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loader);
    
    // Hide loader after page loads - reduced time
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(loader)) {
                    document.body.removeChild(loader);
                }
            }, 300);
        }, 5); // Reduced from 1000ms to 500ms
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #6366f1, #4f46e5)';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
`;
document.head.appendChild(notificationStyles);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Skills section animation
function animateSkills() {
    const skillsSection = document.querySelector('#h2S').parentElement;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skills = entry.target.querySelectorAll('.social-link');
                skills.forEach((skill, index) => {
                    setTimeout(() => {
                        skill.style.animation = 'bounceIn 0.6s ease forwards';
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Add bounce animation
const bounceStyles = document.createElement('style');
bounceStyles.textContent = `
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3) translateY(50px);
        }
        50% {
            opacity: 1;
            transform: scale(1.1) translateY(-10px);
        }
        100% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
`;
document.head.appendChild(bounceStyles);

// Initialize skills animation
animateSkills();

// Timeline animation for education section
function initializeTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInLeft 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        observer.observe(item);
    });
}

// Add timeline animation styles
const timelineStyles = document.createElement('style');
timelineStyles.textContent = `
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(timelineStyles);

// Initialize timeline animation
initializeTimelineAnimation();

// Language selector functionality
const languageSelector = document.querySelector('#language');
if (languageSelector) {
    languageSelector.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        showNotification(`Language changed to ${selectedLang.toUpperCase()}`, 'info');
        // Here you would implement actual language switching logic
    });
}

// Mobile responsiveness enhancements
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Adjust animations for mobile
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => {
            el.style.transform = 'none';
        });
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Call on initial load

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or expanded cards
        const expandedCards = document.querySelectorAll('.certification-card.expanded');
        expandedCards.forEach(card => {
            card.classList.remove('expanded');
        });
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Your scroll handling code here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add focus states for accessibility
const focusableElements = document.querySelectorAll('a, button, [tabindex]');
focusableElements.forEach(el => {
    el.addEventListener('focus', () => {
        el.style.outline = '2px solid #c792ea';
        el.style.outlineOffset = '2px';
    });
    
    el.addEventListener('blur', () => {
        el.style.outline = 'none';
    });
});

// Console welcome message
console.log(`
🎨 Portfolio Website by Abdullah Ahmad
🚀 Built with modern web technologies
📧 Contact: abdullah.ahmad.engg@gmail.com
🌟 Thanks for visiting!
`);

// Error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You could send this to an error tracking service
});

// Service worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(registration => console.log('SW registered'))
        .catch(error => console.log('SW registration failed'));
}


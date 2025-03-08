// Mobile Menu Toggle with improved animation
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = mobileMenuBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            // Add slide-in animation
            const navItems = nav.querySelectorAll('li');
            navItems.forEach((item, index) => {
                item.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
            });
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            // Remove animations
            const navItems = nav.querySelectorAll('li');
            navItems.forEach(item => {
                item.style.animation = '';
            });
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav && nav.classList.contains('active') && !e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
        nav.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        // Remove animations
        const navItems = nav.querySelectorAll('li');
        navItems.forEach(item => {
            item.style.animation = '';
        });
    }
});

// Enhanced smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            // Remove animations
            const navItems = nav.querySelectorAll('li');
            navItems.forEach(item => {
                item.style.animation = '';
            });
        }
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Add highlight effect to the target section
            targetElement.classList.add('highlight');
            setTimeout(() => {
                targetElement.classList.remove('highlight');
            }, 1500);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const headerHeight = 80;
    
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollValue = window.scrollY;
        hero.style.backgroundPosition = `center ${scrollValue * 0.5}px`;
    }
});

// Enhanced fixed header class on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
});

// Enhanced form submission with validation and feedback
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Enhanced validation
        let isValid = true;
        const errorMessages = [];
        
        if (!name) {
            isValid = false;
            errorMessages.push('Please enter your name');
            document.getElementById('name').classList.add('error');
        } else {
            document.getElementById('name').classList.remove('error');
        }
        
        if (!email) {
            isValid = false;
            errorMessages.push('Please enter your email');
            document.getElementById('email').classList.add('error');
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            isValid = false;
            errorMessages.push('Please enter a valid email address');
            document.getElementById('email').classList.add('error');
        } else {
            document.getElementById('email').classList.remove('error');
        }
        
        if (!message) {
            isValid = false;
            errorMessages.push('Please enter your message');
            document.getElementById('message').classList.add('error');
        } else {
            document.getElementById('message').classList.remove('error');
        }
        
        if (!isValid) {
            // Show error messages
            const errorContainer = document.createElement('div');
            errorContainer.className = 'error-container';
            errorContainer.innerHTML = `
                <div class="error-message">
                    <ul>
                        ${errorMessages.map(msg => `<li>${msg}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            // Remove any existing error container
            const existingError = contactForm.querySelector('.error-container');
            if (existingError) {
                existingError.remove();
            }
            
            contactForm.prepend(errorContainer);
            
            // Scroll to error message
            errorContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            return;
        }
        
        // Remove any existing error container
        const existingError = contactForm.querySelector('.error-container');
        if (existingError) {
            existingError.remove();
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-content">
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for your message! We will get back to you soon.</p>
                </div>
            `;
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            // Add success message
            contactForm.prepend(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    successMessage.remove();
                }, 500);
            }, 5000);
        }, 1500);
    });
}

// Enhanced newsletter subscription with validation and feedback
const newsletterForm = document.querySelector('.footer-newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Enhanced validation
        if (!email) {
            emailInput.classList.add('error');
            return;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            emailInput.classList.add('error');
            return;
        } else {
            emailInput.classList.remove('error');
        }
        
        // Show loading state
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i>';
            emailInput.value = '';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 2000);
        }, 1500);
    });
}

// Scroll to Top Button
const scrollToTopBtn = document.querySelector('.scroll-to-top');

if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced animation on scroll with staggered effects
window.addEventListener('DOMContentLoaded', () => {
    // Add .animate class to elements when they come into view
    const animateElements = document.querySelectorAll(
        '.card, .impact-item, .about-image, .goals-image, .vision-image, .feature, .advantage, .stat, .example-item, .ecosystem-item, .partnership-item, .timeline-item, .phase, .stakeholder, .award, .deliverable-item, .requirement-item, .resource-item, .criterion'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay based on the element's position
                const delay = Array.from(animateElements).indexOf(entry.target) % 5 * 0.1;
                entry.target.style.transitionDelay = `${delay}s`;
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add staggered animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        }, 500);
    });
    
    // Add staggered animation to stakeholders
    const stakeholders = document.querySelectorAll('.stakeholder');
    stakeholders.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        }, 500);
    });
    
    // Add staggered animation to awards
    const awards = document.querySelectorAll('.award');
    awards.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        }, 500);
    });
    
    // Add counter animation to stats
    const stats = document.querySelectorAll('.stat h4');
    stats.forEach(stat => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetValue = parseFloat(stat.textContent);
                    let currentValue = 0;
                    const duration = 2000; // 2 seconds
                    const increment = targetValue / (duration / 16); // 60fps
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= targetValue) {
                            stat.textContent = targetValue + (stat.textContent.includes('%') ? '%' : '');
                            clearInterval(counter);
                        } else {
                            stat.textContent = Math.round(currentValue * 10) / 10 + (stat.textContent.includes('%') ? '%' : '');
                        }
                    }, 16);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                    c.style.transform = 'scale(0.95)';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            cards.forEach(c => {
                c.style.opacity = '1';
                c.style.transform = '';
            });
        });
    });
}); 
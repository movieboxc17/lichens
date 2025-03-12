document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
    
    // Close menu when clicking on a link
    const menuLinks = document.querySelectorAll('.nav-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Accordion functionality
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active class on the button
            this.classList.toggle('active');
            
            // Get the next element (accordion content)
            const content = this.nextElementSibling;
            
            // Toggle active class on content
            content.classList.toggle('active');
        });
    });
    
    // Gallery lightbox functionality
    const galleryZoomButtons = document.querySelectorAll('.gallery-zoom');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    galleryZoomButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the parent gallery item
            const galleryItem = this.closest('.gallery-item');
            
            // Get the image source
            const imgSrc = galleryItem.querySelector('img').src;
            
            // Get the image caption
            const caption = galleryItem.querySelector('h3').textContent;
            
            // Set the lightbox image source and caption
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = caption;
            
            // Display the lightbox
            lightbox.style.display = 'flex';
            
            // Add animation class
            setTimeout(() => {
                lightboxImg.classList.add('fade-in');
            }, 10);
            
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox when clicking the close button
    if (closeLightbox) {
        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
            lightboxImg.classList.remove('fade-in');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close lightbox when clicking outside the image
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                lightboxImg.classList.remove('fade-in');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
            lightboxImg.classList.remove('fade-in');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
                
                // Animate elements inside the section
                animateElementsInSection(element);
            }
        });
    };
    
    const animateElementsInSection = function(section) {
        const animatableElements = section.querySelectorAll('.fact-card, .gallery-item, .accordion-item');
        
        animatableElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    };
    
    // Run animations on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animations on page load
    window.addEventListener('load', function() {
        // Trigger initial animations
        animateOnScroll();
        
        // Fade in the hero section
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.style.opacity = '1';
        }
        
        // Hide loader if exists
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.display = 'none';
        }
    });
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                highlightError(nameInput);
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                highlightError(emailInput);
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                highlightError(messageInput);
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // In a real application, you would submit the form data here
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }
    
    // Helper functions for form validation
    function highlightError(input) {
        input.style.borderColor = '#ff3860';
        input.focus();
    }
    
    function removeError(input) {
        input.style.borderColor = '#e0e0e0';
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Animate sections on load
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
    });
    
    // Initialize fact cards for animation
    document.querySelectorAll('.fact-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
    });
    
    // Initialize gallery items for animation
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
    });
    
    // Initialize accordion items for animation
    document.querySelectorAll('.accordion-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
    });
});

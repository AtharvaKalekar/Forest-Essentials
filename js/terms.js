document.addEventListener('DOMContentLoaded', function() {
    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    // Show/hide back to top button on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Smooth scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchor links
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100, // Adjust for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-bottom a, .footer-column a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (linkHref === 'index.html' && currentPage === '')) {
            link.classList.add('active');
        }
    });
    
    // Initialize tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
    
    function showTooltip(e) {
        const tooltipText = this.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        // Position tooltip above the element
        tooltip.style.top = `${window.scrollY + rect.top - tooltipRect.height - 10}px`;
        tooltip.style.left = `${window.scrollX + rect.left + (rect.width - tooltipRect.width) / 2}px`;
        
        // Add active class for animation
        setTimeout(() => {
            tooltip.classList.add('active');
        }, 10);
    }
    
    function hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
    
    // Add animation to sections on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.terms-section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.classList.add('active');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll with throttling
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                animateOnScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    // Initialize sections with opacity 0 for animation
    document.querySelectorAll('.terms-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Highlight the current section in view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.terms-section').forEach(section => {
        observer.observe(section);
    });
});

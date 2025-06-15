document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    let slideInterval;
    
    // Show current slide
    function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Update current slide index
        currentSlide = (n + slides.length) % slides.length;
        
        // Show current slide and update dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Auto slide
    function startSlider() {
        slideInterval = setInterval(nextSlide, 7000);
    }
    
    // Pause slider on hover
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            startSlider();
        });
    }
    
    // Dot click event
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Navigation buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Start the slider
    showSlide(0);
    startSlider();
    
    // Position Filtering
    const departmentFilter = document.getElementById('department');
    const locationFilter = document.getElementById('location');
    const positionCards = document.querySelectorAll('.position-card');
    const noPositions = document.querySelector('.no-positions');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const resetFiltersBottomBtn = document.getElementById('reset-filters-bottom');
    
    function filterPositions() {
        const departmentValue = departmentFilter.value;
        const locationValue = locationFilter.value;
        let visibleCount = 0;
        
        positionCards.forEach(card => {
            const cardDepartment = card.getAttribute('data-department');
            const cardLocation = card.getAttribute('data-location');
            const matchesDepartment = departmentValue === 'all' || cardDepartment === departmentValue;
            const matchesLocation = locationValue === 'all' || cardLocation === locationValue;
            
            if (matchesDepartment && matchesLocation) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no positions message
        if (noPositions) {
            if (visibleCount === 0) {
                noPositions.style.display = 'block';
            } else {
                noPositions.style.display = 'none';
            }
        }
    }
    
    // Add event listeners for filters
    if (departmentFilter && locationFilter) {
        departmentFilter.addEventListener('change', filterPositions);
        locationFilter.addEventListener('change', filterPositions);
    }
    
    // Reset filters
    function resetFilters() {
        if (departmentFilter) departmentFilter.value = 'all';
        if (locationFilter) locationFilter.value = 'all';
        filterPositions();
    }
    
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetFilters);
    }
    
    if (resetFiltersBottomBtn) {
        resetFiltersBottomBtn.addEventListener('click', resetFilters);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Apply now button click handler
    document.querySelectorAll('.btn-primary[href="#"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Thank you for your interest in joining Forest Essentials! Our HR team will review your application and contact you if your profile matches our requirements.');
        });
    });
    
    // View details button click handler
    document.querySelectorAll('.btn-outline[href="#"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const positionTitle = this.closest('.position-card').querySelector('h3').textContent;
            alert(`Details for ${positionTitle} position will be displayed here.`);
        });
    });
});

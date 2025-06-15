// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation on scroll for tiers
const tiers = document.querySelectorAll('.tier');
tiers.forEach(tier => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    tier.style.opacity = '0';
    tier.style.transform = 'translateY(20px)';
    tier.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(tier);
});

// Join Now button functionality
const joinNowButtons = document.querySelectorAll('.cta-button, .join-button');
joinNowButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Add your join now functionality here
        console.log('Join Now button clicked');
    });
});

// Sign In button functionality
const signInButtons = document.querySelectorAll('.signin-button');
signInButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Add your sign in functionality here
        console.log('Sign In button clicked');
    });
});

// Add hover effects to tier cards
tiers.forEach(tier => {
    tier.addEventListener('mouseenter', () => {
        tier.style.transform = 'translateY(-5px)';
    });
    
    tier.addEventListener('mouseleave', () => {
        tier.style.transform = 'translateY(0)';
    });
});

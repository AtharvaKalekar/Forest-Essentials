// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Back to Top Button
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
      } else {
        backToTopButton.style.display = 'none';
      }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Newsletter Form Submission
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Check if terms checkbox is checked
      const termsCheckbox = this.querySelector('#terms');
      if (termsCheckbox && !termsCheckbox.checked) {
        alert('Please agree to the terms and conditions.');
        return;
      }
      
      // In a real application, this would send the form data to a server
      // For demo purposes, show a success message
      alert('Thank you for subscribing to our newsletter!');
      
      // Reset form
      this.reset();
    });
  }
  
  // Floating Chat Button
  const floatingBtn = document.querySelector('.floating-btn');
  
  if (floatingBtn) {
    floatingBtn.addEventListener('click', function() {
      alert('Chat functionality would be implemented here in a real application.');
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      e.preventDefault();
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Mobile Navigation Toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navbarBottom = document.querySelector('.navbar-bottom');
  
  if (mobileNavToggle && navbarBottom) {
    mobileNavToggle.addEventListener('click', function() {
      navbarBottom.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
  
  // Video Play/Pause functionality
  const videoContainer = document.querySelector('.video-container');
  
  if (videoContainer) {
    const iframe = videoContainer.querySelector('iframe');
    
    if (iframe) {
      // Add a play button overlay for better UX
      const playButton = document.createElement('div');
      playButton.classList.add('video-play-button');
      playButton.innerHTML = '<i class="fas fa-play"></i>';
      videoContainer.appendChild(playButton);
      
      playButton.addEventListener('click', function() {
        // This is a simplified approach; in a real application, you would use the YouTube API
        iframe.src = iframe.src + '?autoplay=1';
        playButton.style.display = 'none';
      });
    }
  }
  
  // Certification and Award Image Hover Effect
  const certificationItems = document.querySelectorAll('.certification-item img');
  const awardItems = document.querySelectorAll('.award-item img');
  
  function addHoverEffect(items) {
    items.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    });
  }
  
  addHoverEffect(certificationItems);
  addHoverEffect(awardItems);
  
  // Dosha Links Hover Effect
  const doshaLinks = document.querySelectorAll('.dosha-link');
  
  doshaLinks.forEach(link => {
    const parentItem = link.parentElement;
    const img = parentItem.querySelector('img');
    
    link.addEventListener('mouseenter', function() {
      if (img) {
        img.style.transform = 'scale(1.05)';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      if (img) {
        img.style.transform = 'scale(1)';
      }
    });
  });
  
  // Search Functionality
  const searchIcon = document.querySelector('.search-icon');
  
  if (searchIcon) {
    searchIcon.addEventListener('click', function(e) {
      e.preventDefault();
      
      // In a real application, this would toggle a search overlay
      // For demo purposes, show an alert
      alert('Search functionality would be implemented here in a real application.');
    });
  }
  
  // Currency Dropdown
  const currencyDropdown = document.querySelector('.currency-dropdown');
  
  if (currencyDropdown) {
    currencyDropdown.addEventListener('change', function() {
      // In a real application, this would update the currency
      // For demo purposes, show an alert
      alert('Currency changed to ' + this.value);
    });
  }
});


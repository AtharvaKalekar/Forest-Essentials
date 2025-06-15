// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Smooth Scroll for Category Navigation
  const categoryLinks = document.querySelectorAll('.category-nav-item');
  
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Product Wishlist Toggle
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');
  
  wishlistButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Toggle heart icon
      const heartIcon = this.querySelector('i');
      if (heartIcon.classList.contains('far')) {
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
        heartIcon.style.color = '#e53935';
      } else {
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
        heartIcon.style.color = '';
      }
    });
  });
  
  // Add to Bag Button Click Event
  const addToBagButtons = document.querySelectorAll('.product-button');
  
  addToBagButtons.forEach(button => {
    button.addEventListener('click', function() {
      const buttonText = this.textContent.trim();
      
      if (buttonText === 'Select Size') {
        // Redirect to product page (in a real application)
        // For demo purposes, show a message
        alert('In a real application, this would open a size selection modal or redirect to the product page.');
      } else {
        // Get the current cart count
        const cartCountElement = document.querySelector('.cart-count');
        let currentCount = parseInt(cartCountElement.textContent);
        
        // Update the cart count
        cartCountElement.textContent = currentCount + 1;
        
        // Visual feedback for the button
        const originalText = this.textContent;
        this.textContent = 'Added to Bag';
        this.style.backgroundColor = '#a0001e';
        this.style.color = '#fff';
        this.style.borderColor = '#a0001e';
        
        // Reset button after 2 seconds
        setTimeout(() => {
          this.textContent = originalText;
          if (originalText.includes('Select Size')) {
            this.style.backgroundColor = '';
            this.style.color = '';
            this.style.borderColor = '';
          }
        }, 2000);
      }
    });
  });
  
  // Newsletter Form Submission
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Check if terms checkbox is checked (if it exists)
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
  });
  
  // Back to Top Button
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
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
  
  // Floating Chat Button
  const floatingBtn = document.querySelector('.floating-btn');
  
  if (floatingBtn) {
    floatingBtn.addEventListener('click', function() {
      alert('Chat functionality would be implemented here in a real application.');
    });
  }
});


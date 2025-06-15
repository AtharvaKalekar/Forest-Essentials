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
  
  // Product Variant Swatches
  const variantSwatches = document.querySelectorAll('.variant-swatch');
  
  variantSwatches.forEach(swatch => {
    swatch.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all swatches in the same group
      const swatchGroup = this.closest('.variant-swatches');
      swatchGroup.querySelectorAll('.variant-swatch').forEach(s => {
        s.classList.remove('active');
      });
      
      // Add active class to clicked swatch
      this.classList.add('active');
      
      // Get color name
      const colorName = this.getAttribute('data-color');
      
      // Update product name if needed
      const productInfo = this.closest('.product-info');
      if (productInfo) {
        const productNameElement = productInfo.querySelector('.product-name');
        if (productNameElement) {
          const baseName = productNameElement.textContent.split(' ').slice(0, -1).join(' ');
          const formattedColorName = colorName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          productNameElement.textContent = `${baseName} ${formattedColorName}`;
        }
      }
      
      // Update product image (in a real application)
      // This is a simplified example - in a real app, you would load the actual image
      const productShowcase = this.closest('.product-showcase');
      if (productShowcase) {
        const productImage = productShowcase.querySelector('.product-image img');
        if (productImage) {
          const productType = productImage.getAttribute('alt').split(' ')[0].toLowerCase();
          productImage.setAttribute('src', `../images/product-${productType}-${colorName}.jpg`);
          productImage.setAttribute('alt', `${productImage.getAttribute('alt').split(' ')[0]} ${formattedColorName}`);
        }
      }
    });
  });
  
  // Add to Bag Button Click Event
  const addToBagButtons = document.querySelectorAll('.add-to-bag-btn');
  
  addToBagButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get the current cart count
      const cartCountElement = document.querySelector('.cart-count');
      let currentCount = parseInt(cartCountElement.textContent);
      
      // Update the cart count
      cartCountElement.textContent = currentCount + 1;
      
      // Visual feedback for the button
      const originalText = this.textContent;
      this.textContent = 'Added to Bag';
      this.style.backgroundColor = '#a0001e';
      
      // Reset button after 2 seconds
      setTimeout(() => {
        this.textContent = originalText;
        this.style.backgroundColor = '';
      }, 2000);
    });
  });
  
  // Video Play/Pause Toggle
  const videos = document.querySelectorAll('.product-video video');
  
  videos.forEach(video => {
    video.addEventListener('click', function() {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  });
  
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


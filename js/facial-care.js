// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Video Player Functionality
  const videoOverlay = document.querySelector('.video-overlay');
  const video = document.querySelector('.new-launch-video video');
  
  if (videoOverlay && video) {
    videoOverlay.addEventListener('click', function() {
      videoOverlay.style.display = 'none';
      video.play();
    });
    
    video.addEventListener('pause', function() {
      videoOverlay.style.display = 'flex';
    });
    
    video.addEventListener('ended', function() {
      videoOverlay.style.display = 'flex';
    });
  }
  
  // Concern Slider Functionality
  const concernSlider = document.querySelector('.concern-items');
  const concernPrevArrow = document.querySelector('.concern-slider .prev-arrow');
  const concernNextArrow = document.querySelector('.concern-slider .next-arrow');
  const concernItems = document.querySelectorAll('.concern-item');
  
  if (concernSlider && concernPrevArrow && concernNextArrow) {
    const itemWidth = concernItems[0].offsetWidth + 30; // Width + gap
    const visibleItems = Math.floor(concernSlider.offsetWidth / itemWidth);
    let currentPosition = 0;
    const maxPosition = concernItems.length - visibleItems;
    
    // Hide prev arrow initially
    concernPrevArrow.style.opacity = '0.5';
    concernPrevArrow.style.pointerEvents = 'none';
    
    concernPrevArrow.addEventListener('click', function() {
      if (currentPosition > 0) {
        currentPosition--;
        concernSlider.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
        
        // Enable/disable arrows based on position
        concernNextArrow.style.opacity = '1';
        concernNextArrow.style.pointerEvents = 'auto';
        
        if (currentPosition === 0) {
          concernPrevArrow.style.opacity = '0.5';
          concernPrevArrow.style.pointerEvents = 'none';
        }
      }
    });
    
    concernNextArrow.addEventListener('click', function() {
      if (currentPosition < maxPosition) {
        currentPosition++;
        concernSlider.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
        
        // Enable/disable arrows based on position
        concernPrevArrow.style.opacity = '1';
        concernPrevArrow.style.pointerEvents = 'auto';
        
        if (currentPosition === maxPosition) {
          concernNextArrow.style.opacity = '0.5';
          concernNextArrow.style.pointerEvents = 'none';
        }
      }
    });
    
    // Add transition for smooth sliding
    concernSlider.style.transition = 'transform 0.3s ease';
    
    // Update on window resize
    window.addEventListener('resize', function() {
      const newVisibleItems = Math.floor(concernSlider.offsetWidth / itemWidth);
      const newMaxPosition = concernItems.length - newVisibleItems;
      
      if (currentPosition > newMaxPosition) {
        currentPosition = newMaxPosition;
        concernSlider.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
      }
      
      // Reset position if window is large enough to show all items
      if (newVisibleItems >= concernItems.length) {
        currentPosition = 0;
        concernSlider.style.transform = 'translateX(0)';
        concernPrevArrow.style.opacity = '0.5';
        concernPrevArrow.style.pointerEvents = 'none';
        concernNextArrow.style.opacity = '0.5';
        concernNextArrow.style.pointerEvents = 'none';
      } else {
        concernNextArrow.style.opacity = '1';
        concernNextArrow.style.pointerEvents = 'auto';
      }
    });
  }
  
  // Products Slider Functionality
  const productsSlider = document.querySelector('.product-items');
  const productsPrevArrow = document.querySelector('.products-slider .prev-arrow');
  const productsNextArrow = document.querySelector('.products-slider .next-arrow');
  const productItems = document.querySelectorAll('.product-card');
  
  if (productsSlider && productsPrevArrow && productsNextArrow) {
    const itemWidth = productItems[0].offsetWidth + 20; // Width + gap
    const visibleItems = Math.floor(productsSlider.offsetWidth / itemWidth);
    let currentPosition = 0;
    const maxPosition = productItems.length - visibleItems;
    
    // Hide prev arrow initially
    productsPrevArrow.style.opacity = '0.5';
    productsPrevArrow.style.pointerEvents = 'none';
    
    productsPrevArrow.addEventListener('click', function() {
      if (currentPosition > 0) {
        currentPosition--;
        productsSlider.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
        
        // Enable/disable arrows based on position
        productsNextArrow.style.opacity = '1';
        productsNextArrow.style.pointerEvents = 'auto';
        
        if (currentPosition === 0) {
          productsPrevArrow.style.opacity = '0.5';
          productsPrevArrow.style.pointerEvents = 'none';
        }
      }
    });
    
    productsNextArrow.addEventListener('click', function() {
      if (currentPosition < maxPosition) {
        currentPosition++;
        productsSlider.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
        
        // Enable/disable arrows based on position
        productsPrevArrow.style.opacity = '1';
        productsPrevArrow.style.pointerEvents = 'auto';
        
        if (currentPosition === maxPosition) {
          productsNextArrow.style.opacity = '0.5';
          productsNextArrow.style.pointerEvents = 'none';
        }
      }
    });
    
    // Add transition for smooth sliding
    productsSlider.style.transition = 'transform 0.3s ease';
    
    // Update on window resize
    window.addEventListener('resize', function() {
      const newVisibleItems = Math.floor(productsSlider.offsetWidth / itemWidth);
      const newMaxPosition = productItems.length - newVisibleItems;
      
      if (currentPosition > newMaxPosition) {
        currentPosition = newMaxPosition;
        productsSlider.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
      }
      
      // Reset position if window is large enough to show all items
      if (newVisibleItems >= productItems.length) {
        currentPosition = 0;
        productsSlider.style.transform = 'translateX(0)';
        productsPrevArrow.style.opacity = '0.5';
        productsPrevArrow.style.pointerEvents = 'none';
        productsNextArrow.style.opacity = '0.5';
        productsNextArrow.style.pointerEvents = 'none';
      } else {
        productsNextArrow.style.opacity = '1';
        productsNextArrow.style.pointerEvents = 'auto';
      }
    });
  }
  
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
});


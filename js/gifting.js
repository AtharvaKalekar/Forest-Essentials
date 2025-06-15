// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Price Range Slider
  const priceSlider = document.getElementById('priceRange');
  if (priceSlider) {
    const priceMin = document.querySelector('.price-min');
    const priceMax = document.querySelector('.price-max');
    
    priceSlider.addEventListener('input', function() {
      priceMax.textContent = '₹' + this.value;
    });
  }
  
  // View Options (Grid/List)
  const gridViewBtn = document.querySelector('.grid-view');
  const listViewBtn = document.querySelector('.list-view');
  const productsContainer = document.querySelector('.products');
  
  if (gridViewBtn && listViewBtn && productsContainer) {
    gridViewBtn.addEventListener('click', function() {
      gridViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
      productsContainer.classList.remove('list-layout');
      productsContainer.classList.add('grid-layout');
    });
    
    listViewBtn.addEventListener('click', function() {
      listViewBtn.classList.add('active');
      gridViewBtn.classList.remove('active');
      productsContainer.classList.remove('grid-layout');
      productsContainer.classList.add('list-layout');
    });
  }
  
  // Wishlist Button Toggle
  const wishlistBtns = document.querySelectorAll('.wishlist-btn');
  
  wishlistBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('active');
      
      // Toggle heart icon
      const heartIcon = this.querySelector('i');
      if (heartIcon.classList.contains('far')) {
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
      } else {
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
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
      this.style.borderColor = '#a0001e';
      this.style.color = '#fff';
      
      // Reset button after 2 seconds
      setTimeout(() => {
        this.textContent = originalText;
        this.style.backgroundColor = '';
        this.style.borderColor = '';
        this.style.color = '';
      }, 2000);
    });
  });
  
  // Filter Checkboxes
  const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
  
  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      // In a real application, this would trigger a filter update
      // For demo purposes, we'll just log the selected filters
      const selectedFilters = [];
      filterCheckboxes.forEach(cb => {
        if (cb.checked) {
          selectedFilters.push(cb.parentElement.textContent.trim());
        }
      });
      
      console.log('Selected Filters:', selectedFilters);
    });
  });
  
  // Sort Select Change Event
  const sortSelect = document.querySelector('.sort-select');
  
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      // In a real application, this would trigger a sort update
      // For demo purposes, we'll just log the selected sort option
      console.log('Sort By:', this.value);
    });
  }
  
  // Load More Button
  const loadMoreBtn = document.querySelector('.load-more-btn');
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      // In a real application, this would load more products
      // For demo purposes, we'll just show a message
      this.textContent = 'Loading...';
      
      setTimeout(() => {
        this.textContent = 'No More Products';
        this.disabled = true;
        this.style.backgroundColor = '#999';
      }, 1500);
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
  
  // Floating Chat Button
  const floatingBtn = document.querySelector('.floating-btn');
  
  if (floatingBtn) {
    floatingBtn.addEventListener('click', function() {
      alert('Chat functionality would be implemented here in a real application.');
    });
  }

  const priceSort = document.getElementById('priceSort');
  const productGrid = document.querySelector('.products');

  priceSort.addEventListener('change', function() {
    const products = Array.from(productGrid.children);
    
    products.sort((a, b) => {
      const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('₹', '').replace(',', ''));
      const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('₹', '').replace(',', ''));
      
      if (this.value === 'price-low') {
        return priceA - priceB;
      } else if (this.value === 'price-high') {
        return priceB - priceA;
      } else {
        // Default sorting - restore original order
        return 0;
      }
    });

    // Clear the product grid
    productGrid.innerHTML = '';
    
    // Add sorted products back to the grid
    products.forEach(product => {
      productGrid.appendChild(product);
    });
  });
});


// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Product Gallery Functionality
  const mainImage = document.getElementById('main-image');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const galleryContainer = document.querySelector('.gallery-image-container');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let isZoomed = false;
  let zoomLevel = 1;
  let currentIndex = 0;
  
  // Initialize zoom container
  const zoomContainer = document.createElement('div');
  zoomContainer.className = 'zoom-container';
  galleryContainer.appendChild(zoomContainer);
  
  // Navigation functionality
  function navigateGallery(direction) {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + thumbnails.length) % thumbnails.length
      : (currentIndex + 1) % thumbnails.length;
    
    thumbnails[newIndex].click();
  }
  
  // Add click handlers for navigation buttons
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateGallery('prev');
  });
  
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateGallery('next');
  });
  
  // Handle thumbnail clicks
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
      // Update main image
      const imageUrl = this.querySelector('img').src;
      mainImage.src = imageUrl;
      
      // Update active thumbnail
      thumbnails.forEach(thumb => thumb.classList.remove('active'));
      this.classList.add('active');
      
      // Update current index
      currentIndex = index;
      
      // Reset zoom when changing images
      resetZoom();
    });
  });
  
  // Zoom functionality
  function handleZoom(e) {
    if (!isZoomed) return;
    
    const rect = galleryContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    mainImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
  }
  
  function resetZoom() {
    isZoomed = false;
    zoomLevel = 1;
    mainImage.style.transform = 'scale(1)';
    mainImage.style.cursor = 'zoom-in';
    zoomContainer.style.display = 'none';
  }
  
  // Toggle zoom on click
  galleryContainer.addEventListener('click', function(e) {
    if (e.target === mainImage) {
      isZoomed = !isZoomed;
      
      if (isZoomed) {
        zoomLevel = 2.5;
        mainImage.style.transform = `scale(${zoomLevel})`;
        mainImage.style.cursor = 'zoom-out';
        zoomContainer.style.display = 'block';
        handleZoom(e);
      } else {
        resetZoom();
      }
    }
  });
  
  // Handle mouse movement for zoom
  galleryContainer.addEventListener('mousemove', handleZoom);
  galleryContainer.addEventListener('mouseleave', resetZoom);
  
  // Add keyboard navigation for gallery
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      navigateGallery('prev');
    } else if (e.key === 'ArrowRight') {
      navigateGallery('next');
    }
  });
  
  // Quantity Selector
  const minusBtn = document.querySelector('.quantity-btn.minus');
  const plusBtn = document.querySelector('.quantity-btn.plus');
  const quantityInput = document.querySelector('.quantity-selector input');
  
  if (minusBtn && plusBtn && quantityInput) {
    minusBtn.addEventListener('click', function() {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
    
    plusBtn.addEventListener('click', function() {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
      }
    });
    
    quantityInput.addEventListener('change', function() {
      let currentValue = parseInt(this.value);
      if (isNaN(currentValue) || currentValue < 1) {
        this.value = 1;
      } else if (currentValue > 10) {
        this.value = 10;
      }
    });
  }
  
  // Size Options
  const sizeOptions = document.querySelectorAll('.size-option input');
  
  sizeOptions.forEach(option => {
    option.addEventListener('change', function() {
      // Update price based on selected size
      const price = this.value === '50' ? '₹8,695.00' : '₹4,995.00';
      document.querySelector('.product-price').textContent = price;
    });
  });
  
  // Product Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Review Rating Selector
  const ratingStars = document.querySelectorAll('.rating-selector i');
  
  ratingStars.forEach(star => {
    star.addEventListener('mouseover', function() {
      const rating = parseInt(this.getAttribute('data-rating'));
      
      // Highlight stars on hover
      ratingStars.forEach((s, index) => {
        if (index < rating) {
          s.classList.remove('far');
          s.classList.add('fas');
        } else {
          s.classList.remove('fas');
          s.classList.add('far');
        }
      });
    });
    
    star.addEventListener('mouseout', function() {
      // Reset stars if no rating is selected
      const selectedRating = document.querySelector('.rating-selector i.selected');
      
      if (!selectedRating) {
        ratingStars.forEach(s => {
          s.classList.remove('fas');
          s.classList.add('far');
        });
      } else {
        const rating = parseInt(selectedRating.getAttribute('data-rating'));
        
        ratingStars.forEach((s, index) => {
          if (index < rating) {
            s.classList.remove('far');
            s.classList.add('fas');
          } else {
            s.classList.remove('fas');
            s.classList.add('far');
          }
        });
      }
    });
    
    star.addEventListener('click', function() {
      const rating = parseInt(this.getAttribute('data-rating'));
      
      // Remove selected class from all stars
      ratingStars.forEach(s => s.classList.remove('selected'));
      
      // Add selected class to clicked star and previous stars
      ratingStars.forEach((s, index) => {
        if (index < rating) {
          s.classList.add('selected');
        }
      });
    });
  });
  
  // Review Form Submission
  const reviewForm = document.querySelector('.review-form');
  
  if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const rating = document.querySelectorAll('.rating-selector i.selected').length;
      const title = document.getElementById('review-title').value;
      const content = document.getElementById('review-content').value;
      
      // Validate form
      if (rating === 0) {
        alert('Please select a rating');
        return;
      }
      
      if (title.trim() === '') {
        alert('Please enter a review title');
        return;
      }
      
      if (content.trim() === '') {
        alert('Please enter your review');
        return;
      }
      
      // Create new review element
      const reviewsList = document.querySelector('.reviews-list');
      const newReview = document.createElement('div');
      newReview.className = 'review-item';
      
      const currentDate = new Date();
      const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
      
      newReview.innerHTML = `
        <div class="review-header">
          <div class="reviewer-name">You</div>
          <div class="review-date">${formattedDate}</div>
        </div>
        <div class="review-rating">
          ${Array(rating).fill('<i class="fas fa-star"></i>').join('')}
          ${Array(5 - rating).fill('<i class="far fa-star"></i>').join('')}
        </div>
        <div class="review-title">${title}</div>
        <div class="review-content">
          <p>${content}</p>
        </div>
      `;
      
      // Add new review to the top of the list
      reviewsList.insertBefore(newReview, reviewsList.firstChild);
      
      // Reset form
      reviewForm.reset();
      ratingStars.forEach(s => {
        s.classList.remove('fas', 'selected');
        s.classList.add('far');
      });
      
      // Show confirmation message
      alert('Thank you for your review!');
    });
  }
  
  // Load More Reviews Button
  const loadMoreBtn = document.querySelector('.load-more-reviews button');
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      // Simulate loading more reviews
      const reviewsList = document.querySelector('.reviews-list');
      
      // Sample reviews data
      const moreReviews = [
        {
          name: 'Meera J.',
          date: 'May 10, 2025',
          rating: 5,
          title: 'Worth every penny!',
          content: 'I've been using this night cream for over a month now and I'm absolutely in love with it. My skin feels so much more hydrated and plump in the morning. The fine lines around my eyes have visibly reduced. It's definitely worth the investment!'
        },
        {
          name: 'Vikram S.',
          date: 'May 5, 2025',
          rating: 4,
          title: 'Great product but strong fragrance',
          content: 'The cream works wonderfully and I've noticed a significant improvement in my skin's texture and firmness. However, the fragrance is quite strong, which might be an issue for those with sensitive skin or who prefer fragrance-free products. Otherwise, it's a great addition to my nighttime routine.'
        },
        {
          name: 'Leela R.',
          date: 'April 28, 2025',
          rating: 5,
          title: 'Transformed my skin!',
          content: 'I've tried many luxury skincare products, but this night cream is truly exceptional. After just two weeks of use, my skin looks more radiant and feels incredibly soft. The texture is rich but absorbs well, and I wake up with noticeably plumper skin. Definitely repurchasing!'
        }
      ];
      
      // Add more reviews to the list
      moreReviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        
        reviewElement.innerHTML = `
          <div class="review-header">
            <div class="reviewer-name">${review.name}</div>
            <div class="review-date">${review.date}</div>
          </div>
          <div class="review-rating">
            ${Array(review.rating).fill('<i class="fas fa-star"></i>').join('')}
            ${Array(5 - review.rating).fill('<i class="far fa-star"></i>').join('')}
          </div>
          <div class="review-title">${review.title}</div>
          <div class="review-content">
            <p>${review.content}</p>
          </div>
        `;
        
        reviewsList.appendChild(reviewElement);
      });
      
      // Hide the load more button after loading all reviews
      this.style.display = 'none';
    });
  }
  
  // Add to Cart Button
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      // Get the current cart count
      const cartCountElement = document.querySelector('.cart-count');
      let currentCount = parseInt(cartCountElement.textContent);
      
      // Get the selected quantity
      const quantity = parseInt(document.querySelector('.quantity-selector input').value);
      
      // Update the cart count
      cartCountElement.textContent = currentCount + quantity;
      
      // Visual feedback for the button
      const originalText = this.textContent;
      this.textContent = 'Added to Bag';
      this.style.backgroundColor = '#4CAF50';
      
      // Reset button after 2 seconds
      setTimeout(() => {
        this.textContent = originalText;
        this.style.backgroundColor = '';
      }, 2000);
    });
  }

  // Amazon-style Magnifier Effect
  const magnifierPreview = document.getElementById('magnifier-preview');
  let lens;
  let zoom = 2;
  let magnifierPreviewImg;

  function createLens() {
    lens = document.createElement('div');
    lens.className = 'magnifier-lens';
    mainImage.parentElement.appendChild(lens);
  }

  function getCursorPos(e) {
    const rect = mainImage.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return { x, y };
  }

  function moveLens(e) {
    e.preventDefault();
    const pos = getCursorPos(e);
    let x = pos.x - lens.offsetWidth / 2;
    let y = pos.y - lens.offsetHeight / 2;
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > mainImage.width - lens.offsetWidth) x = mainImage.width - lens.offsetWidth;
    if (y > mainImage.height - lens.offsetHeight) y = mainImage.height - lens.offsetHeight;
    lens.style.left = x + 'px';
    lens.style.top = y + 'px';
    magnifierPreviewImg.style.left = -x * zoom + 'px';
    magnifierPreviewImg.style.top = -y * zoom + 'px';
  }

  function showMagnifier(e) {
    if (!lens) createLens();
    lens.style.display = 'block';
    magnifierPreview.style.display = 'block';
    if (!magnifierPreviewImg) {
      magnifierPreviewImg = document.createElement('img');
      magnifierPreviewImg.src = mainImage.src;
      magnifierPreview.appendChild(magnifierPreviewImg);
    }
    magnifierPreviewImg.src = mainImage.src;
    magnifierPreviewImg.style.display = 'block';
    magnifierPreviewImg.style.position = 'absolute';
    magnifierPreviewImg.style.width = mainImage.width * zoom + 'px';
    magnifierPreviewImg.style.height = mainImage.height * zoom + 'px';
    moveLens(e);
    mainImage.addEventListener('mousemove', moveLens);
    lens.addEventListener('mousemove', moveLens);
    mainImage.addEventListener('mouseleave', hideMagnifier);
    lens.addEventListener('mouseleave', hideMagnifier);
  }

  function hideMagnifier() {
    if (lens) lens.style.display = 'none';
    if (magnifierPreviewImg) magnifierPreviewImg.style.display = 'none';
    magnifierPreview.style.display = 'none';
    mainImage.removeEventListener('mousemove', moveLens);
    if (lens) lens.removeEventListener('mousemove', moveLens);
    mainImage.removeEventListener('mouseleave', hideMagnifier);
    if (lens) lens.removeEventListener('mouseleave', hideMagnifier);
  }

  if (mainImage && magnifierPreview) {
    mainImage.addEventListener('mouseenter', showMagnifier);
  }
});


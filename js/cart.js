// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log('Cart script loaded');
  
  // Initialize cart from localStorage or create empty cart
  let cart;
  try {
    cart = JSON.parse(localStorage.getItem('cart')) || {};
    console.log('Loaded cart from localStorage:', cart);
  } catch (e) {
    console.error('Error loading cart from localStorage:', e);
    cart = {};
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Update cart count in header on page load
  updateCartCount();
  
  // Set up event delegation for all 'Add to Cart' buttons
  document.addEventListener('click', function(e) {
    // Check if the clicked element or its parent has the 'add-to-cart' class
    const addToCartBtn = e.target.closest('.add-to-cart');
    if (addToCartBtn) {
      e.preventDefault();
      const productCard = addToCartBtn.closest('.product-card, .product-detail');
      if (productCard) {
        addToCart(productCard, addToCartBtn);
      }
    }
  });
  
  // Function to add item to cart
  function addToCart(productCard, button) {
    console.log('Adding item to cart...');
    
    // Get or generate product ID
    const productId = productCard.dataset.productId || 'prod_' + Math.random().toString(36).substr(2, 9);
    
    // Get product name
    let productName = 'Product';
    if (productCard.dataset.productName) {
      productName = productCard.dataset.productName;
    } else {
      const nameElement = productCard.querySelector('.product-name, .product-title, .name, .title');
      if (nameElement) {
        productName = nameElement.textContent.trim();
      }
    }
    
    // Get product price
    let productPrice = 0;
    if (productCard.dataset.productPrice) {
      productPrice = parseFloat(productCard.dataset.productPrice);
    } else {
      const priceElement = productCard.querySelector('.price, .product-price, [class*="price"], [class*="Price"]');
      if (priceElement) {
        const priceText = priceElement.textContent.replace(/[^0-9.]/g, '');
        productPrice = parseFloat(priceText) || 0;
      }
    }
    
    console.log('Product details:', { id: productId, name: productName, price: productPrice });
    
    // Get image URL
    const productImage = productCard.dataset.productImage || 
                        productCard.querySelector('img')?.src || 
                        '../images/placeholder.jpg';
    
    // Get product URL
    const productUrl = productCard.dataset.productUrl || 
                      productCard.querySelector('a')?.href || 
                      '#';
    
    if (!cart[productId]) {
      cart[productId] = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1,
        image: productImage,
        url: productUrl
      };
    } else {
      cart[productId].quantity++;
    }
    
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count in header
    updateCartCount();
    
    // Show success notification
    showSuccessNotification(button);
    
    // If on cart page, update the cart display
    if (document.querySelector('.cart-page')) {
      updateCartDisplay();
    }
  }
  
  // Function to update cart count in header
  function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const totalItems = Object.values(cart).reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
    
    console.log('Updating cart count to:', totalItems);
    
    countElements.forEach(element => {
      if (element) {
        element.textContent = totalItems;
      }
    });
    
    // Also update cart title if on cart page
    const cartTitle = document.querySelector('.cart-title');
    if (cartTitle) {
      cartTitle.textContent = `Your Shopping Bag (${totalItems} ${totalItems === 1 ? 'Item' : 'Items'})`;
    }
  }
  
  // Function to show success notification
  function showSuccessNotification(button) {
    // Create notification if it doesn't exist
    let notification = document.querySelector('.cart-notification');
    
    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'cart-notification';
      document.body.appendChild(notification);
    }
    
    // Position notification near the button if possible
    if (button) {
      const rect = button.getBoundingClientRect();
      notification.style.top = `${window.scrollY + rect.top - 60}px`;
      notification.style.left = `${rect.left}px`;
    } else {
      notification.style.top = '20px';
      notification.style.right = '20px';
    }
    
    notification.textContent = 'Added to cart successfully!';
    notification.style.display = 'block';
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
    
    // Remove notification after 3 seconds
    clearTimeout(notification.timer);
    notification.timer = setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        notification.style.display = 'none';
      }, 300);
    }, 3000);
  }
  
  // Function to get cart total
  function getCartTotal() {
    return Object.values(cart).reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  // Function to update cart display on cart page
  function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) {
      console.log('Cart items container not found');
      return;
    }
    
    console.log('Updating cart display with cart:', cart);
    
    // Check if cart is empty
    if (Object.keys(cart).length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart-message">
          <i class="fas fa-shopping-cart"></i>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <a href="../index.html" class="btn btn-primary">Continue Shopping</a>
        </div>
      `;
      
      // Update summary to show zero values
      updateCartTotals();
      return;
    }
    
    // Show cart content
    document.querySelector('.cart-page .empty-cart').style.display = 'none';
    document.querySelector('.cart-page .cart-content').style.display = 'block';
    
    // Add each item to cart
    let totalItems = 0;
    let subtotal = 0;
    
    Object.entries(cart).forEach(([id, item]) => {
      totalItems += item.quantity;
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.dataset.productId = id;
      itemElement.innerHTML = `
        <div class="item-image">
          <a href="${item.url}">
            <img src="${item.image}" alt="${item.name}">
          </a>
        </div>
        <div class="item-details">
          <h3 class="item-name"><a href="${item.url}">${item.name}</a></h3>
          <div class="item-price">₹${item.price.toLocaleString('en-IN')}.00</div>
          <div class="item-actions">
            <button class="quantity-btn minus">-</button>
            <input type="number" min="1" max="10" value="${item.quantity}" class="quantity-input">
            <button class="quantity-btn plus">+</button>
            <button class="remove-item">Remove</button>
          </div>
        </div>
        <div class="item-total">₹${itemTotal.toLocaleString('en-IN')}.00</div>
      `;
      
      cartContainer.appendChild(itemElement);
    });
    
    // Update summary
    document.querySelector('.cart-title').textContent = `Your Shopping Bag (${totalItems} ${totalItems === 1 ? 'Item' : 'Items'})`;
    document.querySelector('.subtotal-amount').textContent = `₹${subtotal.toLocaleString('en-IN')}.00`;
    document.querySelector('.total-amount').textContent = `₹${subtotal.toLocaleString('en-IN')}.00`;
    
    // Set up event listeners for the new elements
    setupCartEventListeners();
  }
  
  // Function to set up event listeners for cart items
  function setupCartEventListeners() {
    // Quantity controls
    document.querySelectorAll('.quantity-btn').forEach(button => {
      button.addEventListener('click', function() {
        const input = this.parentElement.querySelector('.quantity-input');
        let value = parseInt(input.value) || 1;
        
        if (this.classList.contains('minus') && value > 1) {
          input.value = value - 1;
        } else if (this.classList.contains('plus') && value < 10) {
          input.value = value + 1;
        }
        
        updateCartItem(this.closest('.cart-item'));
      });
    });
    
    // Quantity input changes
    document.querySelectorAll('.quantity-input').forEach(input => {
      input.addEventListener('change', function() {
        let value = parseInt(this.value) || 1;
        if (value < 1) value = 1;
        if (value > 10) value = 10;
        this.value = value;
        updateCartItem(this.closest('.cart-item'));
      });
    });
    
    // Remove item buttons
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', function() {
        const item = this.closest('.cart-item');
        const productId = item.dataset.productId;
        delete cart[productId];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        item.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => {
          item.remove();
          if (Object.keys(cart).length === 0) {
            document.querySelector('.cart-page .empty-cart').style.display = 'block';
            document.querySelector('.cart-page .cart-content').style.display = 'none';
          } else {
            updateCartDisplay();
          }
        }, 300);
      });
    });
  }
  
  // Function to update a cart item's quantity
  function updateCartItem(itemElement) {
    const productId = itemElement.dataset.productId;
    const quantity = parseInt(itemElement.querySelector('.quantity-input').value) || 1;
    
    if (cart[productId]) {
      cart[productId].quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      updateCartDisplay();
    }
  }
  
  // Initialize cart display if on cart page
  if (document.querySelector('.cart-page')) {
    console.log('Cart page detected, initializing cart display');
    updateCartDisplay();
    setupCartEventListeners();
    updateCartTotals();
  }
  
  // Add event listener for cart page refresh
  window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
      cart = JSON.parse(e.newValue) || {};
      updateCartCount();
    }
  });
  
  // Quantity Selectors
  const minusBtns = document.querySelectorAll('.quantity-btn.minus');
  const plusBtns = document.querySelectorAll('.quantity-btn.plus');
  const quantityInputs = document.querySelectorAll('.quantity-selector input');
  
  // Function to update cart totals
  function updateCartTotals() {
    console.log('Updating cart totals...');
    let subtotal = 0;
    let itemCount = 0;
    
    try {
      // Calculate subtotal from cart items
      const cartItems = document.querySelectorAll('.cart-item');
      console.log(`Found ${cartItems.length} items in cart`);
      
      cartItems.forEach((item, index) => {
        try {
          const priceElement = item.querySelector('.item-price, [class*="price"], [class*="Price"]');
          const quantityInput = item.querySelector('.quantity-selector input, [type="number"], .quantity');
          
          if (!priceElement || !quantityInput) {
            console.warn(`Missing price or quantity element for item ${index + 1}`, { priceElement, quantityInput });
            return;
          }
          
          const priceText = priceElement.textContent.trim();
          const price = parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;
          const quantity = parseInt(quantityInput.value) || 1;
          const itemTotal = price * quantity;
          
          console.log(`Item ${index + 1}:`, { price, quantity, itemTotal });
          
          subtotal += itemTotal;
          itemCount += quantity;
        } catch (error) {
          console.error(`Error processing item ${index + 1}:`, error);
        }
      });
      
      console.log('Calculated subtotal:', subtotal, 'Item count:', itemCount);
      
      // Format currency with Indian Rupee symbol and proper formatting
      const formatCurrency = (amount) => {
        return '₹' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      };
      
      // Update subtotal and total in the summary
      const subtotalElement = document.querySelector('.subtotal-amount, .summary-row:first-child span:last-child');
      const totalElement = document.querySelector('.total-amount, .summary-row.total span:last-child');
      
      if (subtotalElement) {
        subtotalElement.textContent = formatCurrency(subtotal);
        console.log('Updated subtotal:', subtotalElement.textContent);
      } else {
        console.warn('Subtotal element not found');
      }
      
      if (totalElement) {
        totalElement.textContent = formatCurrency(subtotal);
        console.log('Updated total:', totalElement.textContent);
      } else {
        console.warn('Total element not found');
      }
      
      // Update cart title
      const cartTitle = document.querySelector('.cart-title');
      if (cartTitle) {
        cartTitle.textContent = `Your Shopping Bag (${itemCount} ${itemCount === 1 ? 'Item' : 'Items'})`;
      }
      
      // Update shipping message based on subtotal
      const shippingNote = document.querySelector('.shipping-note');
      if (shippingNote) {
        if (subtotal >= 2500) {
          shippingNote.textContent = 'Free shipping applied!';
          shippingNote.style.color = '#4CAF50';
        } else {
          const amountNeeded = (2500 - subtotal).toFixed(2);
          shippingNote.textContent = `Add ₹${amountNeeded} more for free shipping`;
          shippingNote.style.color = '';
        }
      }
      
      // Enable/disable checkout button based on cart contents
      const checkoutBtn = document.querySelector('.checkout-btn');
      if (checkoutBtn) {
        const hasItems = subtotal > 0;
        checkoutBtn.disabled = !hasItems;
        checkoutBtn.style.opacity = hasItems ? '1' : '0.6';
        checkoutBtn.style.cursor = hasItems ? 'pointer' : 'not-allowed';
        console.log('Updated checkout button state - disabled:', !hasItems);
      }
      
    } catch (error) {
      console.error('Error in updateCartTotals:', error);
    }
  }
  
  // Quantity Decrease
  minusBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.nextElementSibling;
      let currentValue = parseInt(input.value);
      if (currentValue > 1) {
        input.value = currentValue - 1;
        updateCartTotals();
      }
    });
  });
  
  // Quantity Increase
  plusBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.previousElementSibling;
      let currentValue = parseInt(input.value);
      if (currentValue < 10) {
        input.value = currentValue + 1;
        updateCartTotals();
      }
    });
  });
  
  // Quantity Input Change
  quantityInputs.forEach(input => {
    input.addEventListener('change', function() {
      let currentValue = parseInt(this.value);
      if (isNaN(currentValue) || currentValue < 1) {
        this.value = 1;
      } else if (currentValue > 10) {
        this.value = 10;
      }
      updateCartTotals();
    });
  });
  
  // Remove Item Buttons
  const removeButtons = document.querySelectorAll('.remove-item');
  
  removeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const cartItem = this.closest('.cart-item');
      
      // Add fade-out animation
      cartItem.style.transition = 'opacity 0.3s ease';
      cartItem.style.opacity = '0';
      
      // Remove the item after animation completes
      setTimeout(() => {
        cartItem.remove();
        updateCartTotals();
        
        // Check if cart is empty
        const remainingItems = document.querySelectorAll('.cart-item');
        if (remainingItems.length === 0) {
          // Show empty cart template
          document.querySelector('.cart-content').style.display = 'none';
          document.querySelector('.continue-shopping').style.display = 'none';
          document.querySelector('.empty-cart').style.display = 'block';
          
          // Update cart count in header
          document.querySelector('.cart-count').textContent = '0';
        }
      }, 300);
    });
  });
  
  // Move to Wishlist Buttons
  const wishlistButtons = document.querySelectorAll('.move-to-wishlist');
  
  wishlistButtons.forEach(button => {
    button.addEventListener('click', function() {
      // In a real application, this would add the item to the wishlist
      // For demo purposes, show a message
      alert('Item moved to wishlist!');
      
      // Remove the item from cart
      const cartItem = this.closest('.cart-item');
      
      // Add fade-out animation
      cartItem.style.transition = 'opacity 0.3s ease';
      cartItem.style.opacity = '0';
      
      // Remove the item after animation completes
      setTimeout(() => {
        cartItem.remove();
        updateCartTotals();
        
        // Check if cart is empty
        const remainingItems = document.querySelectorAll('.cart-item');
        if (remainingItems.length === 0) {
          // Show empty cart template
          document.querySelector('.cart-content').style.display = 'none';
          document.querySelector('.continue-shopping').style.display = 'none';
          document.querySelector('.empty-cart').style.display = 'block';
          
          // Update cart count in header
          document.querySelector('.cart-count').textContent = '0';
        }
      }, 300);
    });
  });
  
  // Promo Code Application
  const promoForm = document.querySelector('.promo-code');
  
  if (promoForm) {
    promoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const promoInput = this.querySelector('input');
      const promoCode = promoInput.value.trim().toUpperCase();
      
      if (promoCode === 'WELCOME') {
        // Apply discount
        alert('Promo code applied! You got a free bestseller with your order.');
        
        // Disable the input and button
        promoInput.disabled = true;
        this.querySelector('button').disabled = true;
        
        // Change button text
        this.querySelector('button').textContent = 'Applied';
        
        // Add a success message
        const successMessage = document.createElement('div');
        successMessage.className = 'promo-success';
        successMessage.textContent = 'Promo code applied successfully!';
        successMessage.style.color = '#4CAF50';
        successMessage.style.fontSize = '12px';
        successMessage.style.marginTop = '5px';
        this.appendChild(successMessage);
      } else {
        // Show error message
        alert('Invalid promo code. Please try again.');
        
        // Clear the input
        promoInput.value = '';
      }
    });
  }
  
  // Checkout Button
  const checkoutBtn = document.querySelector('.checkout-btn');
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      // In a real application, this would redirect to the checkout page
      // For demo purposes, show a message
      alert('Proceeding to checkout...');
    });
  }
  
  // Product Wishlist Toggle in "You May Also Like" section
  const productWishlistButtons = document.querySelectorAll('.related-products .wishlist-btn');
  
  productWishlistButtons.forEach(button => {
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
  
  // Add to Bag Button Click Event in "You May Also Like" section
  const addToBagButtons = document.querySelectorAll('.related-products .product-button');
  
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


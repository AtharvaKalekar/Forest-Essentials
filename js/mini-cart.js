// Mini Cart functionality
document.addEventListener('DOMContentLoaded', function() {
  // Create mini cart element if it doesn't exist
  let miniCart = document.querySelector('.mini-cart');
  
  if (!miniCart) {
    miniCart = document.createElement('div');
    miniCart.className = 'mini-cart';
    miniCart.innerHTML = `
      <div class="mini-cart-header">
        <h3 class="mini-cart-title">Your Cart</h3>
        <button class="mini-cart-close">&times;</button>
      </div>
      <div class="mini-cart-items">
        <!-- Cart items will be dynamically inserted here -->
      </div>
      <div class="mini-cart-summary">
        <div class="mini-cart-subtotal">
          <span>Subtotal:</span>
          <span class="mini-cart-subtotal-amount">₹0.00</span>
        </div>
        <div class="mini-cart-actions">
          <a href="/pages/cart.html" class="btn btn-outline">View Cart</a>
          <a href="/checkout.html" class="btn btn-primary">Checkout</a>
        </div>
      </div>
    `;
    document.body.appendChild(miniCart);
  }

  // Toggle mini cart when clicking cart icon
  const cartIcons = document.querySelectorAll('.cart-icon, .header-cart');
  
  cartIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.preventDefault();
      miniCart.classList.toggle('active');
      updateMiniCart();
    });
  });
  
  // Close mini cart when clicking outside
  document.addEventListener('click', function(e) {
    const isClickInside = miniCart.contains(e.target) || 
                        Array.from(cartIcons).some(icon => icon.contains(e.target));
    
    if (!isClickInside && miniCart.classList.contains('active')) {
      miniCart.classList.remove('active');
    }
  });
  
  // Close button
  const closeButton = miniCart.querySelector('.mini-cart-close');
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      miniCart.classList.remove('active');
    });
  }
  
  // Update mini cart when cart changes
  window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
      updateMiniCart();
    }
  });
  
  // Initial update
  updateMiniCart();
  
  // Function to update mini cart
  function updateMiniCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const itemsContainer = miniCart.querySelector('.mini-cart-items');
    let itemsHTML = '';
    let itemCount = 0;
    let subtotal = 0;
    
    Object.entries(cart).forEach(([id, item]) => {
      itemCount += item.quantity;
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      itemsHTML += `
        <div class="mini-cart-item" data-product-id="${id}">
          <div class="mini-cart-item-image">
            <a href="${item.url}">
              <img src="${item.image}" alt="${item.name}">
            </a>
          </div>
          <div class="mini-cart-item-details">
            <h4 class="mini-cart-item-name">
              <a href="${item.url}">${item.name}</a>
            </h4>
            <div class="mini-cart-item-price">₹${item.price.toLocaleString('en-IN')}.00</div>
            <div class="mini-cart-item-quantity">Qty: ${item.quantity}</div>
            <button class="mini-cart-remove" data-product-id="${id}">Remove</button>
          </div>
        </div>
      `;
    });
    
    if (itemCount === 0) {
      itemsHTML = '<div class="empty-mini-cart">Your cart is empty</div>';
    }
    
    itemsContainer.innerHTML = itemsHTML;
    
    // Update subtotal
    const subtotalElement = miniCart.querySelector('.mini-cart-subtotal-amount');
    if (subtotalElement) {
      subtotalElement.textContent = `₹${subtotal.toLocaleString('en-IN')}.00`;
    }
    
    // Update cart count in header
    const cartCountElements = document.querySelectorAll('.cart-count, .cart-count-header');
    cartCountElements.forEach(element => {
      element.textContent = itemCount;
      element.style.display = itemCount > 0 ? 'flex' : 'none';
    });
    
    // Add event listeners to remove buttons
    const removeButtons = miniCart.querySelectorAll('.mini-cart-remove');
    removeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productId = this.dataset.productId;
        removeFromCart(productId);
      });
    });
    
    // Update view cart and checkout links
    const viewCartLink = miniCart.querySelector('.btn-outline');
    const checkoutLink = miniCart.querySelector('.btn-primary');
    
    if (viewCartLink) viewCartLink.style.display = itemCount > 0 ? 'block' : 'none';
    if (checkoutLink) checkoutLink.style.display = itemCount > 0 ? 'block' : 'none';
  }
  
  // Function to remove item from cart
  function removeFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    
    if (cart[productId]) {
      delete cart[productId];
      localStorage.setItem('cart', JSON.stringify(cart));
      updateMiniCart();
      
      // Show notification
      showNotification('Item removed from cart');
      
      // If on cart page, update the cart display
      if (document.querySelector('.cart-page')) {
        window.dispatchEvent(new Event('storage'));
      }
    }
  }
  
  // Function to show notification
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'mini-cart-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Position notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#333';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '9999';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';
    
    // Trigger reflow
    void notification.offsetWidth;
    
    // Show notification
    notification.style.opacity = '1';
    
    // Hide after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
});

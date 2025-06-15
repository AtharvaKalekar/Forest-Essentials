// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log('Main cart script loaded');
  
  // Initialize cart from localStorage or create empty cart
  let cart;
  try {
    const savedCart = localStorage.getItem('cart');
    console.log('Loaded cart from localStorage:', savedCart);
    cart = savedCart ? JSON.parse(savedCart) : {};
    console.log('Parsed cart:', cart);
  } catch (e) {
    console.error('Error loading cart from localStorage:', e);
    cart = {};
  }
  
  // Function to save cart to localStorage
  function saveCart() {
    try {
      const cartString = JSON.stringify(cart);
      console.log('Saving cart to localStorage:', cartString);
      localStorage.setItem('cart', cartString);
      console.log('Cart saved successfully');
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }
  
  // Function to update cart count in header
  function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      const totalItems = Object.values(cart).reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
      cartCount.textContent = totalItems;
      console.log('Updated cart count:', totalItems);
    } else {
      console.log('Cart count element not found');
    }
  }
  
  // Function to add item to cart
  function addToCart(productCard, button) {
    console.log('Adding item to cart...');
    console.log('Product card:', productCard);
    console.log('Button:', button);
    
    // Get or generate product ID
    const productId = productCard.dataset.productId || 'prod_' + Math.random().toString(36).substr(2, 9);
    console.log('Product ID:', productId);
    
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
    console.log('Product name:', productName);
    
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
    console.log('Product price:', productPrice);
    
    // Get image URL
    const productImage = productCard.dataset.productImage || 
                        productCard.querySelector('img')?.src || 
                        '../images/placeholder.jpg';
    console.log('Product image:', productImage);
    
    // Get product URL
    const productUrl = productCard.dataset.productUrl || 
                      productCard.querySelector('a')?.href || 
                      '#';
    console.log('Product URL:', productUrl);
    
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
    
    console.log('Updated cart:', cart);
    
    // Save cart to localStorage
    saveCart();
    
    // Update cart count in header
    updateCartCount();
    
    // Show success notification
    showNotification('Added to cart successfully!');
    
    // If on cart page, update the cart display
    if (document.querySelector('.cart-page')) {
      console.log('Cart page detected, updating display...');
      updateCartDisplay();
    }
  }
  
  // Function to update cart display on cart page
  function updateCartDisplay() {
    console.log('Updating cart display...');
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) {
      console.log('Cart items container not found');
      return;
    }
    
    console.log('Current cart state:', cart);
    
    // Check if cart is empty
    if (Object.keys(cart).length === 0) {
      console.log('Cart is empty, showing empty message');
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
    
    // Clear existing content
    cartItemsContainer.innerHTML = '';
    
    // Add each item to cart
    let totalItems = 0;
    let subtotal = 0;
    
    Object.entries(cart).forEach(([id, item]) => {
      console.log('Adding item to cart display:', item);
      totalItems += parseInt(item.quantity) || 0;
      const itemTotal = item.price * (parseInt(item.quantity) || 0);
      subtotal += itemTotal;
      
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.dataset.productId = id;
      itemElement.innerHTML = `
        <div class="cart-item-image">
          <a href="${item.url}">
            <img src="${item.image}" alt="${item.name}">
          </a>
        </div>
        <div class="cart-item-details">
          <h3 class="cart-item-name"><a href="${item.url}">${item.name}</a></h3>
          <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}.00</div>
          <div class="cart-item-quantity">
            <button class="quantity-btn minus">-</button>
            <input type="number" min="1" max="10" value="${item.quantity}" class="quantity-input">
            <button class="quantity-btn plus">+</button>
            <button class="remove-item">Remove</button>
          </div>
        </div>
        <div class="cart-item-total">₹${itemTotal.toLocaleString('en-IN')}.00</div>
      `;
      
      cartItemsContainer.appendChild(itemElement);
    });
    
    // Update cart title and totals
    const cartTitle = document.querySelector('.cart-title');
    if (cartTitle) {
      cartTitle.textContent = `Your Shopping Bag (${totalItems} ${totalItems === 1 ? 'Item' : 'Items'})`;
    }
    
    updateCartTotals();
    
    // Set up event listeners for the new elements
    setupCartEventListeners();
  }
  
  // Function to update cart totals
  function updateCartTotals() {
    const subtotalElement = document.querySelector('.subtotal-amount');
    const totalElement = document.querySelector('.total-amount');
    
    if (subtotalElement && totalElement) {
      const subtotal = Object.values(cart).reduce((sum, item) => sum + (item.price * (parseInt(item.quantity) || 0)), 0);
      subtotalElement.textContent = `₹${subtotal.toLocaleString('en-IN')}.00`;
      totalElement.textContent = `₹${subtotal.toLocaleString('en-IN')}.00`;
      console.log('Updated cart totals:', { subtotal });
    } else {
      console.log('Cart total elements not found');
    }
  }
  
  // Function to show notification
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
  
  // Function to set up event listeners for cart items
  function setupCartEventListeners() {
    console.log('Setting up cart event listeners...');
    
    // Quantity controls
    document.querySelectorAll('.quantity-btn').forEach(button => {
      button.addEventListener('click', function() {
        const input = this.parentElement.querySelector('.quantity-input');
        const itemElement = this.closest('.cart-item');
        const productId = itemElement.dataset.productId;
        let value = parseInt(input.value) || 1;
        
        if (this.classList.contains('minus') && value > 1) {
          value--;
        } else if (this.classList.contains('plus') && value < 10) {
          value++;
        }
        
        input.value = value;
        cart[productId].quantity = value;
        saveCart();
        updateCartDisplay();
        updateCartCount();
      });
    });
    
    // Remove item buttons
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', function() {
        const itemElement = this.closest('.cart-item');
        const productId = itemElement.dataset.productId;
        removeFromCart(productId);
      });
    });
  }
  
  // Function to remove item from cart
  function removeFromCart(productId) {
    if (cart[productId]) {
      delete cart[productId];
      saveCart();
      updateCartCount();
      
      // Show notification
      showNotification('Item removed from cart');
      
      // If on cart page, update the cart display
      if (document.querySelector('.cart-page')) {
        updateCartDisplay();
      }
    }
  }
  
  // Set up event delegation for all 'Add to Cart' buttons
  document.addEventListener('click', function(e) {
    const addToCartBtn = e.target.closest('.add-to-cart');
    if (addToCartBtn) {
      e.preventDefault();
      console.log('Add to cart button clicked:', addToCartBtn);
      const productCard = addToCartBtn.closest('.product-card, .product-detail, .product-container');
      if (productCard) {
        console.log('Product card found:', productCard);
        addToCart(productCard, addToCartBtn);
      } else {
        console.log('Product card not found');
      }
    }
  });
  
  // Initial updates
  console.log('Performing initial updates...');
  updateCartCount();
  if (document.querySelector('.cart-page')) {
    console.log('Cart page detected, updating display...');
    updateCartDisplay();
  }
}); 
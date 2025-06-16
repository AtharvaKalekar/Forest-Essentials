// Cart functionality
let cart = {};

// Initialize cart when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Cart script loaded');
  
  // Load cart from localStorage
  try {
    const savedCart = localStorage.getItem('cart');
    console.log('Loaded cart from localStorage:', savedCart);
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  } catch (e) {
    console.error('Error loading cart from localStorage:', e);
    cart = {};
  }
  
  // Update cart display if on cart page
  if (document.querySelector('.cart-page')) {
    updateCartDisplay();
  } else {
    // If not on cart page, just update the cart count
    updateCartCount();
  }
  
  // Set up event listeners
  setupCartEventListeners();
});

// Function to save cart to localStorage
function saveCart() {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart saved to localStorage:', cart);
  } catch (e) {
    console.error('Error saving cart to localStorage:', e);
  }
}

// Function to update cart count in header
function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    console.log('Updated cart count:', totalItems);
  }
}

// Function to add item to cart
function addToCart(productCard, button) {
  console.log('Adding item to cart...');
  
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
  
  // Get image URL
  const productImage = productCard.dataset.productImage || 
                      productCard.querySelector('img')?.src || 
                      '../images/placeholder.jpg';
  
  // Get product URL
  const productUrl = productCard.dataset.productUrl || 
                    productCard.querySelector('a')?.href || 
                    '#';
  
  // Add to cart
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
  
  // Save cart and update UI
  saveCart();
  updateCartCount();
  showNotification('Added to cart successfully!');
  
  // Update cart display if on cart page
  if (document.querySelector('.cart-page')) {
    updateCartDisplay();
  }
}

// Function to update cart display on cart page
function updateCartDisplay() {
  console.log('Updating cart display...');
  const cartItemsContainer = document.querySelector('.cart-items');
  if (!cartItemsContainer) return;
  
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
    updateCartTotals();
    return;
  }
  
  // Add cart items
  cartItemsContainer.innerHTML = '';
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
  
  // Update cart title
  const cartTitle = document.querySelector('.cart-title');
  if (cartTitle) {
    cartTitle.textContent = `Your Shopping Bag (${totalItems} ${totalItems === 1 ? 'Item' : 'Items'})`;
  }
  
  updateCartTotals();
  setupCartEventListeners();
}

// Function to update cart totals
function updateCartTotals() {
  const subtotalElement = document.querySelector('.subtotal-amount');
  const totalElement = document.querySelector('.total-amount');
  
  if (subtotalElement && totalElement) {
    const subtotal = Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    subtotalElement.textContent = `₹${subtotal.toLocaleString('en-IN')}.00`;
    totalElement.textContent = `₹${subtotal.toLocaleString('en-IN')}.00`;
  }
}

// Function to show checkout confirmation dialog
function showCheckoutConfirmation() {
  if (!cart || Object.keys(cart).length === 0) {
    showNotification('Your cart is empty. Please add items before checkout.');
    return false;
  }
  
  const confirmed = confirm('Are you sure you want to proceed to checkout?');
  if (confirmed) {
    // Prepare order details
    const orderDetails = {
      items: Object.values(cart).map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      total: Object.values(cart).reduce((total, item) => total + (item.price * item.quantity), 0),
      shippingAddress: '123 Main St, Mumbai, Maharashtra 400001', // This would come from a form in a real app
      paymentMethod: 'Credit Card' // This would come from a payment form in a real app
    };
    
    // Save order details to session storage
    sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    
    // Clear the cart
    cart = {};
    saveCart();
    updateCartCount();
    
    // Redirect to order confirmation page
    window.location.href = 'pages/order-confirmation.html';
    
    return true;
  }
  return false;
}

// Function to set up event listeners for cart interactions
function setupCartEventListeners() {
  console.log('Setting up cart event listeners');
  
  // Add event listener for checkout button
  const checkoutBtn = document.querySelector('.checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      showCheckoutConfirmation();
    });
  }
  
  // Handle quantity increase
  document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.parentElement.querySelector('.quantity-input');
      const currentValue = parseInt(input.value) || 1;
      if (currentValue < 10) {
        input.value = currentValue + 1;
        updateCartItem(this.closest('.cart-item'), parseInt(input.value));
      }
    });
  });

  // Handle quantity decrease
  document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.parentElement.querySelector('.quantity-input');
      const currentValue = parseInt(input.value) || 1;
      if (currentValue > 1) {
        input.value = currentValue - 1;
        updateCartItem(this.closest('.cart-item'), parseInt(input.value));
      }
    });
  });

  // Handle manual input
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', function() {
      let value = parseInt(this.value) || 1;
      if (value < 1) value = 1;
      if (value > 10) value = 10;
      this.value = value;
      updateCartItem(this.closest('.cart-item'), value);
    });
  });

  // Handle remove item
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', function() {
      const itemElement = this.closest('.cart-item');
      const productId = itemElement.dataset.productId;
      
      if (cart[productId]) {
        delete cart[productId];
        saveCart();
        updateCartCount();
        
        itemElement.remove();
        
        if (Object.keys(cart).length === 0) {
          updateCartDisplay();
        } else {
          updateCartTotals();
        }
        
        showNotification('Item removed from cart');
      }
    });
  });
}

// Function to update a cart item's quantity
function updateCartItem(itemElement, newQuantity) {
  const productId = itemElement.dataset.productId;
  if (cart[productId]) {
    cart[productId].quantity = newQuantity;
    saveCart();
    updateCartCount();
    
    // Update the item total
    const itemTotalElement = itemElement.querySelector('.cart-item-total');
    if (itemTotalElement) {
      const price = cart[productId].price;
      itemTotalElement.textContent = `₹${(price * newQuantity).toLocaleString('en-IN')}.00`;
    }
    
    updateCartTotals();
  }
}

// Function to show notification
function showNotification(message) {
  // Create notification element if it doesn't exist
  let notification = document.querySelector('.notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.className = 'notification';
    document.body.appendChild(notification);
  }
  
  // Set message and show
  notification.textContent = message;
  notification.classList.add('show');
  
  // Hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Set up event delegation for 'Add to Cart' buttons
document.addEventListener('click', function(e) {
  const addToCartBtn = e.target.closest('.add-to-cart');
  if (addToCartBtn) {
    e.preventDefault();
    const productCard = addToCartBtn.closest('.product-card, .product-item');
    if (productCard) {
      addToCart(productCard, addToCartBtn);
    }
  }
});

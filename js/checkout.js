// Get cart items from localStorage
function getCartItems() {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  }
  
  // Update order summary with cart items
  function updateOrderSummary() {
    const cartItems = getCartItems();
    const summaryItems = document.querySelector('.summary-items');
    const subtotalElement = document.querySelector('.subtotal-amount');
    const totalElement = document.querySelector('.total-amount');
    
    // Clear existing items
    summaryItems.innerHTML = '';
    
    let subtotal = 0;
    
    // Add each cart item to the summary
    cartItems.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      const itemElement = document.createElement('div');
      itemElement.className = 'summary-item';
      itemElement.innerHTML = `
        <div class="item-details">
          <span class="item-name">${item.name}</span>
          <span class="item-quantity">x${item.quantity}</span>
        </div>
        <span class="item-price">₹${itemTotal.toFixed(2)}</span>
      `;
      summaryItems.appendChild(itemElement);
    });
    
    // Update totals
    const shipping = subtotal > 2500 ? 0 : 150; // Free shipping over ₹2,500
    const total = subtotal + shipping;
    
    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    document.querySelector('.shipping-amount').textContent = shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`;
    totalElement.textContent = `₹${total.toFixed(2)}`;
  }
  
  // Format card number input
  function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    
    input.value = formattedValue;
  }
  
  // Format expiry date input
  function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    
    input.value = value;
  }
  
  // Validate form inputs
  function validateForm() {
    const shippingForm = document.getElementById('shipping-form');
    const paymentForm = document.getElementById('payment-form');
    
    if (!shippingForm.checkValidity() || !paymentForm.checkValidity()) {
      return false;
    }
    
    // Additional validation for card number (16 digits)
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    if (cardNumber.length !== 16) {
      alert('Please enter a valid 16-digit card number');
      return false;
    }
    
    // Additional validation for CVV (3 digits)
    const cvv = document.getElementById('cvv').value;
    if (cvv.length !== 3) {
      alert('Please enter a valid 3-digit CVV');
      return false;
    }
    
    return true;
  }
  
  // Handle place order button click
  function placeOrder() {
    if (!validateForm()) {
      return;
    }
    
    const button = document.querySelector('.place-order-btn');
    button.classList.add('loading');
    button.disabled = true;
    
    // Simulate order processing
    setTimeout(() => {
      // Clear cart
      localStorage.removeItem('cartItems');
      
      // Show success message
      alert('Order placed successfully! Thank you for shopping with Forest Essentials.');
      
      // Redirect to home page
      window.location.href = '../index.html';
    }, 2000);
  }
  
  // Initialize checkout page
  document.addEventListener('DOMContentLoaded', () => {
    // Update order summary
    updateOrderSummary();
    
    // Add input formatting
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    
    cardNumberInput.addEventListener('input', () => formatCardNumber(cardNumberInput));
    expiryDateInput.addEventListener('input', () => formatExpiryDate(expiryDateInput));
    
    // Add form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
          placeOrder();
        }
      });
    });
  }); 
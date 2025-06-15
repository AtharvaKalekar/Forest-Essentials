// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Back to Top Button Functionality
  const backToTopButton = document.getElementById('back-to-top');
  
  // Show/hide back to top button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });
  
  // Scroll to top when button is clicked
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Product Wishlist Toggle
  const wishlistButtons = document.querySelectorAll('.wishlist-btn, .seasonal-item-wishlist');
  
  wishlistButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Toggle heart icon fill for Font Awesome icons
      if (this.querySelector('i')) {
        if (this.querySelector('i').classList.contains('far')) {
          this.querySelector('i').classList.remove('far');
          this.querySelector('i').classList.add('fas');
          this.querySelector('i').style.color = '#e53935';
        } else {
          this.querySelector('i').classList.remove('fas');
          this.querySelector('i').classList.add('far');
          this.querySelector('i').style.color = '';
        }
      }
      
      // Toggle SVG fill for inline SVGs
      if (this.querySelector('svg')) {
        const svgPath = this.querySelector('svg path');
        if (svgPath.getAttribute('fill') === '#555') {
          svgPath.setAttribute('fill', '#e53935');
        } else {
          svgPath.setAttribute('fill', '#555');
        }
      }
    });
  });
  
  // Add to Bag Button Click Event
  const addToBagButtons = document.querySelectorAll('.seasonal-item-button, .product-button, .add-to-bag-btn');
  
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
    });
  });
  
  // Horizontal Scroll for Product Carousels
  const scrollContainers = document.querySelectorAll('.seasonal-indulgences-grid, .bestsellers-grid');
  
  scrollContainers.forEach(container => {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
    
    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });
    
    container.addEventListener('mouseup', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });
    
    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      container.scrollLeft = scrollLeft - walk;
    });
  });
  
  // Search Icon Click Event
  const searchIcon = document.querySelector('.search-icon');
  
  if (searchIcon) {
    searchIcon.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Check if search form already exists
      if (!document.querySelector('.search-form')) {
        // Create search form
        const searchForm = document.createElement('div');
        searchForm.className = 'search-form';
        searchForm.innerHTML = `
          <div class="search-overlay"></div>
          <div class="search-container">
            <form>
              <input type="text" placeholder="Search for products..." autofocus>
              <button type="submit"><i class="fas fa-search"></i></button>
            </form>
            <button class="close-search"><i class="fas fa-times"></i></button>
          </div>
        `;
        
        // Add search form to body
        document.body.appendChild(searchForm);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
          .search-form {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
          }
          .search-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.7);
          }
          .search-container {
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            max-width: 600px;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          }
          .search-container form {
            display: flex;
            gap: 10px;
          }
          .search-container input {
            flex: 1;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
            font-family: 'Montserrat', Arial, sans-serif;
          }
          .search-container button {
            background-color: #a0001e;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 0 20px;
            font-size: 18px;
            cursor: pointer;
          }
          .close-search {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: #fff;
            font-size: 24px;
            cursor: pointer;
          }
        `;
        document.head.appendChild(style);
        
        // Close search on overlay or close button click
        document.querySelector('.search-overlay').addEventListener('click', closeSearch);
        document.querySelector('.close-search').addEventListener('click', closeSearch);
        
        // Close search on Escape key
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
            closeSearch();
          }
        });
        
        function closeSearch() {
          const searchForm = document.querySelector('.search-form');
          if (searchForm) {
            searchForm.remove();
          }
        }
      }
    });
  }
  
  // Floating Chat Button Click Event
  const floatingBtn = document.querySelector('.floating-btn');
  
  if (floatingBtn) {
    floatingBtn.addEventListener('click', function() {
      // Create chat widget
      if (!document.querySelector('.chat-widget')) {
        const chatWidget = document.createElement('div');
        chatWidget.className = 'chat-widget';
        chatWidget.innerHTML = `
          <div class="chat-header">
            <h3>Customer Support</h3>
            <button class="close-chat"><i class="fas fa-times"></i></button>
          </div>
          <div class="chat-messages">
            <div class="message received">
              <div class="message-content">
                <p>Hello! How can we help you today?</p>
                <span class="message-time">Just now</span>
              </div>
            </div>
          </div>
          <div class="chat-input">
            <input type="text" placeholder="Type your message...">
            <button><i class="fas fa-paper-plane"></i></button>
          </div>
        `;
        
        // Add chat widget to body
        document.body.appendChild(chatWidget);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
          .chat-widget {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 320px;
            height: 400px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 5px 25px rgba(0,0,0,0.2);
            display: flex;
            flex-direction: column;
            z-index: 1000;
            overflow: hidden;
          }
          .chat-header {
            background-color: #bba05b;
            color: #fff;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .chat-header h3 {
            margin: 0;
            font-size: 16px;
          }
          .close-chat {
            background: none;
            border: none;
            color: #fff;
            font-size: 18px;
            cursor: pointer;
          }
          .chat-messages {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
          }
          .message {
            margin-bottom: 15px;
            display: flex;
          }
          .message.received {
            justify-content: flex-start;
          }
          .message.sent {
            justify-content: flex-end;
          }
          .message-content {
            max-width: 80%;
            padding: 10px 15px;
            border-radius: 15px;
          }
          .message.received .message-content {
            background-color: #f1f1f1;
          }
          .message.sent .message-content {
            background-color: #a0001e;
            color: #fff;
          }
          .message-content p {
            margin: 0 0 5px 0;
            font-size: 14px;
          }
          .message-time {
            font-size: 11px;
            color: #888;
            display: block;
            text-align: right;
          }
          .message.sent .message-time {
            color: #eee;
          }
          .chat-input {
            padding: 15px;
            display: flex;
            gap: 10px;
            border-top: 1px solid #eee;
          }
          .chat-input input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 20px;
            font-size: 14px;
            font-family: 'Montserrat', Arial, sans-serif;
          }
          .chat-input button {
            background-color: #bba05b;
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
        `;
        document.head.appendChild(style);
        
        // Close chat on close button click
        document.querySelector('.close-chat').addEventListener('click', function() {
          document.querySelector('.chat-widget').remove();
          
          // Reset badge count
          const floatingBadge = document.querySelector('.floating-badge');
          if (floatingBadge) {
            floatingBadge.textContent = '0';
          }
        });
        
        // Send message on button click or Enter key
        const chatInput = document.querySelector('.chat-input input');
        const sendButton = document.querySelector('.chat-input button');
        
        function sendMessage() {
          const message = chatInput.value.trim();
          if (message) {
            // Add user message
            const chatMessages = document.querySelector('.chat-messages');
            const messageElement = document.createElement('div');
            messageElement.className = 'message sent';
            messageElement.innerHTML = `
              <div class="message-content">
                <p>${message}</p>
                <span class="message-time">Just now</span>
              </div>
            `;
            chatMessages.appendChild(messageElement);
            
            // Clear input
            chatInput.value = '';
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate response after 1 second
            setTimeout(() => {
              const responseElement = document.createElement('div');
              responseElement.className = 'message received';
              responseElement.innerHTML = `
                <div class="message-content">
                  <p>Thank you for your message. Our team will get back to you shortly.</p>
                  <span class="message-time">Just now</span>
                </div>
              `;
              chatMessages.appendChild(responseElement);
              
              // Scroll to bottom
              chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
          }
        }
        
        sendButton.addEventListener('click', sendMessage);
        
        chatInput.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
            sendMessage();
          }
        });
      }
    });
  }
});


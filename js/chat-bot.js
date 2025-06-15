document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatToggle = document.getElementById('chat-toggle');
    const chatContainer = document.querySelector('.chat-container');
    const chatMessages = document.querySelector('.chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const minimizeBtn = document.querySelector('.minimize-btn');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');

    // Toggle chat visibility
    let isChatVisible = false;
    
    function toggleChat() {
        isChatVisible = !isChatVisible;
        if (isChatVisible) {
            chatContainer.classList.add('visible');
            userInput.focus();
        } else {
            chatContainer.classList.remove('visible');
        }
    }

    chatToggle.addEventListener('click', toggleChat);
    minimizeBtn.addEventListener('click', toggleChat);

    // Add message to chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = isUser ? 'You' : 'FE';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const messageText = document.createElement('p');
        messageText.textContent = message;
        
        const time = document.createElement('span');
        time.className = 'message-time';
        time.textContent = getCurrentTime();
        
        content.appendChild(messageText);
        content.appendChild(time);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        // Add typing indicator before bot's response if it's a bot message
        if (!isUser) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
            showTypingIndicator();
            // Simulate typing delay
            setTimeout(() => {
                hideTypingIndicator();
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        } else {
            // For user messages, add immediately
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Hide typing indicator
    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Get current time in HH:MM format
    function getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + 
               now.getMinutes().toString().padStart(2, '0');
    }

    // Handle user input
    function handleUserInput() {
        const message = userInput.value.trim();
        if (message !== '') {
            addMessage(message, true);
            userInput.value = '';
            
            // Generate bot response
            setTimeout(() => {
                const response = generateBotResponse(message);
                addMessage(response);
            }, 500);
        }
    }

    // Send message on button click
    sendBtn.addEventListener('click', handleUserInput);
    
    // Send message on Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });

    // Handle suggestion chips
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const suggestion = this.textContent;
            userInput.value = suggestion;
            handleUserInput();
        });
    });

    // Generate bot response based on user input
    function generateBotResponse(userInput) {
        const input = userInput.toLowerCase();
        
        // Greetings
        if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
            return "Hello! Welcome to Forest Essentials. How can I assist you today?";
        }
        
        // Products
        if (input.includes('product') || input.includes('item') || input.includes('buy')) {
            return "We have a wide range of Ayurvedic products including skincare, haircare, and body care. Is there something specific you're looking for?";
        }
        
        // Store locator
        if (input.includes('store') || input.includes('location') || input.includes('near me')) {
            return "You can find our nearest store by visiting our Store Locator page. Would you like me to take you there?";
        }
        
        // Track order
        if (input.includes('track') || input.includes('order') || input.includes('delivery')) {
            return "To track your order, please provide your order number or check your email for tracking details.";
        }
        
        // Returns
        if (input.includes('return') || input.includes('refund') || input.includes('exchange')) {
            return "We have a 30-day return policy for unused products. Please contact our customer care at care@forestessentialsindia.com for assistance with returns.";
        }
        
        // Thank you
        if (input.includes('thank') || input.includes('thanks')) {
            return "You're welcome! Is there anything else I can help you with?";
        }
        
        // Default response
        const responses = [
            "I'm here to help! Could you please provide more details?",
            "I'm not sure I understand. Could you rephrase that?",
            "I can help you with product information, store locations, order tracking, and more. What would you like to know?",
            "I'm still learning! Could you try asking in a different way?"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Auto-open chat after a delay
    setTimeout(() => {
        if (!isChatVisible) {
            toggleChat();
            // Add welcome message after a short delay
            setTimeout(() => {
                addMessage("Welcome to Forest Essentials! I'm your virtual assistant. How can I help you today?");
            }, 500);
        }
    }, 3000);
});

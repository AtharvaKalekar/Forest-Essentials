document.addEventListener('DOMContentLoaded', function() {
  // Tab Switching
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Password Toggle
  const toggleButtons = document.querySelectorAll('.toggle-password');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const input = button.previousElementSibling;
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      
      // Toggle eye icon
      const icon = button.querySelector('i');
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  });

  // Form Validation
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  // Login Form Validation
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!validateEmail(email)) {
      showError('login-email', 'Please enter a valid email address');
      return;
    }
    
    if (password.length < 8) {
      showError('login-password', 'Password must be at least 8 characters long');
      return;
    }
    
    // If validation passes, redirect to homepage
    console.log('Login successful, redirecting to homepage...');
    window.location.href = '../index.html';
  });

  // Register Form Validation
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const firstname = document.getElementById('register-firstname').value;
    const lastname = document.getElementById('register-lastname').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    // Reset previous errors
    clearErrors();
    
    // Validate first name
    if (firstname.length < 2) {
      showError('register-firstname', 'First name must be at least 2 characters long');
      return;
    }
    
    // Validate last name
    if (lastname.length < 2) {
      showError('register-lastname', 'Last name must be at least 2 characters long');
      return;
    }
    
    // Validate email
    if (!validateEmail(email)) {
      showError('register-email', 'Please enter a valid email address');
      return;
    }
    
    // Validate password
    if (!validatePassword(password)) {
      showError('register-password', 'Password does not meet requirements');
      return;
    }
    
    // Validate confirm password
    if (password !== confirmPassword) {
      showError('register-confirm-password', 'Passwords do not match');
      return;
    }
    
    // If validation passes, you can submit the form
    console.log('Register form submitted:', { firstname, lastname, email, password });
    // Add your registration logic here
  });

  // Helper Functions
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  }

  function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    
    // Remove any existing error message
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    input.parentElement.appendChild(errorDiv);
    input.style.borderColor = '#dc3545';
  }

  function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.style.borderColor = '#ddd');
  }

  // Social Login Buttons
  const socialButtons = document.querySelectorAll('.social-btn');
  
  socialButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const provider = button.classList.contains('facebook') ? 'Facebook' : 'Google';
      console.log(`${provider} login clicked`);
      // Add your social login logic here
    });
  });

  // Remember Me Checkbox
  const rememberMe = document.querySelector('input[name="remember"]');
  if (rememberMe) {
    rememberMe.addEventListener('change', function() {
      console.log('Remember me:', this.checked);
      // Add your remember me logic here
    });
  }

  // Terms Checkbox
  const termsCheckbox = document.querySelector('input[name="terms"]');
  if (termsCheckbox) {
    termsCheckbox.addEventListener('change', function() {
      const submitBtn = this.closest('form').querySelector('.submit-btn');
      submitBtn.disabled = !this.checked;
    });
  }
}); 
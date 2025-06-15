document.addEventListener('DOMContentLoaded', function() {
  // FAQ Category Tabs
  const categoryItems = document.querySelectorAll('.faq-categories li');
  const faqCategories = document.querySelectorAll('.faq-category');
  
  // Show first category by default
  if (faqCategories.length > 0) {
    faqCategories[0].classList.add('active');
  }
  
  // Handle category click
  categoryItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove active class from all categories and items
      categoryItems.forEach(cat => cat.classList.remove('active'));
      faqCategories.forEach(cat => cat.classList.remove('active'));
      
      // Add active class to clicked item
      this.classList.add('active');
      
      // Show the corresponding FAQ category
      const categoryId = this.getAttribute('data-category');
      const activeCategory = document.getElementById(categoryId);
      if (activeCategory) {
        activeCategory.classList.add('active');
      }
      
      // Close all open accordions when switching categories
      closeAllAccordions();
    });
  });
  
  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  // Add click event to each accordion header
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const accordionItem = this.parentElement;
      const accordionContent = this.nextElementSibling;
      const icon = this.querySelector('i');
      
      // Toggle the active class
      const isActive = this.classList.contains('active');
      
      // Close all accordions first
      closeAllAccordions();
      
      // If the clicked accordion was not active, open it
      if (!isActive) {
        this.classList.add('active');
        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        icon.classList.add('fa-minus');
        icon.classList.remove('fa-plus');
        accordionContent.classList.add('show');
      }
    });
  });
  
  // Function to close all accordions
  function closeAllAccordions() {
    accordionHeaders.forEach(header => {
      const accordionContent = header.nextElementSibling;
      const icon = header.querySelector('i');
      
      header.classList.remove('active');
      accordionContent.style.maxHeight = null;
      icon.classList.remove('fa-minus');
      icon.classList.add('fa-plus');
      accordionContent.classList.remove('show');
    });
  }
  
  // Open first accordion in active category by default
  const activeCategory = document.querySelector('.faq-category.active');
  if (activeCategory) {
    const firstAccordion = activeCategory.querySelector('.accordion-header');
    if (firstAccordion) {
      firstAccordion.click();
    }
  }
  
  // Back to Top Button
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Mobile menu toggle (if not already in main script)
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navbarBottom = document.querySelector('.navbar-bottom');
  
  if (mobileMenuToggle && navbarBottom) {
    mobileMenuToggle.addEventListener('click', function() {
      navbarBottom.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
});

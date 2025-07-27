// Main JavaScript for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
  // Initialize variables
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const contactForm = document.getElementById('contact-form');
  
  // Check for saved theme preference or respect OS preference
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Function to set theme based on preference
  function setTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
      body.classList.add('dark-mode');
      updateThemeIcon(true);
    } else {
      body.classList.remove('dark-mode');
      updateThemeIcon(false);
    }
  }
  
  // Set initial theme
  setTheme();
  
  // Update theme toggle icon
  function updateThemeIcon(isDark) {
    if (themeToggle) {
      themeToggle.innerHTML = isDark ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
    }
  }
  
  // Theme toggle functionality
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        updateThemeIcon(false);
      } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon(true);
      }
    });
  }
  
  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', 
        navLinks.classList.contains('active') ? 'true' : 'false');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navLinks && navLinks.classList.contains('active')) {
      if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });
  
  // Portfolio filtering
  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
          if (filterValue === 'all') {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else if (item.classList.contains(filterValue)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
  
  // Form validation and submission
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      let isValid = true;
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Reset previous error messages
      document.querySelectorAll('.error-message').forEach(el => el.remove());
      
      // Validate name
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Please enter your name');
        isValid = false;
      }
      
      // Validate email
      if (!emailInput.value.trim()) {
        showError(emailInput, 'Please enter your email');
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
      }
      
      // Validate message
      if (!messageInput.value.trim()) {
        showError(messageInput, 'Please enter your message');
        isValid = false;
      }
      
      // If form is valid, submit it
      if (isValid) {
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        const formData = new FormData(contactForm);
        const formObject = {};
        
        formData.forEach((value, key) => {
          formObject[key] = value;
        });
        
        // Log form data (in a real app, you'd send this to your server)
        console.log('Form submitted:', formObject);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Your message has been sent successfully!';
        contactForm.reset();
        contactForm.appendChild(successMessage);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  }
  
  // Helper function to show error messages
  function showError(input, message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '0.8rem';
    errorMessage.style.marginTop = '0.5rem';
    input.parentNode.appendChild(errorMessage);
    input.style.borderColor = 'red';
    
    // Remove error styling when input changes
    input.addEventListener('input', function() {
      input.style.borderColor = '';
      const error = input.parentNode.querySelector('.error-message');
      if (error) {
        error.remove();
      }
    }, { once: true });
  }
  
  // Helper function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // Skip if href is just '#'
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Highlight active nav link based on scroll position
  function highlightNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    const headerHeight = document.querySelector('header').offsetHeight;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Add scroll event listener for nav highlighting
  window.addEventListener('scroll', highlightNavLink);
  
  // Initialize nav highlighting
  highlightNavLink();
  
  // Add animation to elements when they come into view
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  function checkIfInView() {
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('fade-in');
      }
    });
  }
  
  // Add scroll event listener for animations
  window.addEventListener('scroll', checkIfInView);
  
  // Initialize animations
  checkIfInView();
});
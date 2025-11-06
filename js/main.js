// Ubuntu Fraternity KE - Enhanced JavaScript with Animations

// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const dropdownToggle = document.getElementById('dropdownToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const membershipForm = document.getElementById('membershipForm');
const paymentMethodSelect = document.getElementById('paymentMethod');
const mpesaModal = document.getElementById('mpesaModal');
const mpesaPinInput = document.getElementById('mpesaPin');

// Navigation State
let isNavOpen = false;
let isDropdownOpen = false;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeForms();
  initializeModals();
  initializeAccessibility();
  initializeAnimations();
  initializeQuickContact();
  initializeMemberCounter();
  initializeCommitteeCards();
});

// Navigation Functions
function initializeNavigation() {
  if (navToggle) {
    navToggle.addEventListener('click', toggleNavigation);
  }
  
  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', toggleDropdown);
  }
  
  // Close navigation when clicking outside
  document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      closeNavigation();
    }
    
    if (!dropdownMenu.contains(e.target) && !dropdownToggle.contains(e.target)) {
      closeDropdown();
    }
  });
  
  // Close navigation on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeNavigation();
      closeDropdown();
    }
  });
}

function toggleNavigation() {
  isNavOpen = !isNavOpen;
  
  if (isNavOpen) {
    openNavigation();
  } else {
    closeNavigation();
  }
}

function openNavigation() {
  navMenu.classList.add('show');
  navToggle.classList.add('active');
  navToggle.setAttribute('aria-expanded', 'true');
  isNavOpen = true;
}

function closeNavigation() {
  navMenu.classList.remove('show');
  navToggle.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
  isNavOpen = false;
}

function toggleDropdown() {
  isDropdownOpen = !isDropdownOpen;
  
  if (isDropdownOpen) {
    openDropdown();
  } else {
    closeDropdown();
  }
}

function openDropdown() {
  dropdownMenu.classList.add('show');
  dropdownToggle.setAttribute('aria-expanded', 'true');
  isDropdownOpen = true;
}

function closeDropdown() {
  dropdownMenu.classList.remove('show');
  dropdownToggle.setAttribute('aria-expanded', 'false');
  isDropdownOpen = false;
}

// Form Functions
function initializeForms() {
  if (membershipForm) {
    membershipForm.addEventListener('submit', handleFormSubmit);
  }
  
  if (paymentMethodSelect) {
    paymentMethodSelect.addEventListener('change', handlePaymentMethodChange);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  if (!validateForm(membershipForm)) {
    showNotification('Please fill in all required fields correctly.', 'error');
    return;
  }
  
  const paymentMethod = paymentMethodSelect.value;
  
  if (paymentMethod === 'mpesa') {
    showMpesaModal();
  } else {
    submitForm();
  }
}

function handlePaymentMethodChange() {
  const paymentMethod = paymentMethodSelect.value;
  
  if (paymentMethod === 'mpesa') {
    membershipForm.onsubmit = function(e) {
      e.preventDefault();
      showMpesaModal();
    };
  } else {
    membershipForm.onsubmit = handleFormSubmit;
  }
}

function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    const value = field.value.trim();
    
    if (!value) {
      field.style.borderColor = '#dc3545';
      isValid = false;
    } else {
      field.style.borderColor = '#ced4da';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        field.style.borderColor = '#dc3545';
        isValid = false;
      }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        field.style.borderColor = '#dc3545';
        isValid = false;
      }
    }
  });
  
  return isValid;
}

function submitForm() {
  showNotification('Thank you for your membership registration! We will contact you soon with next steps.', 'success');
  membershipForm.reset();
}

// Quick Contact Form
function initializeQuickContact() {
  const quickContactForm = document.querySelector('form');
  if (quickContactForm && quickContactForm.querySelector('#quickName')) {
    quickContactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
      quickContactForm.reset();
    });
  }
}

// Modal Functions
function initializeModals() {
  // M-Pesa modal event listeners
  if (mpesaModal) {
    // Close modal when clicking outside
    mpesaModal.addEventListener('click', function(e) {
      if (e.target === mpesaModal) {
        closeMpesaModal();
      }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mpesaModal.classList.contains('show')) {
        closeMpesaModal();
      }
    });
  }
}

function showMpesaModal() {
  if (mpesaModal) {
    mpesaModal.classList.add('show');
    mpesaModal.style.display = 'flex';
    
    if (mpesaPinInput) {
      mpesaPinInput.focus();
    }
  }
}

function closeMpesaModal() {
  if (mpesaModal) {
    mpesaModal.classList.remove('show');
    mpesaModal.style.display = 'none';
    
    if (mpesaPinInput) {
      mpesaPinInput.value = '';
    }
  }
}

function submitMpesaPin() {
  const pin = mpesaPinInput.value;
  
  if (pin.length !== 6 || !/^\d{6}$/.test(pin)) {
    showNotification('Please enter a valid 6-digit M-Pesa PIN.', 'error');
    return;
  }
  
  closeMpesaModal();
  showNotification('✅ M-Pesa payment initiated! Thank you for your membership registration. We will contact you soon.', 'success');
  membershipForm.reset();
}

// Animation Functions
function initializeAnimations() {
  // Add click animations to all buttons
  const buttons = document.querySelectorAll('button, .form-button, .hero__cta, .blog-card__link, .social-link');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Add ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add hover effects to cards
  const cards = document.querySelectorAll('.card, .blog-card, .contact-card, .gallery-item');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Add scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  const animatedElements = document.querySelectorAll('.card, .blog-card, .contact-card, .gallery-item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <div class="notification__content">
      <span class="notification__message">${message}</span>
      <button class="notification__close" onclick="this.parentElement.parentElement.remove()" aria-label="Close notification">×</button>
    </div>
  `;
  
  // Add styles
  const colors = {
    success: '#28a745',
    error: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8'
  };
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: ${colors[type] || colors.info};
    color: white;
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    z-index: 10000;
    max-width: 400px;
    animation: slideInRight 0.3s ease;
    font-family: var(--font-body);
    font-weight: 500;
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Accessibility Functions
function initializeAccessibility() {
  // Add keyboard navigation for dropdown
  if (dropdownToggle) {
    dropdownToggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDropdown();
      }
    });
  }
  
  // Add keyboard navigation for mobile menu
  if (navToggle) {
    navToggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleNavigation();
      }
    });
  }
  
  // Add focus management for modals
  if (mpesaModal) {
    mpesaModal.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        const focusableElements = mpesaModal.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .notification__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .notification__close {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    margin-left: 15px;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s ease;
  }
  
  .notification__close:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  /* Enhanced button animations */
  .form-button, .hero__cta, .blog-card__link, .social-link {
    position: relative;
    overflow: hidden;
  }
  
  .form-button:active, .hero__cta:active, .blog-card__link:active, .social-link:active {
    transform: translateY(1px) scale(0.98);
  }
  
  /* Gallery item hover effects */
  .gallery-item {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .gallery-item:hover {
    transform: translateY(-12px) scale(1.02);
  }
  
  /* Card hover effects */
  .card, .blog-card, .contact-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .card:hover, .blog-card:hover, .contact-card:hover {
    transform: translateY(-8px) scale(1.01);
  }
`;
document.head.appendChild(animationStyles);

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle window resize
window.addEventListener('resize', debounce(function() {
  if (window.innerWidth > 768) {
    closeNavigation();
    closeDropdown();
  }
}, 250));

// Add loading states
function addLoadingState(element) {
  element.disabled = true;
  element.style.opacity = '0.6';
  element.style.cursor = 'not-allowed';
}

function removeLoadingState(element) {
  element.disabled = false;
  element.style.opacity = '1';
  element.style.cursor = 'pointer';
}

// Member Counter - Simple display (no animation)
function initializeMemberCounter() {
  const memberCountElement = document.getElementById('memberCount');
  if (!memberCountElement) return;
  
  const targetCount = parseInt(memberCountElement.getAttribute('data-count')) || 0;
  memberCountElement.textContent = targetCount;
}

// Committee Cards - Simple hover effects only
function initializeCommitteeCards() {
  // No complex interactions needed for compact cards
  // Cards are now simple display elements with basic hover effects
}

// Export functions for global access
window.showMpesaModal = showMpesaModal;
window.closeMpesaModal = closeMpesaModal;
window.submitMpesaPin = submitMpesaPin;
window.showNotification = showNotification;
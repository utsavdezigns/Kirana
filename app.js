/* ===========================
   KiranaCloud — Shared App JS
   =========================== */

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll behavior for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const element = document.querySelector(href);
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add ripple effect to buttons
  addRippleEffect();
});

// Ripple effect on buttons
function addRippleEffect() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline, .btn-ghost');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// Format currency
function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(value);
}

// Format date in Nepali
function formatDateNepali(date) {
  return new Intl.DateTimeFormat('ne-NP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// LocalStorage helpers
const storage = {
  set: (key, value) => {
    localStorage.setItem('kc_' + key, JSON.stringify(value));
  },
  get: (key) => {
    const item = localStorage.getItem('kc_' + key);
    return item ? JSON.parse(item) : null;
  },
  remove: (key) => {
    localStorage.removeItem('kc_' + key);
  },
  clear: () => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('kc_')) {
        localStorage.removeItem(key);
      }
    });
  }
};

// Notification system
function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 16px 20px;
    background: ${type === 'success' ? '#2dd4a0' : type === 'error' ? '#e8435a' : '#4c8ef7'};
    color: ${type === 'success' || type === 'error' ? '#fff' : '#fff'};
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 2000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  .btn-primary:active,
  .btn-secondary:active,
  .btn-outline:active,
  .btn-ghost:active {
    transform: scale(0.98);
  }
`;
document.head.appendChild(style);

// Check if user is logged in
function isLoggedIn() {
  return !!storage.get('userEmail');
}

// Logout
function logout() {
  if (confirm('लॉगआउट गर्नु निश्चित हुनुहुन्छ?')) {
    storage.clear();
    window.location.href = 'index.html';
  }
}

console.log('KiranaCloud App JS loaded ✓');
